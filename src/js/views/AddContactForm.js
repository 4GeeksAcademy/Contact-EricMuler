import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const AddContactForm = () => {
  const {store, actions} = useContext(Context)
  const {id} = useParams()
  let navigate = useNavigate()

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[phone, setPhone] = useState("");
  const[address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!name || !address || !phone || !email) {
      alert("Por favor completa todos los campos.");
      return;
    }
  
    const dataContacto = {
      name,
      phone,
      email,
      address,
    };
  
  
    if (!id) {
    actions.crearContacto(dataContacto); 
    alert("Contacto creado exitosamente.");
   
    } else {
      actions.editarContacto(id, dataContacto)
      alert("Contacto modificado exitosamente.");
    }
    navigate('/'); 
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };


  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-5 text-center">
            <h1> Add a new Contact</h1>
          </div>
        </div>
        
        <div className="row justify-content-center align-items-center">
          <div className="col-6 ">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Nombre Completo
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Ingrese su nombre completo..."
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputDireccion" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="InputDireccion"
                placeholder="Ingrese su dirección..."
                onChange={(e) => setAddress(e.target.value)} 
                value={address} 
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPhone" className="form-label">
                Teléfono
              </label>
              <input
                type="phone"
                className="form-control"
                id="inputPhone"
                placeholder="Ingrese su Teléfono..."
                onChange={(e) => setPhone(e.target.value)} 
                value={phone} 
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                placeholder="Ingrese su Email..."
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                required
              />
              </div>
              <div className="my-3">
                <button type="submit" class="btn btn-primary mb-3">
                  Enviar
                </button>
              </div>
              </form>

              <div className="mb-3">
                <Link to="/">Volver a la lista de contactos</Link>
              </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AddContactForm;