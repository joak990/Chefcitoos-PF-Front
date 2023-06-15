import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import { changeUserPassword } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import { getAuth,signOut } from "firebase/auth";
import { app } from "../Firebase.config";
function Modalpassword({ onClose }) {
  const [form, setForm] = useState({
    password:""
  });
const dispatch = useDispatch()
const firebaseAuth = getAuth(app);
  const [errors, setErrors] = useState({});
  const id = localStorage.getItem("id");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
const navigate = useNavigate()
const handleSubmit = (event) => {
  event.preventDefault();

  const newErrors = {};

  if (!form.password.trim()) {
    newErrors.password = "La contraseña es requerida";
  } else if (form.password.length < 6) {
    newErrors.password = "La contraseña debe tener al menos 6 caracteres";
  } else if (form.password.length > 20) {
    newErrors.password = "La contraseña debe tener como máximo 20 caracteres";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    const confirmation = Swal.fire({
      title: '¿Estás seguro que quieres cambiar la contraseña?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9800',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-red-600 text-white rounded-md px-4 py-2 mr-2',
        cancelButton: 'bg-green-600 text-white rounded-md px-4 py-2 mr-2',
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    confirmation.then((result) => {
      if (result.isConfirmed) {
        dispatch(changeUserPassword(form, id))
          .then(() => {
            Swal.fire({
              title: 'Contraseña cambiada correctamente',
              icon: 'success',
              confirmButtonColor: '#ff9800',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'bg-orange-500 text-white rounded-md px-4 py-2',
              },
            }).then(() => {
              signOut(firebaseAuth);
              localStorage.removeItem("email");
              localStorage.removeItem("password");
              localStorage.removeItem("name");
              localStorage.removeItem("id");
              navigate("/login");
              window.location.reload();
            });
          })
          .catch((error) => {
            // Manejar el error en caso de que ocurra
            console.log(error);
          });
      }
    });
  }}
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-96 sm:max-w-sm sm:mx-auto">
        <h2 className="text-2xl font-bold mb-4">Cambiar contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password-input" className="block text-lg font-bold mb-1">
              Contraseña nueva:
            </label>
            <input
              id="password-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              className="px-2 py-1 border border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-500 mr-4"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-white bg-orange-500 px-4 py-2 rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modalpassword;