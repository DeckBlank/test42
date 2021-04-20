import React from 'react'
import {  Link} from 'react-router-dom'
function Header(){
    return(
        <header className="content">
            <div style={{display:'flex'}}>
            <h1>Coderhouse</h1>
            <div style={{margin:'auto 0 auto auto'}}>
            {window.localStorage.getItem('user')==null?null:<a href="/logout">
               Salir
            </a>}
            </div>
            </div>
        </header>
    )
}

export default Header