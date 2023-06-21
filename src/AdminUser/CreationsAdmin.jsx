import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCreations } from "../Redux/actions";
import NavAdmin from "./NavAdmin";
import { Card } from "@tremor/react";
import ModalComments from "../components/ModalComments";

function CreationsAdmin() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCreationId, setSelectedCreationId] = useState(null);

  useEffect(() => {
    dispatch(getCreations());

    const interval = setInterval(() => {
      window.location.reload();
    }, 120000); // 2 minutos en milisegundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [dispatch]);

  const creations = useSelector((state) => state.allCreations);

  const openModal = (id) => {
    setSelectedCreationId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderProductButton = (product_id) => {
    switch (product_id) {
      case 1:
      case 2:
      case 3:
      case 4:
        return (
          <button className="bg-indigo-200 rounded-2xl w-36">
            Hamburguesa
          </button>
        );
      case 5:
      case 6:
      case 7:
      case 8:
        return (
          <button className="bg-green-200 rounded-2xl w-36">Perro Caliente</button>
        );
      case 9:
      case 10:
      case 11:
        return (
          <button className="bg-orange-200 rounded-2xl w-36">Burrito</button>
        );
      case 12:
      case 13:
      case 14:
      case 15:
        return (
          <button className="bg-yellow-200 rounded-2xl w-36">Sandwich</button>
        );
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
      case 26:
        return (
          <button className="bg-red-200 rounded-2xl w-36">Otros Platos</button>
        );
      default:
        return null;
    }
  };

  return (
    <main className="bg-slate-200 min-h-screen overflow-y-auto">
      <NavAdmin />
      <div className="w-full md:w-9/12 lg:w-9/12 px-4 mx-auto flex justify-center">
        {isModalOpen && (
          <ModalComments
            onClose={() => setIsModalOpen(false)}
            creationId={selectedCreationId}
          />
        )}
        <Card className="p-4 bg-white mt-6 mb-6">
          <h1 className="text-2xl font-bold">Creaciones Publicadas</h1>
          <div className="overflow-x-auto flex flex-col">
            <table className="w-full mt-2">
              <thead>
                <tr>
                  <th className="py-2 pr-8 text-left border-b border-gray-300 border-r">
                    ID de Creación
                  </th>
                  <th className="py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r">
                    ID de Usuario
                  </th>
                  <th className="py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r">
                    Nombre de Creación
                  </th>
                  <th className="py-2 pl-8 pr-8 text-center border-b border-gray-300 border-r">
                    Tipo de Producto
                  </th>
                  <th className="py-2 pl-8 pr-8 text-center border-b border-gray-300">
                    Comentarios
                  </th>
                </tr>
              </thead>
              <tbody>
                {creations?.map((creation, index) => (
                  <tr key={index}>
                    <td
                      className={`py-2 pr-8 ${
                        index !== creations.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } border-r border-gray-300`}
                    >
                      {creation.id}
                    </td>
                    <td
                      className={`py-2 pl-8 pr-8 ${
                        index !== creations.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } border-r border-gray-300`}
                    >
                      {creation.users_id}
                    </td>
                    <td
                      className={`py-2 pl-8 pr-8 ${
                        index !== creations.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } border-r border-gray-300`}
                    >
                      {creation.name}
                    </td>
                    <td
                      className={`py-2 pl-4 pr-8 text-center ${
                        index !== creations.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } border-r border-gray-300`}
                    >
                      {renderProductButton(creation.product_id)}
                    </td>
                    <td
                      className={`py-2 pl-1 pr-8 text-center ${
                        index !== creations.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } text-center`}
                    >
                      <button
                        onClick={() => openModal(creation.id)}
                        className="bg-blue-200 rounded-2xl font-semibold w-48"
                      >
                        Ver Comentarios
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  );
}

export default CreationsAdmin;
