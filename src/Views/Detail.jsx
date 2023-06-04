import React, { useEffect } from "react";
import logochefcito from "../img/hamburguesafinal.png";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getCreationDetail } from "../Redux/actions";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const creation = useSelector((state) => state.creationDetail);

  useEffect(() => {
    dispatch(getCreationDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch]);
  console.log(creation);

  return (
    //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    //   <div>
    //     <img className="w-full h-auto" src={creation?.image} alt="" />
    //   </div>
    //   <div className="flex flex-col justify-center">
    //     <h3 className="text-gray-900 font-bold text-center text-5xl mt-6 mb-6">Detalle de tu creación</h3>
    //     <h2 className="text-gray-900 text-2xl font-semibold">{creation?.name}</h2>
    //     <h2 className="text-gray-900 text-md font-semibold">{creation.product?.name}</h2>
    //     <h4 className="text-gray-900 text-sm font-semibold">{creation.Users?.name}</h4>
    //     <h6 className="text-gray-900 font-bold text-center text-5xl mt-6 mb-6">Ingredientes</h6>
    //     <h3 className="capitalize">
    //       {creation &&
    //       creation.componentNames?.map((elem) => {
    //         return (
    //           `- ${elem} `
    //         )
    //       })}
    //     </h3>
    //   </div>
    // </div>
    <>
      <div className="px-20">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-gray-900 font-bold text-3xl mt-6 mb-6">
            Detalle de tu creación
          </h2>
        </div>
        <div className="flex gap-8">
          <div className="w-1/2 flex justify-center items-center bg-white rounded-3xl p-8 shadow-md">
            <img
              className="w-[400px] rounded-lg"
              src={creation?.image}
              alt="Product Image"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <h3 className="text-3xl text-orange-600 capitalize font-semibold">
              {creation?.name}
            </h3>
            <h4 className="text-gray-900 text-xl mt-2 font-semibold">
              Tipo: {creation.product?.name}
            </h4>
            <p className="text-gray-700 text-lg mt-2">
              Creado por: {creation.Users?.name}
            </p>
            <div className="mt-4">
              <span className="text-gray-900 font-semibold">Precio:</span>
              <span className="text-orange-600 font-semibold text-2xl">
                ${creation.price}
              </span>
            </div>
            <div className="mt-4">
              <span className="text-gray-900 font-semibold">Ingredientes:</span>
              <h3 className="capitalize">
                {creation &&
                  creation.componentNames?.map((elem) => {
                    return `- ${elem} `;
                  })}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="px-24 mt-2">
        <h2 className="text-orange-600 font-bold text-3xl mt-6 mb-6">
          Comentarios
        </h2>

        <div className="flex items-center mb-4">
          <div className="flex items-center mr-4">
            <svg
              className="w-6 h-6 fill-current text-orange-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L15.09 8.54L22 9.82L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.82L8.91 8.54L12 2Z" />
            </svg>
            <svg
              className="w-6 h-6 fill-current text-orange-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L15.09 8.54L22 9.82L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.82L8.91 8.54L12 2Z" />
            </svg>
            <svg
              className="w-6 h-6 fill-current text-orange-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L15.09 8.54L22 9.82L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.82L8.91 8.54L12 2Z" />
            </svg>
            <svg
              className="w-6 h-6 fill-current text-gray-400"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L15.09 8.54L22 9.82L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.82L8.91 8.54L12 2Z" />
            </svg>
            <svg
              className="w-6 h-6 fill-current text-gray-400"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L15.09 8.54L22 9.82L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.82L8.91 8.54L12 2Z" />
            </svg>
          </div>
          <span className="text-gray-600 text-sm">(4.5)</span>
        </div>

        <div className="mb-4">
          <div className="flex items-start mb-2">
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <h4 className="text-gray-900 font-semibold">Usuario 1</h4>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div className="flex items-start mb-2">
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <h4 className="text-gray-900 font-semibold">Usuario 2</h4>
              <p className="text-gray-700">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </div>

        <form className="mb-4">
          <h3 className="text-gray-900 font-semibold mb-2">
            Deja tu comentario
          </h3>
          <div className="flex items-center mb-2">
            <input
              type="text"
              className="w-[700px] border border-gray-300 rounded-md py-2 px-4"
              placeholder="Nombre"
            />
          </div>
          <div className="flex items-center mb-2">
            <textarea
              className="w-[700px] border border-gray-300 rounded-md py-2 px-4"
              placeholder="Comentario"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
