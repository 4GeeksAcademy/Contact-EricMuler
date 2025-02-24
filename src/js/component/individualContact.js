import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const IndividualContact = ({contact}) => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false)

  const eliminar = () => {
    actions.eliminarContacto(contact.id)
    setShowModal(false)
    alert("Contacto Eliminado exitosamente.");
    navigate('/'); 
  }

  return (
    <>
      <li className="row g-0 align-items-center border">
        <div className="col-md-3 text-center my-2">
          <img
            src="https://picsum.photos/200/300"
            className="img-fluid rounded-circle contactPic"
            alt="Profile Picture"
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text">
              <i className="fas fa-map-marker-alt"></i> {contact.address}
              <br />
              <i className="fas fa-phone"></i> {contact.phone}
              <br />
              <i className="fas fa-envelope"></i> {contact.email}
            </p>
          </div>
        </div>
        <div className="col-md-2 text-center">
          <Link to={"/edit/" + contact.id}>
            <i className="fas fa-pen mx-2 lapiz" />
          </Link>
          <button className="border border-0 btnEliminar">
            <i className="fas fa-trash mx-2 papelera" onClick={() => setShowModal(true)} />
          </button>
        </div>
      </li>
      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar este contacto?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={eliminar}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndividualContact;