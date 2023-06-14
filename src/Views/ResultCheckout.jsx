import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { orderDetail } from "../Redux/actions";
import logo from "../img/LogoChefcitoos.png";

export const ResultCheckout = () => {
  const { id } = useParams();
  const order = useSelector((state) => state.orderDetail);
  const dispatch = useDispatch();

  console.log(id);

  useEffect(() => {
    dispatch(orderDetail(id));
  }, [id]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg flex flex-col items-center rounded-lg p-6">
        <img src={logo} className="w-60 mb-5" />
        {order.state && (
          <div>
            {order.state === "Pagada" ? (
              <>
                <h2 className="text-green-500 text-2xl font-bold mb-1 text-center">
                  ¡Pago exitoso!
                </h2>
                <p className="text-gray-600 text-center">
                  Tu orden pasa a preparación
                </p>
              </>
            ) : (
              <>
                <h2 className="text-red-500 text-2xl font-bold mb-1 text-center">
                  Pago fallido
                </h2>
                <p className="text-gray-600 text-center">
                  Lo sentimos tu pago ha sido rechazado.
                </p>
              </>
            )}
          </div>
        )}
        <h5 className="text-gray-900 text-xl mt-4 font-bold text-center">
          Detalle de tu orden:
        </h5>
        <h6 className="text-gray-900 text-md mt-6 font-bold self-start">
          Orden ID: <span className="text-red-500">{order.id}</span>
        </h6>
        <div className="h-[230px] overflow-y-scroll mt-2">
          {order.Creations?.map((creation, index) => (
            <div className="flex flex-col mt-1 mb-1 gap-10 items-center justify-end py-[9px] w-full border-b border-gray-300 pb-1">
              <div className="flex px-2 flex-row items-end justify-between w-full">
                <div className="bg-gray_51 flex flex-row items-center justify-between rounded-[16.5px] w-[50%]">
                  <div className="flex flex-row">
                    <h5 className="font-semibold text-sm uppercase mr-3">
                      {creation.Creations_orders.quantity}
                    </h5>
                    <span className="mr-3">x</span>
                    <h5 className="font-semibold text-sm uppercase">
                      {creation.name}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {order.products?.map((product, index) => (
            <div className="flex flex-col mt-1 mb-1 gap-10 items-center justify-end py-[9px] w-full border-b border-gray-300 pb-1">
              <div className="flex px-2 flex-row items-end justify-between w-full">
                <div className="bg-gray_51 flex flex-row items-center justify-between rounded-[16.5px] w-[50%]">
                  <div className="flex flex-row">
                    <h5 className="font-semibold text-sm uppercase mr-3">
                      {product.Order_products.quantity}
                    </h5>
                    <span className="mr-3">x</span>
                    <h5 className="font-semibold text-sm uppercase">
                      {product.name}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}          
        </div>
        <div className="flex flex-col mt-[22px] w-[60%] gap-5 self-end">
            <div className="flex flex-row items-center justify-between w-full">
              <h5 className="font-semibold text-black_900" variant="body1">
                Total:
              </h5>
              <h5 className="font-bold text-lg text-gray_900" variant="body1">
                ${order.total_price}
              </h5>
            </div>
          </div>
        <Link
          to="/"
          className="text-md mt-8 font-semibold self-center text-orange-600 border-b-2 border-orange-600"
        >
          Volver al Home
        </Link>
      </div>
    </div>
  );
};
