import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteComments, DeleteUser, GetAllComments, getCreations } from "../Redux/actions";
import NavAdmin from "./NavAdmin";
import { Card } from "@tremor/react";
import { Link } from "react-router-dom";
import RatingStars from "../components/RatingStars";
import Swal from 'sweetalert2'
import ModalComments from '../components/ModalComments';

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
  const comments = useSelector((state) => state.Comments);

  const openModal = (id) => {
    setSelectedCreationId(id);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleviewCreation = async (id) => {

   
    //alert("Vas a mandar");
    dispatch(GetAllComments(id));
    
    await Swal.fire({
      title: 'Comentarios Cargados',
      icon: 'success',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
      }
    })
    
  };

  const renderProductButton = (product_id) => {
    switch (product_id) {
      case 1:
      case 2:
      case 3:
      case 4:
        return (
          <button className="bg-indigo-200 rounded-2xl w-48">
            Hamburguesas
          </button>
        );
      case 5:
      case 6:
      case 7:
      case 8:
        return (
          <button className="bg-green-200 rounded-2xl w-48">Perros</button>
        );
      case 9:
      case 10:
      case 11:
        return (
          <button className="bg-orange-200 rounded-2xl w-48">Burritos</button>
        );
      case 12:
      case 13:
      case 14:
      case 15:
        return (
          <button className="bg-yellow-200 rounded-2xl w-48">Sandwiches</button>
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
          <button className="bg-red-200 rounded-2xl w-48">
            Otros Platos
          </button>
        );
      default:
        return null;
    }
  };

  const handleDeleteCreation = async (id) => {
    dispatch(DeleteComments(id));
  
    const confirmation = await Swal.fire({
      title: '¿Estás seguro que quieres eliminar este comentario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9800',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-red-600 text-white rounded-md px-4 py-2 mr-2',
        cancelButton: 'bg-green-600 text-white rounded-md px-4 mr-2 py-2',
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  
    if (confirmation.isConfirmed) {
      // Aquí agregarías la lógica para eliminar el comentario
      // ...
      // Luego, mostrar el alert de éxito
      await Swal.fire({
        icon: 'success',
        title: 'Comentario eliminado',
        showConfirmButton: false,
        timer: 1500, // Duración del mensaje en milisegundos (1.5 segundos)
      });
      window.location.reload();
    }
  };
  

  return (
    <main className="bg-slate-200 min-h-screen overflow-y-auto">
      <NavAdmin />
      <div className="w-9/12 flex flex-col lg:flex-row lg:justify-center">
      {isModalOpen && (
          <ModalComments
            onClose = {() => setIsModalOpen(false)}
            creationId={selectedCreationId}
          />
        )}
        <div className="h-screen bg-slate-200 flex-grow"></div>
        <div className="lg:w-3/4">
          <div className="mt-5">
            <Card className="p-4 bg-white">
              <h1 className="text-2xl font-bold">Creaciones Publicadas</h1>
              <div className="overflow-x-hidden">
                <table className="w-full mt-2">
                  <thead>
                    <tr>
                      <th className="py-2 pr-8 text-left border-b border-gray-300 border-r border-gray-300">
                        Id de creacion
                      </th>
                      <th className="py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r border-gray-300">
                        id usuario
                      </th>
                      <th className="py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r border-gray-300">
                        Nombre de creación
                      </th>
                      <th className="py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r border-gray-300">
                        Tipo de producto
                      </th>
                      <th className="py-2 pl-8 pr-8 text-left border-b border-gray-300 border-gray-300">
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
                          className={`py-2 pl-4 pr-8 ${
                            index !== creations.length - 1
                              ? "border-b border-gray-300"
                              : ""
                          } border-r border-gray-300`}
                        >
                          {renderProductButton(creation.product_id)}
                        </td>
                        <td
                          className={`py-2 pl-1 pr-8 ${
                            index !== creations.length - 1
                              ? "border-b border-gray-300"
                              : ""
                          } text-center`}
                        >
                          <button
                            // onClick={() => handleviewCreation(creation.id)}
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
        </div>
      </div>
    </main>
  );
}

export default CreationsAdmin;



// </Card>
//             <Card className="p-4 bg-white">
//               <h1 className="text-2xl font-bold">Comentarios</h1>
//               <div className="overflow-x-hidden">
//                 <table className="w-full mt-2">
//                   <thead>
//                     <tr>
//                       <th className="py-2 pr-8 text-left border-b border-gray-300 border-r border-gray-300">
//                         Id de creacion
//                       </th>
//                       <th className="py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r border-gray-300">
//                         Id de usuario
//                       </th>
//                       <th className="py-2 pl-10 pr-2 text-center border-b border-gray-300 border-r border-gray-300">
//                         Comentario
//                       </th>
//                       <th className="py-2 pl-24 pr-10 text-center border-b border-gray-300 border-r border-gray-300">
//                         <div className="mr-8">Voto</div>
                        
//                       </th>
//                       <th className="py-6 pl-8 pr-2 text-left border-b border-gray-300 border-r border-gray-300">
//                         Eliminar
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {comments?.map((comment, index) => (
//                       <tr key={index}>
//                         <td
//                           className={`py-2 pr-8 ${
//                             index !== comment.length - 1
//                               ? "border-b border-gray-300"
//                               : ""
//                           } border-r border-gray-300`}
//                         >
//                           {comment.id}
//                         </td>
//                         <td
//                           className={`py-2 pl-8 pr-8 ${
//                             index !== comment.length - 1
//                               ? "border-b border-gray-300"
//                               : ""
//                           } border-r border-gray-300`}
//                         >
//                           {comment.user_id}
//                         </td>
//                         {comment.content ? (<td
//                           className={`py-2 pl-8 pr-8 ${
//                             index !== comment.length - 1
//                               ? "border-b border-gray-300"
//                               : ""
//                           } border-r border-gray-300`}
//                         >
//                           {comment.content}
//                         </td>): <td
//                           className={`py-2 pl-8 pr-8 ${
//                             index !== comment.length - 1
//                               ? "border-b border-gray-300"
//                               : ""
//                           } border-r border-gray-300`}
//                         >
//                           NO HAY
//                         </td>}
                
//                         <td
//                           className={`py-2 pl-4 pr-8 ${
//                             index !== comment.length - 1
//                               ? "border-b border-gray-300"
//                               : ""
//                           } border-r border-gray-300`}
//                         >
//                         <RatingStars   value={parseInt(comment.vote)} />
//                         </td>
//                         <td
//                           className={`py-2 pl-1 pr-8 ${
//                             index !== comment.length - 1
//                               ? "border-b border-gray-300"
//                               : ""
//                           } text-center`}
//                         >
//                           <button
//                             onClick={() => handleDeleteCreation(comment.id)}
//                             className="bg-red-200 rounded-2xl font-semibold w-32"
//                           >
//                             Eliminar
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </Card>
