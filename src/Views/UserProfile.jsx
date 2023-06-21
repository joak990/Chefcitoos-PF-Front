import React, { useEffect, useState } from 'react'
import { getAuth,signOut } from "firebase/auth";
import { app } from "../Firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUser, changedateUser, getuserbyid } from '../Redux/actions';
import Modalpassword from '../components/Modalpassword';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function UserProfile() {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const navigate = useNavigate()
    const id = localStorage.getItem("id");
    const firebaseAuth = getAuth(app);
    const user = firebaseAuth.currentUser;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const users = useSelector(state => state.userbyid);
  
    useEffect(() => {
      dispatch(getuserbyid(id))
          
             
       }, []);
    const [form, setForm] = useState({
        name:  name,
        address:users?.address,
          tel:users?.tel,
      });
      const [errors, setErrors] = useState({});
const dispatch = useDispatch()
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };

      
     const handleSubmit = (event) => {
        event.preventDefault();
     
        const newErrors = {};
    
        // Validar campo de nombre
        if (!form.name.trim()) {
          newErrors.name = "El nombre es requerido";
        } else if (form.name.length > 15) {
          newErrors.name = "El nombre debe tener como máximo 20 caracteres";
        }

        // Validar campo de contraseña
        if (!form.tel.trim()) {
          newErrors.tel = "El telefono es requerido";
        } else if (form.tel.length < 8) {
          newErrors.tel = " debe tener al menos 8 caracteres";
        } else if (form.tel.length > 20) {
          newErrors.tel = "debe tener como máximo 20 caracteres";
        }

        if (!form.address.trim()) {
            newErrors.address = " *Debes completar este Campo";
            
          }
    
        setErrors(newErrors);
    
        // Si no hay errores, enviar el formulario
        if (Object.keys(newErrors).length === 0) {
         
          }
          localStorage.setItem("address", form.address);
          localStorage.setItem("tel", form.tel);
          localStorage.setItem("name", form.name);
          dispatch(changedateUser(form,id))
        }

        

        const openModal = () => {
            setIsModalOpen(true);
          };
          
          const closeModal = () => {
            setIsModalOpen(false);
          };
          const handleDelete = () => {
            Swal.fire({
              title: '¿Estás seguro que quieres desactivar tu cuenta?',
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
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(DeleteUser(id));
                signOut(firebaseAuth);
                localStorage.removeItem('email');
                localStorage.removeItem('password');
                localStorage.removeItem('name');
                localStorage.removeItem('id');
                navigate('/login');
                window.location.reload()
              }
            });
          };
    
          return (
            <div className="flex items-center justify-center mt-8">
              {isModalOpen && <Modalpassword onClose={closeModal} />}
              <div className="bg-gray-200 rounded-lg p-8 mr-4 w-96">
                <div className="flex flex-col items-center mb-4">
                  {user ? (
                    <img src={user.photoURL} alt="" className="rounded-full w-32 h-32 mb-2" />
                  ) : (
                    <FontAwesomeIcon size="3x" icon={faUser} />
                  )}
                  <h1 className="text-2xl font-bold">{name}</h1>
                  <div className='flex justify-center mt-2'>
                    <p className='bg-white rounded-3xl w-44 text-center'>{email}</p>
                  </div>
                  <div className="flex mt-4 space-x-2">
                    <Link to="/myorders" >
                    <button className="px-2 py-1 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400">
                      Mis pedidos
                    </button>
                    </Link>
                  </div>
                  <div className="flex mt-4 space-x-2">
                    <button onClick={openModal} className="px-2 py-1 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400">
                      Cambiar contraseña
                    </button>
                  </div>
                  <div className="flex mt-4 space-x-2">
                    <button onClick={handleDelete} className="px-2 py-1 bg-red-500 rounded-md text-white hover:bg-red-600">
                      Desactivar cuenta
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg p-8 w-96">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center">
                    <div className="mb-4">
                      <label htmlFor="name-input" className="block text-lg font-bold mb-1">
                        Nombre:
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        id="name-input"
                        type="text"
                        className="px-2 py-1 border border-gray-300 rounded-md"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone-input" className="block text-lg font-bold mb-1">
                        Teléfono:
                      </label>
                      <input
                        name="tel"
                        value={form.tel}
                        onChange={handleInputChange}
                        id="phone-input"
                        type="text"
                        className="px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    {errors.tel && (
                      <p className="text-red-500 text-sm mt-1">{errors.tel}</p>
                    )}
                    <div className="mb-4">
                      <label htmlFor="address-input" className="block text-lg font-bold mb-1">
                        Dirección:
                      </label>
                      <input
                        name="address"
                        value={form.address}
                        onChange={handleInputChange}
                        id="address-input"
                        type="text"
                        className="px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                    <button
                      type="submit"
                      className="flex mt-4 items-center text-center justify-center w-full md:w-56 text-white bg-orange-500 rounded-2xl"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        }
        
        export default UserProfile;