import React,{useEffect,useState,Fragment} from 'react'
import { query } from '../utils/query'
import io from 'socket.io-client';
const socket = io(process.env.URL,{path:'/socket.io'});


function Productos(){
    let algo = []
    const [productos, setState] = useState([])
    const [error, setHasError] = useState(false)
    socket.on('connect', (message) =>  {
        console.log(`Sesion: ${socket.id}`);
      })
    useEffect(async () => {
        let respuesta = await query('/api/productos','get',{})
        if(respuesta.error){
            setHasError(respuesta)
        }else{
            setState(respuesta)
        }
    }, [])
    socket.on('mensaje', (payload) =>{
        algo = payload
        setState(payload)
        setHasError(false)
    }) 
       
    return(
        <main className="content">
            <div className="">
                {
               error?<div><h1 className="error">{error.error}</h1></div>:(
                <div >
                    <h1>Vista de productos</h1>
                <table className="table table-dark table-striped" >
                <thead>
                    <tr>
                    <th scope="col">#</th>
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
                                    <td scope="row">{i+1}</td>
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