import React,{useEffect,useState,Fragment} from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Productos from '../views/productos'
import Home from '../views/home'
import PageNotFound from '../views/notFound'
import Register from '../views/register'
import Login from '../views/login'
import Logout from '../views/logout'
import Error from '../views/error'
import { query } from '../utils/query'
/* import Sample from './form/sample' */


function Main(){
    //const loggedIn = window.localStorage.getItem('user');
    const [loggedIn, setUser] = useState('')
    useEffect(async ()=>{
        let respuesta = await query(`/user`,'get',{})
        //[{"email":"deckblank@gmail.com","fecha":"2021-03-02T04:47:37.656Z","mensaje":"me conecte"},{"email":"deckblank@gmail.com","fecha":"2021-03-02T04:47:40.696Z","mensaje":"me conecte"},{"email":"deckblank@gmail.com","fecha":"2021-03-02T04:47:41.890Z","mensaje":"me conecte"},{"email":"deckblank@gmail.com","fecha":"2021-03-02T04:47:43.152Z","mensaje":"me conecte"}]
        if(respuesta.status!=200){
            localStorage.removeItem('user')
            window.location.href='/login'
        }else{
            respuesta = await respuesta.json();
            window.localStorage.setItem('user',respuesta.nombre);
            setUser(respuesta.nombre);
        }
    }, [])

    return (
        <main className="content">
            <BrowserRouter>
                <Switch>
                        <Route exact path="/" >
                        {loggedIn ? <Home /> : <Redirect to="/login" /> }
                        </Route>
                        <Route exact path="/productos" component={Productos}/>
                        <Route exact path="/productos/vista-test" component={Productos}/>
                        <Route exact path="/login" >
                        {loggedIn ? <Redirect to="/" />:<Login/> }
                        </Route>
                        <Route exact path="/register" >
                        {loggedIn ? <Redirect to="/" />:<Register/> }
                        </Route>
                        <Route exact path="/logout" >
                        {loggedIn ? <Logout/>:<Redirect to="/" /> }
                        </Route>
                        <Route exact path="/error/:tipo" component={Error}/>
                        <Route  path="/*" component={PageNotFound}/>
                </Switch>
            </BrowserRouter>
        </main>
            )
        

}

export default Main