import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import image from "../img/hamburguesa.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getComponents } from "../Redux/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../Firebase.config";
const isIdInLocalStorage = localStorage.getItem("id");

const Modal = ({ productSelected, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const components = useSelector((state) => state.components);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [name, setName] = useState("");
  const [isPostable, setIsPostable] = useState(true);
  const userId = localStorage.getItem("id");
  const [errorName, setErrorName] = useState("");
  const [errorSelectedComponents, setErrorSelectedComponents] = useState("");
 
  const firebaseAuth = getAuth(app);
  const user = firebaseAuth.currentUser
  const components_product = [
    {
      id: 1,
      product_id: 1,
      component_categ_id: 1,
      component_categ: { id: 1, name: "Ingredientes" },
      amount: 5,
    },
    {
      id: 2,
      product_id: 1,
      component_categ_id: 2,
      component_categ: { id: 2, name: "Salsas" },
      amount: 5,
    },
  ];

  useEffect(() => {
    dispatch(getComponents());
  }, []);

  const handleNameChange = (event) => {
    if (event.target.value === "") {
      setErrorName("El nombre de la creación es requerido.");
    } else {
      setErrorName("");
    }
    setName(event.target.value);
  };

  const onChangeCheckIsPostable = () => {
    setIsPostable(!isPostable);
  };

  const IsComponentSelected = (component) => {
    return selectedComponents.some(
      (component_current) => component_current.id === component.id
    );
  };

  const handlerSelectComponent = (component) => {
    if (IsComponentSelected(component)) {
      // unselect
      setSelectedComponents((selectedComponentsOld) => [
        ...selectedComponentsOld.filter(
          (component_current) => component_current.id !== component.id
        ),
      ]);
    } else {
      if (isAllowedToAddComponent(component))
        //select
        setSelectedComponents((selectedComponentsOld) => [
          ...selectedComponentsOld,
          component,
        ]);
    }
  };

  const isAllowedToAddComponent = (component) => {
    let response = false;
    components_product.forEach((component_current) => {
      if (
        Number(component_current.component_categ_id) ===
          Number(component.component_categ_id) &&
        component_current.amount >
          numberOfComponentsSelectedByCateg(component.component_categ_id)
      ) {
        response = true;
      }
    });
    return response;
  };

  const numberOfComponentsSelectedByCateg = (component_categ_id) => {
    return selectedComponents.filter(
      (component_selected) =>
        Number(component_selected.component_categ_id) ===
        Number(component_categ_id)
    ).length;
  };

  const onSaveCreation = () => {
    if (!name) {
      setErrorName("El nombre de la creación es requerido.");
    } else {
      setErrorName("");
    }

    if (selectedComponents.length === 0) {
      setErrorSelectedComponents("Los ingredientes son requeridos.");
    } else {
      setErrorSelectedComponents("");
    }

    if (selectedComponents.length > 0 && name) {
      const components = selectedComponents.map((component) => component.id);
      const body = {
        product_id: productSelected.id,
        users_id: userId,
        components,
        name,
        image: productSelected.image,
        price: productSelected.price,
        isPosted: isPostable,
        purchased_amount: 1,
        isDeleted: false,
      };
      console.log(body);
      axios
        .post("http://localhost:3001/creations", body)
        .then((response) => {
          navigate("/creaciones");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Verificar si hay un usuario registrado
  if (!(user || userId)) {
    console.log("isIdInLocalStorage:", isIdInLocalStorage)
    return ReactDOM.createPortal(
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
            onClick={onClose}
          ></div>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-3/5">
            <div className="border-b border-b-gray-200 flex justify-between">
              <h3
                className="text-lg leading-6 font-medium text-gray-900 p-4"
                id="modal-title"
              >
                Personaliza tu {productSelected.name}
              </h3>
              <button
                className="bg-gray-400 rounded-full flex justify-center self-center w-6 mr-2"
                onClick={onClose}
              >
                <FontAwesomeIcon className="p-1 text-white" icon={faClose} />
              </button>
            </div>
            <div className="bg-white px-4 pb-4 ">
              <div className="flex items-start">
                <div className="text-left">
                  {/* Modal body */}
                  <div className="mt-4 flex sm:flex-row md:flex-row lg:flex-row flex-col">
                    <div className="lg:w-1/2 sm:w-1/2 md:w-1/2 self-center">
                      <img
                        className="rounded-lg p-2"
                        src={productSelected.image}
                        alt=""
                      />
                      <h5 className="text-xl font-bold leading-6 text-orange-600 py-4 text-center">
                        ${productSelected.price}
                      </h5>
                    </div>
                    <div className="flex flex-col px-3 ml-4 lg:w-1/2 sm:w-1/2 md:w-1/2 h-[450px] overflow-y-scroll">
                      <p className="text-xs">{productSelected.description}</p>
                      <div className="flex flex-col mb-1 items-start mt-5">
                        <p className="text-red-600 text-sm">
                          Debes registrarte para comprar.
                        </p>
                        <button
                          className="bg-orange-600 text-white px-4 py-2 rounded-md mt-2"
                          onClick={() => navigate("/register")}
                        >
                          Registrarse
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    );
  }

  // Renderizar el modal con los componentes seleccionados
  return ReactDOM.createPortal(
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-3/5">
          <div className="border-b border-b-gray-200 flex justify-between">
            <h3
              className="text-lg leading-6 font-medium text-gray-900 p-4"
              id="modal-title"
            >
              Personaliza tu {productSelected.name}
            </h3>
            <button
              className="bg-gray-400 rounded-full flex justify-center self-center w-6 mr-2"
              onClick={onClose}
            >
              <FontAwesomeIcon className="p-1 text-white" icon={faClose} />
            </button>
          </div>
          <div className="bg-white px-4 pb-4 ">
            <div className="flex items-start">
              <div className="text-left">
                {/* Modal body */}
                <div className="mt-4 flex sm:flex-row md:flex-row lg:flex-row flex-col">
                  <div className="lg:w-1/2 sm:w-1/2 md:w-1/2 self-center">
                    <img
                      className="rounded-lg p-2"
                      src={productSelected.image}
                      alt=""
                    />
                    <h5 className="text-xl font-bold leading-6 text-orange-600 py-4 text-center">
                      ${productSelected.price}
                    </h5>
                  </div>
                  <div className="flex flex-col px-3 ml-4 lg:w-1/2 sm:w-1/2 md:w-1/2 h-[450px] overflow-y-scroll">
                    <p className="text-xs">{productSelected.description}</p>
                    <div className="flex flex-col mb-1 items-start mt-5">
                      {errorName && (
                        <p className="text-red-600 text-sm">{errorName}</p>
                      )}
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2"
                        placeholder="Escribe un nombre para tu creación"
                      />
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Nombre
                      </label>
                    </div>
                    <form className="mt-3">
                    {errorSelectedComponents && (
                        <p className="text-red-600 text-sm">{errorSelectedComponents}</p>
                      )}
                      {components_product.map((component_produc) => (
                        <div className="mt-1" key={component_produc.id}>
                          <div className="flex justify-between">
                            <h5 className="text-md font-bold">
                              {component_produc.component_categ.name} (
                              {numberOfComponentsSelectedByCateg(
                                component_produc.component_categ_id
                              )}{" "}
                              / {component_produc.amount})
                            </h5>
                            <span className="text-xs font-bold bg-orange-600 text-white rounded-lg self-center px-1 py-0.5">
                              Requerido
                            </span>
                          </div>
                          <span className="text-sm">
                            Selecciona hasta {component_produc.amount} opciones
                          </span>
                          {components.map((component) => {
                            if (
                              Number(component.component_categ_id) ===
                              Number(component_produc.component_categ_id)
                            ) {
                              return (
                                <div className="flex items-center mb-1">
                                  <input
                                    id={component.id}
                                    type="checkbox"
                                    value=""
                                    checked={IsComponentSelected(component)}
                                    onChange={() =>
                                      handlerSelectComponent(component)
                                    }
                                    name={`checkbox-${component.name}`}
                                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-600 focus:ring-1"
                                  />
                                  <label
                                    htmlFor={component.id}
                                    className="ml-2 text-sm font-medium text-gray-900"
                                  >
                                    {component.name}
                                  </label>
                                </div>
                              );
                            }
                          })}
                        </div>
                      ))}
                    </form>
                    <div className="flex items-center mt-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value={isPostable}
                        checked={isPostable}
                        onChange={onChangeCheckIsPostable}
                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-600 focus:ring-2 "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ml-2 text-xs font-medium text-gray-800"
                      >
                        ¿Deseas que tu creación se publique y sea visible a la
                        comunidad de chefcitoos?
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex flex-row justify-end border-t border-gray-200">
            <button
              type="button"
              className="bg-orange-600 w-24 h-8 text-white rounded-xl font-bold"
              onClick={onSaveCreation}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;