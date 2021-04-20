import React , { useEffect , useState}  from 'react'
import {  Link} from 'react-router-dom'
import { query } from '../utils/query'

function Login (){
    const baseURL = process.env.REACT_APP_URL_BACKEND
    const [nombre, setNombre] = useState('')
    useEffect(async () => {

        let respuesta = await query('/logout','post',{})
        console.log(respuesta);
        window.localStorage.removeItem('user')
        setNombre(respuesta)
      }, []) // este efecto se ejecuta sólo al montarse el componente 

    return (
        <div className="jumbotron">
            <h3>Hasta luego</h3>
            <div>{nombre}</div>
            <div> retornar al <a href="/">inicio</a></div>
        </div>
    )
}

export default Login