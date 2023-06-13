import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import image from "../img/hamburguesa.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  cleanShoppingCart,
  deleteCreation,
  deleteProduct,
  getComponents,
  updateCreationQuantity,
  updateProductQuantity,
} from "../Redux/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalShoppingCart = ({ onClose }) => {
  const creations = useSelector((state) => state.shoppingCart.creations);
  const products = useSelector((state) => state.shoppingCart.products);
  const amounts = useSelector((state) => state.shoppingCart.amounts);
  const quantity = useSelector((state) => state.shoppingCart.quantity);
  const dispatch = useDispatch();
  const users_id = localStorage.getItem("id");
  const maxQuantity = 10;
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handlePayOrder = () => {
    if (quantity > 0) {
      //CRear objeto a enviar
      //Mandar la orden al backend con un dispatch
      const order = {
        users_id,
        total_price: amounts.total,
        creations,
        products,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}orders`, order)
        .then((response) => {
          console.log(response);
          dispatch(cleanShoppingCart());
          Swal.fire({
            title: "Orden creada satisfactoriamente",
            icon: "success",
            buttonsStyling: false,
            customClass: {
              confirmButton: "bg-orange-600 text-white rounded-md px-4 py-2",
            },
          });
          navigate("/checkout/" + response.data.id);
        })
        .catch((error) => {});
      //   console.log(JSON.stringify(order));
    }
  };

  const handleDeleteProduct = (index) => {
    Swal.fire({
      title: "¿Está seguro que desea eliminar el producto?",
      icon: "danger",
      showCancelButton: true,
      confirmButtonColor: "#9CA3AF",
      cancelButtonColor: "#EA580C",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct({ index }));
      }
    });
  };

  const handleDeleteCreation = (index) => {
    Swal.fire({
      title: "¿Está seguro que desea eliminar el producto?",
      icon: "danger",
      showCancelButton: true,
      confirmButtonColor: "#9CA3AF",
      cancelButtonColor: "#EA580C",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCreation({ index }));
      }
    });
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
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full md:w-6/6 lg:w-4/5 xl:w-3/4 2xl:w-3/5">
          <div className="border-b border-b-gray-200 flex justify-between">
            <h3
              className="text-lg leading-6 font-medium text-gray-900 p-4"
              id="modal-title"
            >
              Tu orden
            </h3>
            <button
              className="bg-gray-400 rounded-full flex justify-center self-center w-6 mr-2"
              onClick={onClose}
            >
              <FontAwesomeIcon className="p-1 text-white" icon={faClose} />
            </button>
          </div>
          <div className="bg-white px-5 pb-4 ">
            <div className="flex flex-col items-center">
              {/* Modal body */}
              <ul className="flex-col items-center mt-[6px] w-[100%]">
                {/* div card */}
                {creations.map((creation, index) => (
                  <div className="flex flex-col mb-3 gap-10 items-center justify-end py-[9px] w-full border-b border-gray-300 pb-2">
                    <div className="flex px-2 lg:flex-row flex-col lg:items-end lg:justify-between w-full">
                      <div className="bg-gray_51 flex flex-row items-center rounded-[16.5px] w-[50%]">
                        <img
                          src={creation.image}
                          className="h-[70px] md:h-auto rounded-lg w-[70px]"
                          alt="product name"
                        />
                        <div className="max-w-[300px] px-3 flex flex-col">
                          <h5 className="font-semibold text-md uppercase">
                            {creation.name}
                          </h5>
                          <h6 className="text-gray-500 text-sm font-semibold">
                            ${creation.price}
                          </h6>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        {creation.quantity >= maxQuantity && (
                          <p className="text-red-500 text-[10px] text-center max-w-[150px]">
                            No se pueden agregar más productos, llame al
                            +573112674038
                          </p>
                        )}
                        <div className="flex flex-row">
                          <button
                            className="bg-gray-200 text-black px-3 py-0.5 mr-2 rounded-lg hover:text-orange-600"
                            disabled={creation.quantity <= 1}
                            onClick={() =>
                              dispatch(
                                updateCreationQuantity({ quantity: -1, index })
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            className="w-12 text-center border border-gray-300 rounded-md"
                            type="text"
                            value={creation.quantity}
                          />
                          <button
                            className="bg-gray-200 text-black px-3 py-0.5 ml-2 rounded-lg hover:text-orange-600"
                            disabled={creation.quantity >= maxQuantity}
                            onClick={() =>
                              dispatch(
                                updateCreationQuantity({ quantity: 1, index })
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <button
                          className="bg-gray-200 rounded-lg flex justify-center self-end"
                          onClick={() => handleDeleteCreation(index)}
                        >
                          <FontAwesomeIcon
                            className="p-2 text-gray-500 text-xs hover:text-orange-600"
                            icon={faTrash}
                          />
                        </button>
                        <h5 className="font-semibold text-lg">
                          ${creation.price * creation.quantity}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}

                {products.map((product, index) => (
                  <div className="flex flex-col mb-3 gap-10 items-center justify-end py-[9px] w-full border-b border-gray-300 pb-2">
                    <div className="flex px-2 lg:flex-row flex-col lg:items-end lg:justify-between w-full">
                      <div className="bg-gray_51 flex flex-row items-center rounded-[16.5px] w-[50%]">
                        <img
                          src={product.image}
                          className="h-[70px] md:h-auto rounded-lg w-[70px]"
                          alt="product name"
                        />
                        <div className="max-w-[300px] flex-col px-3">
                          <h5 className="font-semibold text-md uppercase">
                            {product.name}
                          </h5>
                          <h6 className="text-gray-500 text-sm font-semibold">
                            ${product.price}
                          </h6>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        {product.quantity >= maxQuantity && (
                          <p className="text-red-500 text-[10px] text-center max-w-[150px]">
                            No se pueden agregar más productos, llame al
                            +573112674038
                          </p>
                        )}
                        <div className="flex flex-row">
                          <button
                            className="bg-gray-200 text-black px-3 py-0.5 mr-2 rounded-lg hover:text-orange-600"
                            disabled={product.quantity <= 1}
                            onClick={() =>
                              dispatch(
                                updateProductQuantity({ quantity: -1, index })
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            className="w-12 text-center border border-gray-300 rounded-md"
                            type="text"
                            value={product.quantity}
                          />
                          <button
                            className="bg-gray-200 text-black px-3 py-0.5 ml-2 rounded-lg hover:text-orange-600"
                            disabled={product.quantity >= maxQuantity}
                            onClick={() =>
                              dispatch(
                                updateProductQuantity({ quantity: 1, index })
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <button
                          className="bg-gray-200 rounded-lg flex justify-center self-end"
                          onClick={() => handleDeleteProduct(index)}
                        >
                          <FontAwesomeIcon
                            className="p-2 text-gray-500 text-xs hover:text-orange-600"
                            icon={faTrash}
                          />
                        </button>
                        <h5 className="font-semibold text-lg">
                          ${product.price * product.quantity}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}

                {creations.length === 0 && products.length === 0 && (
                  <p className="font-semibold my-2 text-center">
                    No hay productos en tu carrito
                  </p>
                )}
              </ul>
              {quantity > 0 && (
                <div className="flex flex-col mt-[6px] w-[60%] gap-5 self-end">
                  <div className="flex flex-row items-center justify-between w-full">
                    <h5
                      className="font-semibold text-black_900"
                      variant="body1"
                    >
                      Subtotal
                    </h5>
                    <h5 className="font-medium text-gray_900" variant="body1">
                      ${amounts.subtotal}
                    </h5>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <h5
                      className="font-semibold text-black_900"
                      variant="body1"
                    >
                      IVA(19%)
                    </h5>
                    <h5 className="font-medium text-gray_900" variant="body1">
                      ${amounts.iva}
                    </h5>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <h5
                      className="font-semibold text-black_900"
                      variant="body1"
                    >
                      Total
                    </h5>
                    <h5
                      className="font-bold text-lg text-gray_900"
                      variant="body1"
                    >
                      ${amounts.total}
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex flex-row justify-end border-t border-gray-200">
            {quantity > 0 && (
              <>
                <button
                  type="button"
                  className="bg-gray-400 mr-2 h-8 text-white rounded-xl font-bold px-2"
                  onClick={() => dispatch(cleanShoppingCart())}
                >
                  Vaciar carrito
                </button>
                <button
                  type="button"
                  className="bg-orange-600 w-24 h-8 text-white rounded-xl font-bold"
                  onClick={handlePayOrder}
                >
                  Pagar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modalShoppingCart")
  );
};

export default ModalShoppingCart;
