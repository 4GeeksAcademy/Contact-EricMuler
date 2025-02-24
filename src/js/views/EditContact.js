import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router";

const EditContact = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  const contactoExistente =
    store.listaDeContactos.find((contact) => contact.id == id) || {};
  const [name, setName] = useState(contactoExistente.name || "");
  const [address, setAddress] = useState(contactoExistente.address || "");
  const [phone, setPhone] = useState(contactoExistente.phone || "");
  const [email, setEmail] = useState(contactoExistente.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !phone || !email) {
      alert("Todos los campos son obligatorios");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Por favor, ingresa un email valido");
      return;
    }
    const updatedContact = { name, address, phone, email };
    actions.editarContacto(id, updatedContact);
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-5 text-center">
            <h1> Actualiza los datos del contacto</h1>
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
                />
              </div>
              <div className="my-3">
                <button type="submit" class="btn btn-primary mb-3">
                  Actualizar contacto
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

export default EditContact;