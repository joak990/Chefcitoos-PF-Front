import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetail, getCreationDetail, postAssessment, getAssessmentValidate } from "../Redux/actions";
import { comments } from "../Redux/actions";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase.config";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    vote: 5,
    img: ""
  });

  const firebaseAuth = getAuth(app);
  const user = firebaseAuth.currentUser;
 
  const img = user?.photoURL

  useEffect(() => {
    dispatch(getCreationDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      creation_id: creation.id,
      [name]: value,
      img: img ? img :""
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postAssessment(form));
    alert("Comentario agregado");
    window.location.reload()
  };

  const handleShowComments = () => {
    dispatch(comments(creation.id));
    setShowComments(!showComments);
  };

  return (
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
            {allComments &&
              allComments.map((elem) => {
                return (
                  <div key={elem.id} className="mb-4">
                    <div className="flex items-center">
                      {elem.img ? (<img  className="w-8 h-8 rounded-full mr-2" src={elem.img }  />): 
                      <FontAwesomeIcon className="h-5  ml-2 mr-2" icon={faUser} />}
                    
                      <h4 className="text-gray-900 font-bold">
                        {elem.userName}
                      </h4>
                    </div>
                    <p className="bg-gray-200 w-44 p-2 text-gray-700 rounded-md">
                      {elem.content}
                    </p>
                    <div className="flex items-center mt-2"></div>
                  </div>
                );
              })}
          </div>
        )}
              {isIdInLocalStorage ?(<form onSubmit={handleSubmit} className="w-1/2">
          <div className="mt-4">
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
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded"
            >
              Enviar comentario
            </button>
          </div>
        </form>): "" }
        
      </div>
    </>
  );
}
