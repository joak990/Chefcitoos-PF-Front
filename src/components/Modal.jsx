import React from "react";
import ReactDOM from "react-dom";
import image from "../img/hamburguesa.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ productSelected, onClose }) => {
  console.log(productSelected);

  const components = [
    {id: 1, name: "Jamon", component_categ_id: 1},
    {id: 2, name: "Lechuga", component_categ_id: 1},
    {id: 3, name: "Tomate", component_categ_id: 1},
    {id: 4, name: "Queso", component_categ_id: 1},
    {id: 5, name: "Huevo Frito", component_categ_id: 2},
    {id: 6, name: "Tocineta", component_categ_id: 2},
    {id: 7, name: "Pernil de cerdo", component_categ_id: 3},
    {id: 8, name: "Salami", component_categ_id: 3},
    {id: 9, name: "Pavo", component_categ_id: 3},
    {id: 10, name: "Salsa de Tomate", component_categ_id: 4},
    {id: 11, name: "Mayonesa", component_categ_id: 4},
]

productSelected.components = [
  {id: 1, product_id: 1, component_categ_id: 1, component_categ: {id:1,name:"Ingredientes"}, amount: 5},
  {id: 2, product_id: 1, component_categ_id: 4, component_categ: {id:4,name:"Salsas"}, amount: 13},
]



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
            <button className="bg-gray-400 rounded-full flex justify-center self-center w-6 mr-2">
              <FontAwesomeIcon
                className="p-1 text-white"
                icon={faClose}
                onClick={onClose}
              />
            </button>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:text-left">
                {/* Modal body */}
                <div className="mt-4 flex lg:flex-row flex-col">
                  <div>
                    <img
                      className="rounded-lg w-72"
                      src={productSelected.image}
                      alt=""
                    />
                    <h5 className="text-xl font-bold leading-6 text-orange-600 py-4 text-right">
                      $20000
                    </h5>
                  </div>
                  <div className="flex flex-col px-3 ml-4">
                    <p className="text-xs">{productSelected.description}</p>
                    <form className="">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block font-medium mb-1"
                        >
                          Name:
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="border border-gray-300 rounded-lg p-2"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block font-medium mb-1"
                        >
                          Email:
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="border border-gray-300 rounded-lg p-2"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end border-t border-gray-200">
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
