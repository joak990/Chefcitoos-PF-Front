import React, { useEffect, useState } from "react";
import MercadoPagoButton from "../components/MercadoPagoButton";
import logo from "../img/LogoChefcitoos.png";
import { useDispatch, useSelector } from "react-redux";
import { orderDetail, setUser } from "../Redux/actions";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import { disableNetwork } from "firebase/firestore";

const Checkout = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const order = useSelector((state) => state.orderDetail);
  const userRedux = useSelector((state) => state.user);
  const [errorAddress, setErrorAddress] = useState("");

  useEffect(() => {
    dispatch(orderDetail(id));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorAddress("")
    // console.log(event.target.value);
    const form = event.target;
    const formData = new FormData(form);
    console.log(formData);
    console.log(Object.fromEntries(formData.entries()).newAddress);

    if (Object.fromEntries(formData.entries()).newAddress.length > 15) {
      axios
        .put(`/users/newAddress/${userRedux.id}`, Object.fromEntries(formData.entries()))
        .then((response) => {
          Swal.fire({
            title: 'Direccion de envio guardada satisfactoriamente',
            icon: 'success',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
            }
          })
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrorAddress("La dirección debe contener al menos 15 caracteres")
    }
  };

  return (
    <>
      <div className="bg-gray-50 flex flex-col items-center justify-center mx-auto pt-[40px] w-full">
        <img src={logo} className="lg:w-60 md:w-60 w-44 mb-5" />
        <div className="flex flex-col md:gap-10 items-center justify-center w-full">
          <div className="flex flex-col md:gap-10 gap-[50px] items-center justify-center lg:max-w-[1112px] mx-auto md:px-5 w-full">
            <div className="flex md:flex-col flex-row md:gap-10 gap-[10px] items-center justify-center lg:w-[95%] md:w-full">
              <div className="bg-white mb-32 shadow-md flex flex-col items-center justify-start lg:p-[46px] md:px-10 sm:px-5 p-5 rounded-[16px] shadow-bs6 w-full md:w-full">
                <div className="flex flex-col gap-8 items-center justify-start w-full">
                  <h5 className="text-gray-900 text-3xl font-bold">
                    Paga tu orden
                  </h5>
                  <div className="flex lg:flex-row md:flex-row flex-col gap-8 lg:px-[30px] items-start justify-start w-full">
                    <div className="flex flex-col lg:w-1/2 md:w-1/2 gap-4 items-start justify-start rounded-lg w-full">
                      <div className="flex lg:flex-col flex-col gap-4 items-start justify-between rounded-lg w-full">
                        <form action="" onSubmit={handleSubmit}>
                          <label
                            htmlFor="newAddress"
                            className="text-gray-900 text-xl font-semibold"
                          >
                            Dirección de envío
                          </label>
                          <textarea
                            className="text-left border border-gray-300 rounded-md w-full"
                            id="newAddress"
                            name="newAddress"
                            placeholder="Si desea puede cambiar la dirección de envio"
                            rows={3}
                            defaultValue={
                              userRedux.address ? userRedux.address : ""
                            }
                          // value={inputAddress}
                          // onChange={handleChange}
                          />
                          {errorAddress && <p className="text-red-500 mb-3 text-sm">{errorAddress}</p>}
                          <button
                            type="submit"
                            className="bg-orange-600 pointer w-24 h-8 text-white rounded-xl font-bold"
                          //   onClick={() => navigate("/shippingaddress")}
                          >
                            Cambiar
                          </button>
                        </form>
                      </div>
                    </div>
                    {order.total_price && (
                      <div className="flex flex-col lg:w-1/2 md:w-1/2">
                        <div className="flex flex-col gap-4 items-start justify-start w-full">
                          <h5 className="text-gray-900 text-2xl font-semibold">
                            Información de la orden
                          </h5>
                          <div className="flex flex-col items-start justify-start w-full">
                            <h4 className="text-lg">
                              Nombre:{" "}
                              <span className="font-semibold">
                                {userRedux.name}
                              </span>
                            </h4>
                            <h4 className="text-lg">
                              Email:{" "}
                              <span className="font-semibold">
                                {userRedux.email}
                              </span>
                            </h4>
                            <h4 className="text-lg">
                              Orden Nº:{" "}
                              <span className="font-semibold">{order.id}</span>
                            </h4>
                          </div>
                        </div>
                        <div className="h-[230px] overflow-y-scroll">
                          {order.Creations?.map((creation, index) => (
                            <div className="flex flex-col mt-3 mb-3 gap-10 items-center justify-end py-[9px] w-full border-b border-gray-300 pb-2">
                              <div className="flex px-2 flex-row items-end justify-between w-full">
                                <div className="bg-gray_51 flex flex-row items-center justify-between rounded-[16.5px] w-[50%]">
                                  <div className="flex flex-row">
                                    <h5 className="font-semibold text-md uppercase mr-3">
                                      {creation.Creations_orders.quantity}
                                    </h5>
                                    <span className="mr-3">x</span>
                                    <h5 className="font-semibold text-md uppercase">
                                      {creation.name}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {order.products?.map((product, index) => (
                            <div className="flex flex-col mt-3 mb-3 gap-10 items-center justify-end py-[9px] w-full border-b border-gray-300 pb-2">
                              <div className="flex px-2 flex-row items-end justify-between w-full">
                                <div className="bg-gray_51 flex flex-row items-center justify-between rounded-[16.5px] w-[50%]">
                                  <div className="flex flex-row">
                                    <h5 className="font-semibold text-md uppercase mr-3">
                                      {product.Order_products.quantity}
                                    </h5>
                                    <span className="mr-3">x</span>
                                    <h5 className="font-semibold text-md uppercase">
                                      {product.name}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col w-full">
                          <h5 className="text-gray-900 text-xl font-semibold text-right mt-2">
                            Total a pagar: $
                            <span className="">{order.total_price}</span>
                          </h5>
                        </div>
                      </div>
                    )}
                  </div>
                  {order.total_price && errorAddress.length <= 0 && <MercadoPagoButton order={order} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
