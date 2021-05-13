import React,{useEffect,useState} from 'react'
import {  Link} from 'react-router-dom'
import { query } from '../utils/query'
function Header(){
    
    const [user, setUser] = useState([]);

    useEffect(async ()=>{
        setUser(localStorage.getItem('user'))
    },[])

    async function logout (){
        let respuesta = await query('/logout','post',{})
        localStorage.removeItem('user')
        window.location.href='/login'
        setUser(null)
    }


    return(
        <header className="content">
            <div style={{display:'flex'}}>
            <h1>Coderhouse</h1>
            <div style={{margin:'auto 0 auto auto'}}>
            {user==null?null:<button className="btn" onClick={logout}>
               Salir
            </button>}
            </div>
            </div>
        </header>
    )
}

export default Header