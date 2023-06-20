import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { GetAllComments, DeleteComments } from "../Redux/actions";
import RatingStars from "./RatingStars";
import Swal from "sweetalert2";

function ModalComments({ creationId, onClose }) {
  const dispatch = useDispatch();
  const allComments = useSelector((state) => state.Comments);
  console.log("creationId", creationId);

  console.log("::allComments::", allComments);

  useEffect(() => {
    dispatch(GetAllComments(creationId));
  }, [dispatch]);

  const handleDeleteCreation = async (id) => {
    console.log("::id::", id);
    dispatch(DeleteComments(id));

    const confirmation = await Swal.fire({
      title: "¿Estás seguro que quieres eliminar este comentario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff9800",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: "bg-red-600 text-white rounded-md px-4 py-2 mr-2",
        cancelButton: "bg-green-600 text-white rounded-md px-4 mr-2 py-2",
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (confirmation.isConfirmed) {
      await Swal.fire({
        icon: "success",
        title: "Comentario eliminado",
        showConfirmButton: false,
        timer: 1500, // Duración del mensaje en milisegundos (1.5 segundos)
      });
      window.location.reload();
    }
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
              Comentarios
            </h3>
            <button
              className="bg-gray-400 rounded-full flex justify-center self-center w-6 mr-2"
              onClick={onClose}
            >
              <FontAwesomeIcon className="p-1 text-white" icon={faClose} />
            </button>
          </div>
          <div className="bg-white px-5 pb-4 ">
            <div className="flex flex-col">
              {/* Modal body */}
              <ul className="flex-col mt-[6px] w-[100%] h-[350px] overflow-y-auto">
                {/* div card */}
                {
                  allComments.length === 0 ? (
                    <p className="text-lg text-center" >Esta creacion no tiene comentarios</p>
                  ) : (
                    allComments &&
                  allComments.map((creation, index) => (
                    <div className="flex justify-between mb-3 gap-10 py-[9px] w-full border-b border-gray-300 pb-2">
                        <div className="w-5/6">
                          <h5 className="font-semibold text-lg uppercase">
                            {creation.User.name}
                          </h5>
                          <RatingStars value={creation.vote}></RatingStars>
                          <h6 className="text-sm text-gray-800">
                            {creation.content}
                          </h6>
                        </div>
                        <div className="w-1/6">
                          <div className="flex justify-end mr-4">
                            <button
                              onClick={() => handleDeleteCreation(creation.id)}
                              className="relative bg-red-200 rounded-full w-8 h-8 shadow-lg flex items-center justify-center"
                            >
                              <span className="text-red-600 text-md">❌</span>
                            </button>
                          </div>
                        </div>
                    </div>
                  ))
                  ) 
                }
                {/* {allComments &&
                  allComments.map((creation, index) => (
                    <div className="flex justify-between mb-3 gap-10 py-[9px] w-full border-b border-gray-300 pb-2">
                        <div className="w-5/6">
                          <h5 className="font-semibold text-lg uppercase">
                            {creation.User.name}
                          </h5>
                          <RatingStars value={creation.vote}></RatingStars>
                          <h6 className="text-sm text-gray-800">
                            {creation.content}
                          </h6>
                        </div>
                        <div className="w-1/6">
                          <div className="flex justify-end mr-4">
                            <button
                              onClick={() => handleDeleteCreation(creation.id)}
                              className="relative bg-red-200 rounded-full w-8 h-8 shadow-lg flex items-center justify-center"
                            >
                              <span className="text-red-600 text-md">❌</span>
                            </button>
                          </div>
                        </div>
                    </div>
                  ))} */}
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex flex-row justify-end border-t border-gray-200"></div>
        </div>
      </div>
    </div>,
    document.getElementById("ModalComments")
  );
}

export default ModalComments;
