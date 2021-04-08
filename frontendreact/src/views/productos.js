import React,{useEffect,useState,Fragment} from 'react'
import { query } from '../utils/query'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_URL_BACKEND,{path:'/socket.io'});


function Productos(){
    const pathName = useLocation().pathname
    /* console.log(location.pathname); */
    let algo = []
    const [productos, setState] = useState([])
    const [error, setHasError] = useState(false)
    socket.on('connect', (message) =>  {
        socket.on(socket.id, function (info) {
       });
    })
    useEffect(async () => {
        let url = pathName==='/productos/vista-test'?'/api/productos/test?cant=20':'/api/productos'
        console.log(pathName);
        
        let respuesta = await query(url,'get',{})
        if(respuesta.error){
            setHasError(respuesta)
        }else{
            setState(respuesta)
        }
    }, [])
    const [texto, setTexto] = useState('')
    socket.on('resp-chat',  (respuesta) =>{
        let text = ''
        respuesta.forEach(element => {
            text = `${text}\n${element.email}-${(new Date(element.fecha)).toLocaleString()}: ${element.mensaje}`
        });
        setTexto(text)
    }) 
    useEffect(async ()=>{
        let respuesta = await query('/chat','get',{})
        //[{"email":"deckblank@gmail.com","fecha":"2021-03-02T04:47:37.656Z","mensaje":"me conecte"},{"email":"deckblank@gmail.com","fecha":"2021-03-02T04:47:40.696Z","mensaje":"me conecte"},{"email":"deckblank@gmail.com","fecha":"2021-03-02T04:47:41.890Z","mensaje":"me conecte"},{"email":"deckblank@gmail.com","fecha":"2021-03-02T04:47:43.152Z","mensaje":"me conecte"}]
        let text = ''
        respuesta.forEach(element => {
            text = `${text}\n${element.email}-${(new Date(element.fecha)).toLocaleString()}: ${element.mensaje}`
        });
        setTexto(text)
    }, [])
    socket.on('mensaje', (payload) =>{
        algo = payload
        setState(payload)
        setHasError(false)
    }) 
    
    socket.on('error',  (payload) =>{
        alert(payload.message);
    }) 
    const [email, setEmail] = useState('')

    async function registrar(){
        let correo  =  document.querySelector('#email').value
        let respuesta = await socket.emit('registrarse', correo);
        alert('email aceptado')
        setEmail(correo)
        /* document.querySelector('#mensaje').value = '' */
    }
    
    const [mensaje, setMensaje] = useState('')
    function enviarMensaje(){
        let mensaje  =  document.querySelector('#mensaje').value
        socket.emit('chat', mensaje);
    }
       
    return(
        <main className="content">
            {pathName.includes('productos')?'':<div className="row" >
                <div>
                    <textarea style={{height:"200px"}} className="form-control" value={texto}>
                    </textarea>
                </div>
                {
                    email===''?(<div>
                                    <input placeholder="Email" id="email"/> {/* <input placeholder="Email"></input> */}
                                     <button onClick={registrar}>Registrar</button>
                                </div>):
                                (<div>
                                    <input  
                                    placeholder="Mensaje" 
                                    id="mensaje"
                                    /> {/* <input placeholder="Email"></input> */}
                                    <button onClick={enviarMensaje}>Enviar</button>
                                </div>)
                }
            </div>}
            <div className="row">
                {
               error?<div><h1 className="error">{error.error}</h1></div>:(
                <div >
                    <h1>Vista de productos</h1>
                <table className="table table-dark table-striped" >
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Foto</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr >
                    <th scope="row">1</th>
                    <td>title</td>
                    <td>price</td>
                    <td>
                        <img className="image" src="producto.tumbnails" alt="producto.title"/>
                    </td>
                    </tr> */}
                    {
                        productos.map((producto,i)=>{
                            return(
                                <tr >
                                    <td scope="row">{producto.id}</td>
                                    <td>{producto.title}</td>
                                    <td>{producto.price}</td>
                                    <td>
                                        <img className="image" src={producto.tumbnails} alt={producto.title}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
                </div>
               )
            }
            </div>
            
        </main>
        
    )
}

export default Productos