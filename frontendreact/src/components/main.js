import React from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Productos from '../views/productos'
import Home from '../views/home'
import PageNotFound from '../views/notFound'
/* import Sample from './form/sample' */


function Main(){
  
    return (
        <main className="content">
            <Router>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/productos" component={Productos}/>
                    {/* <Route  component={PageNotFound}/> */}
            </Router>
        </main>
            )
        

}

export default Main