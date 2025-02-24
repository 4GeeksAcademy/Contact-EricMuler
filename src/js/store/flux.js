const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			listaDeContactos: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			obtenerContactos: () => {
				fetch("https://playground.4geeks.com/contact/agendas/martopravia/contacts", {
					method: "GET"
					
				})
				.then ((response) => {
					if(!response.ok) {
						throw new Error ("Error en la obtencion de los datos del contacto")
					}
					return response.json()
				})
				.then ((data) => {
					if (data) {
						setStore({listaDeContactos: data.contacts})
					}
				})
				.catch((error) => {
					console.log("Ocurrió un error: ", error )
				})
			},
			agregarContactoALaLista: (contact) => {
				const store = getStore();
				setStore({...store, listaDeContactos: [...store.listaDeContactos, contact]})
			},
			crearContacto: (dataContacto) => {
                fetch("https://playground.4geeks.com/contact/agendas/martopravia/contacts", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        dataContacto
                    ),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        const actions = getActions(); 
                        actions.agregarContactoALaLista(data); 
                        console.log("Contacto agregado : ", data);
                    })
                    .catch((error) => console.log(error));
            },
			eliminarContacto: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/martopravia/contacts/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        console.log(response)
                        if (response.ok) {
                            const store = getStore();
                            const contactoActualizado = store.listaDeContactos.filter(contact => contact.id !== id);
                            setStore({ listaDeContactos: contactoActualizado });
                            console.log(`Contacto con id:  ${id} Ha sido eliminado`);
                        } else {
                            console.log("Error borrando el contacto");
                        }
                    })
                    .catch((error) => console.log(error));
            }, 
			editarContacto: (id, contactoActualizado) => {
				fetch(`https://playground.4geeks.com/contact/agendas/martopravia/contacts/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contactoActualizado),
				})
					.then((response) => response.json())
					.then((data) => {
						const store = getStore();
						const contactosActualizados = store.listaDeContactos.map(contact => 
							contact.id === id ? { ...contact, ...data } : contact
						);
						setStore({ listaDeContactos: contactosActualizados });
						console.log(`Contacto con id ${id} actualizado.`);
					})
					.catch((error) => console.error("Error al editar el contacto:", error));
			},


		}
	};
};

export default getState;