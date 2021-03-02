import React , { useEffect }  from 'react'
import {  Link} from 'react-router-dom'
import Input from '../components/form/input'
import Productos from './productos'

function Home (){
    useEffect( () => {
        import('../utils/dom').then(({myForm})=>{
        })
      }, []) // este efecto se ejecuta sólo al montarse el componente 
      const inputs = [
        {
            id:'id',
            label:'ID',
            type:'text',
            placeholder:'0',
    
        },
        {
            id:'title',
            label:'Nombre',
            type:'text',
            placeholder:'Calculadora',
    
        },
        {
            id:'price',
            label:'Precio',
            type:'number',
            placeholder:'123456',
    
        },
        {
            id:'tumbnails',
            label:'Foto URL',
            type:'text',
            placeholder:'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png',
    
        },
    ]
    return(
        <div>
        <h1>Ingrese Producto</h1>
        <form className="row g-3" id="myForm" >
            <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">Acción</label>
                <select name="metodo" className="form-control" id="select">
                <option value="post">Crear</option>
                <option value="put">Actualizar</option>
                <option value="delete">Eliminar</option>
                </select>
            </div>
            {
                inputs.map((input)=><Input key={input.id} {...input}></Input>)
            }
            
           {/*  <Sample></Sample> */}
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Enviar</button>
            </div>
        </form>
        <br/>
        <br/>
        {<Productos></Productos>}
        <br/>
        <br/>
        <div className="row">
            <Link className="btn btn-warning" to="/productos">
                {/* <button  > */}
                    Ver Productos
                {/* </button> */}
            </Link>
        </div>
        <br/>
        <br/>
    </div>
    )
}

export default Home