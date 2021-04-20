import React , { useEffect }  from 'react'
import {  Link} from 'react-router-dom'


function Login (){
    useEffect( () => {
       console.log('login');
      }, []) // este efecto se ejecuta sólo al montarse el componente 

    return (
        <div class="jumbotron">
            <h1>Login de Usuario</h1>
            <br/>

            <form action="/login" method="post" autocomplete="off">
                <div class="form-group">
                    <label for="nombre">Ingrese su nombre</label>
                    <input id="nombre" class="form-control" type="text" name="nombre" required/>
                </div>

                <button class="btn btn-success mt-3">Enviar</button>
            </form>
        </div>
    )
}

export default Login