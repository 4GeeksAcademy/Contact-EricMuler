import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import IndividualContact from "../component/IndividualContact.js";

const ContactView = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.obtenerContactos();
  }, []);
  console.log(store.listaDeContactos);
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="text-end my-2">
              <Link to="/addContact" type="button" className="btn btn-success">
                Agregar Contacto
              </Link>
            </div>

            <ul className="mb-3">
              {store.listaDeContactos &&
                store.listaDeContactos.length > 0 &&
                store.listaDeContactos.map((contact, index) => {
                  return <IndividualContact contact={contact} key={index} />;
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactView;