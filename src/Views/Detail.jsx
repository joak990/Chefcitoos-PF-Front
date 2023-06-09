import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetail, getCreationDetail, postAssessment, getAssessmentValidate } from "../Redux/actions";
import { comments } from "../Redux/actions";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase.config";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RatingStars from "../components/RatingStars";
import Swal from 'sweetalert2'

export default function Detail() {
  const { id } = useParams();
  const userId = localStorage.getItem("id");
  const dispatch = useDispatch();
  const creation = useSelector((state) => state.creationDetail);
  const allComments = useSelector((state) => state.AllComments);
  const isIdInLocalStorage = localStorage.getItem("id");
  const [showComments, setShowComments] = useState(false);
  const [form, setForm] = useState({
    creation_id: "",
    user_id: parseInt(userId),
    content: "",
    vote: "",
    img: ""
  });

  const [errors, setErrors] = useState({});

  const firebaseAuth = getAuth(app);
  const user = firebaseAuth.currentUser;
  const img = user?.photoURL;

  useEffect(() => {
    dispatch(getCreationDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch]);

  const handleRatingChange = (value) => {
    console.log("_::::::.", value);
    setForm({
      ...form,
      vote: value.toString()
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      creation_id: creation.id,
      [name]: value,
      img: img ? img : ""
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!form.content.trim()) {
      newErrors.content = "El nombre es requerido";
    } else if (form.content.length > 80) {
      newErrors.content = "El comentario debe tener como máximo 80 caracteres";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      dispatch(postAssessment(form));
      await Swal.fire({
        title: 'Comentario enviado',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
        }
      })
      window.location.reload();

      setForm({
        creation_id: "",
        user_id: "",
        content: "",
        vote: "",
        img: ""
      });
    }
  };

  const handleShowComments = () => {
    dispatch(comments(creation.id));
    setShowComments(!showComments);
  };

  return (
    <>
      <div className="px-6 md:px-20">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-gray-900 font-bold text-3xl mt-6 mb-6">
            Detalle de la creación
          </h2>
        </div>
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="md:w-1/2 flex justify-center items-center bg-white rounded-3xl p-8 shadow-md">
            <img
              className="w-full max-h-[400px] md:w-[400px] rounded-lg"
              src={creation?.image}
              alt="Product Image"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center mt-4 md:mt-0">
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
              <span className="text-orange-600 font-semibold">Ingredientes:</span>
              <h3 className="capitalize">
                {creation &&
                  creation.components?.Ingredientes ? (
                  creation.components.Ingredientes.map((elem, index) => {
                    return index === creation.components.Ingredientes.length - 1 ? (
                      elem
                    ) : (
                      elem + ", "
                    );
                  })
                ) : (
                  "No hay Ingredientes"
                )}
              </h3>
              <br></br>
              <span className="text-orange-600 font-semibold">Salsas:</span>
              <h3 className="capitalize">
                {creation &&
                  creation.components?.Salsas ? (
                  creation.components.Salsas.map((elem, index) => {
                    return index === creation.components.Salsas.length - 1 ? (
                      elem
                    ) : (
                      elem + ", "
                    );
                  })
                ) : (
                  "No hay Salsas"
                )}
              </h3>
              <br></br>
              <span className="text-orange-600 font-semibold">Adiciones:</span>
              <h3 className="capitalize">
                {creation &&
                  creation.components?.Adiciones ? (
                  creation.components.Adiciones.map((elem, index) => {
                    return index === creation.components.Adiciones.length - 1 ? (
                      elem
                    ) : (
                      elem + ", "
                    );
                  })
                ) : (
                  "No hay adiciones"
                )}
              </h3>
              <br></br>
              <span className="text-orange-600 font-semibold">Carnes:</span>
              <h3 className="capitalize">
                {creation &&
                  creation.components?.Carnes ? (
                  creation.components.Adiciones.map((elem, index) => {
                    return index === creation.components.Adiciones.length - 1 ? (
                      elem
                    ) : (
                      elem + ", "
                    );
                  })
                ) : (
                  "No hay carnes"
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start ml-8">
        <h2 className="text-orange-600 font-bold text-3xl mt-6 mb-6">
          Comentarios
        </h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={handleShowComments}
            className="bg-orange-600 w-48 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded"
          >
            {showComments ? "Ocultar comentarios" : "Ver comentarios"}
          </button>
        </div>

        {showComments && (
          <div className="flex flex-col items-center mb-4">
            {allComments.length === 0 ? (
              <p className="text-gray-700 text-lg">Esta creación aún no tiene comentarios.</p>
            ) : (
              allComments && allComments.map((elem) => {
                return (
                  <>
                    {
                      !elem.isDeleted ? (
                        <div key={elem.id} className="mb-4">
                          <div className="flex items-center">
                            {elem.img ? (
                              <img
                                className="w-8 h-8 rounded-full mr-2"
                                src={elem.img}
                                alt="User Avatar"
                              />
                            ) : (
                              <FontAwesomeIcon
                                className="h-5 ml-2 mr-2"
                                icon={faUser}
                              />
                            )}
                            <h4 className="text-gray-900 font-bold">
                              {elem.userName}
                            </h4>
                            <div className="ml-4">
                              <RatingStars disabled={showComments} value={parseInt(elem.vote)} />
                            </div>
                          </div>
                          <p className="w-44 p-2 text-gray-700 rounded-md">
                            {elem.content}
                          </p>
                          <div className="flex items-center mt-2"></div>
                        </div>
                      ) :
                        null
                    }
                  </>
                );
              })
            )}
          </div>
        )}

        {isIdInLocalStorage ? (
          <form onSubmit={handleSubmit} className="w-full md:w-1/2">
            <div className="mt-4">
              <RatingStars
                value={parseFloat(form.vote)}
                handleRatingChange={handleRatingChange}
              />
              <label htmlFor="content" className="text-gray-900 font-semibold">
                Deja un comentario:
              </label>
              <textarea
                name="content"
                id="content"
                className="border border-gray-300 rounded-md p-2 mt-2 w-full"
                value={form.content}
                onChange={handleChange}
              ></textarea>
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded"
              >
                Enviar comentario
              </button>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
