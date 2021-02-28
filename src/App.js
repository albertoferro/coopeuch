import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import VerUsuarios from './componentes/VerUsuarios';
import CargaTarea from './componentes/CargaTarea';
import Query from './componentes/Query';

export default class App extends Component {

 state = {
   ClaroOscuro :'dark'

 };

  render() {
    return (


    <div className="app container" className={this.state.ClaroOscuro}>
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <a className="navbar-brand">aLBERTOfERRO</a>
        <br/>
        <div className="btn-group container-fluid">
        
          <NavLink to="/" className="btn btn-dark" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/query" className="btn btn-dark" activeClassName="active">
            Buscador de Tareas
          </NavLink>
          <NavLink to="/vertarea" className="btn btn-dark" activeClassName="active">
            Ver Lista Tareas
          </NavLink>
          <NavLink to="/cargatarea" className="btn btn-dark" activeClassName="active">
            Cargar Tareas
          </NavLink>
          <NavLink to="/contacto" className="btn btn-dark" activeClassName="active">
            Contactame
          </NavLink>

        </div>
        </nav>
        <hr/>
        <div className="">
        <Switch>
        <Route exact path="/">
         <h1> Bienvenido </h1>
          <br>
          </br>
          <p>Esta es una prueba para la empresa COOPEUCH</p>
          </Route>
        <Route path="/codesa">
         <h1> Bienvenido </h1>
          <br>
          </br>
          <p>Esta es una prueba para la empresa COOPEUCH</p>
          </Route>
          <Route path="/contacto">
            Soy Alberto Ferro <br/>
            Escribeme al albertoferro@gmail.com <br/>
            +57 317 6583417
          </Route>
          <Route path="/nosotros">
            Soy Alberto Ferro
          </Route>
          <Route path="/vertarea">
            <VerUsuarios>
            </VerUsuarios>
          </Route>
          <Route path="/cargatarea">
            <CargaTarea>
            </CargaTarea>
          </Route>
          <Route path="/query">
            <Query>
            </Query>
          </Route>
          
        </Switch>
        </div>   
        </div>   
    </Router>

    
    </div>
    )
  }
}
