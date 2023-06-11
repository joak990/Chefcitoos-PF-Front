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
      <div className="bg-white shadow-lg flex flex-col rounded-lg p-6">
        <img src={logo} className="w-60 mb-5" />
        {order.state && (
        <div>
        {order.state === "Pagada" ? (
          <>
            <h2 className="text-green-500 text-2xl font-bold mb-4 text-center">
              ¡Pago exitoso!
            </h2>
            <p className="text-gray-600 text-center">
              Tu orden pasa a preparación
            </p>
          </>
        ) : (
          <>
            <h2 className="text-red-500 text-2xl font-bold mb-4 text-center">
              Pago fallido
            </h2>
            <p className="text-gray-600 text-center">
              Lo siento tu pago ha sido rechazado
            </p>
          </>
        )}
        </div>)}
        <Link
          to="/"
          className="text-md mt-4 font-semibold self-center text-orange-600 border-b-2 border-orange-600"
        >
          Volver al Home
        </Link>
      </div>
    </div>
  );
};
