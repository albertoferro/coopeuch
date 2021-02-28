import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrash, FaPen, FaSearch } from 'react-icons/fa'; // npm i react-icons
import axios from 'axios'; // npm i axios


function Query() {

  const [lista, setLista] = useState([]);
  const [nombre, setNombre] = useState('');
  const [query, setQuery] = useState('');
  const [rol, setRol] = useState([]);
  const [id_rol, setIdRol] = useState('');
  const [activo, setActivo] = useState('');
  const [id, setId] = useState('');
  const [bandera, setBandera] = useState(true);

  
  useEffect(() => {
    getProductos();
    getRol();
  }, [])

  async function getProductos() {
    const res = await axios.get('http://purosoft.net/apirest_codesa/');
    setLista(res.data)
    console.log(res.data)
  }

  async function getRol() {
    const res = await axios.get('http://purosoft.net/apirest_codesa/index2.php');
    setRol(res.data)
    console.log(res.data)
  }

  async function addProducto() {
    const obj = { nombre, id_rol, activo };
    const res = await axios.post('http://purosoft.net/apirest_codesa/', obj);
    console.log(res.data)
    getProductos();
  }

  async function UpdateProducto(e) {
    const obj = { id, nombre, id_rol, activo };
    const res = await axios.put('http://purosoft.net/apirest_codesa/', obj);
    console.log(res.data)
    getProductos();

  }

  function addUpdate(e) {
    e.preventDefault();
    bandera ? addProducto() : UpdateProducto();
    limpiarEstado();
  }

  async function deleteProducto(id) {

    if (window.confirm('Quieres eliminar?')) {
      const res = await axios.delete('http://purosoft.net/apirest_codesa/?id=' + id);
      getProductos();
      console.log(res.data)
    }
  }

  async function getProducto(id) {
    const res = await axios.get('http://purosoft.net/apirest_codesa/index4.php?q=' + id);
    setId(res.data.id);
    setNombre(res.data.nombre);
    setIdRol(res.data.id_rol);
    setActivo(res.data.activo);
    setBandera(false)
  }

  async function getQuery(id) {
    const res = await axios.get('http://purosoft.net/apirest_codesa/index4.php?q=' + id);
    setLista(res.data)
  }

  function limpiarEstado() {
    setId('');
    setNombre('');
    setIdRol('');
    setActivo('');
    setBandera(true);
  }

 
  return (

    <div className="container ">
              
              <div>
                <input type="text" placeholder="Busqueda" className="form-control"
                onChange={(e) => setQuery(e.target.value)}
                value={query} />
                <br/>
                <button className="btn btn-lg btn-danger btn-block"
                onClick={() => getQuery(query)} ><FaSearch />
                </button>
              </div>


     

      <div className="col-md-12 p-2">
        {lista.map(producto => (
          <div className="card p-2 mt-2 border-primary" key={producto.id}>
            <div className="card-body">
              <h1 className="text-primary"> Tarea ID {producto.id} : </h1><hr />
              <h2> {producto.nombre}</h2> <hr />
              <h2> Tipo: {producto.rol}</h2> <hr />
              <h2> Estado: {(producto.activo == 1) ? 'Activo' : 'Inactivo'}</h2> <hr />
              
               <hr />
              <div className="d-flex flex-row-reverse" >
                <button className="btn btn-outline-danger btn-sm "
                  onClick={() => deleteProducto(producto.id)} ><FaTrash />
                </button>
                <button className="btn btn-outline-secondary btn-sm mr-2"
                  onClick={() => getProducto(producto.id)} ><FaPen />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Query;
