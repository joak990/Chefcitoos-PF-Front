import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import image from "../img/hamburguesa.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getComponents } from "../Redux/actions";

const Modal = ({ productSelected, onClose }) => {
  const dispatch = useDispatch();
  const components = useSelector((state) => state.components);
  const [selectedComponents, setSelectedComponents] = useState([]);
  console.log(productSelected);

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
      amount: 13,
    },
  ];

  useEffect(() => {
    dispatch(getComponents());
  }, []);

  const IsComponentSelected = (component) => {
    return selectedComponents.some(
      (component_current) => component_current.id === component.id
    );
  };

  const handlerSelectComponent = (component) => {
    if (IsComponentSelected(component)) { // unselect
      setSelectedComponents((selectedComponentsOld) => [
        ...selectedComponentsOld.filter(
          (component_current) => component_current.id !== component.id
        ),
      ]);
    } else {
      if (isAllowedToAddComponent(component)) //select
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
                      $20000
                    </h5>
                  </div>
                  <div className="flex flex-col px-3 ml-4 lg:w-1/2 sm:w-1/2 md:w-1/2 h-[450px] overflow-y-scroll">
                    <p className="text-xs">{productSelected.description}</p>
                    <div className="flex flex-col mb-1 items-start mt-4">
                      <input
                        type="text"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2"
                        placeholder="Escribe un nombre para tu creación"
                      />
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Nombre
                      </label>
                    </div>
                    <form className="">
                      {components_product.map((component_produc) => (
                        <div className="mt-4">
                          <div className="flex justify-between">
                            <h5 className="text-md font-bold">
                              {component_produc.component_categ.name}
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
                                <div class="flex items-center mb-1">
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
                                    for={component.id}
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
                    <div class="flex items-center mt-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        checked={true}
                        class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-600 focus:ring-2 "
                      />
                      <label
                        for="default-checkbox"
                        class="ml-2 text-xs font-medium text-gray-800"
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
              onClick=""
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
