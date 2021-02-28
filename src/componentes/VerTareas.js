import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrash, FaPen } from 'react-icons/fa'; // npm i react-icons
import axios from 'axios'; // npm i axios

function CargaPost() {

  const [lista, setLista] = useState([]);
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [id_rol, setIdRol] = useState('');
  const [activo, setActivo] = useState('');
  const [id, setId] = useState('');
  const [bandera, setBandera] = useState(true);

  useEffect(() => {
    getProductos();
  }, [])

  async function getProductos() {
    const res = await axios.get('http://purosoft.net/apirest_codesa/');
    setLista(res.data)
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
    const res = await axios.get('http://purosoft.net/apirest_codesa/?id=' + id);
    setId(res.data.id);
    setNombre(res.data.nombre);
    setIdRol(res.data.id_rol);
    setRol(res.data.rol);
    setActivo(res.data.activo);
    setBandera(false)
  }

  function limpiarEstado() {
    setId('');
    setNombre('');
    setRol('');
    setIdRol('');
    setActivo('');
    setBandera(true);
  }


  return (

    <div className="container ">

      
      <div className="col-md-12 p-2">
        {lista.map(producto => (
          <div className="card p-2 mt-2 border-primary" key={producto.id}>
            <div className="card-body">
              <h1 className="text-primary"> Tarea ID: {producto.id} </h1><hr />
              <h2> {producto.nombre}</h2> <hr />
              <h2> Tipo: {producto.rol}</h2> <hr />
              <h2> Estado: {producto.activo}</h2> <hr />
              
               <hr />
              <div className="d-flex flex-row-reverse" >
                
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default CargaPost;
