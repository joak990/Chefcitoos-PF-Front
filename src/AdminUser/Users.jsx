import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUser, GetAllUsers, getProducts, putProductsbyid } from '../Redux/actions';
import NavAdmin from './NavAdmin';
import { Card } from '@tremor/react';
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllUsers());

    const interval = setInterval(() => {
      window.location.reload();
    }, 120000); // 2 minutos en milisegundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [dispatch]);

  const users = useSelector((state) => state.AllUsers);


  const handleDeleteUser = async (id, value) => {
    if (value) {
      const confirmation2 = await Swal.fire({
        title: '¿Estás seguro que quieres desbloquear a este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff9800',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Desbloquear',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-red-600 text-white rounded-md px-4 py-2 mr-2',
          cancelButton: 'bg-green-600 text-white rounded-md px-4 py-2 mr-2',
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (confirmation2.isConfirmed) {
        dispatch(DeleteUser(id));
        await Swal.fire({
          title: 'El usuario ha sido desbloqueado',
          icon: 'success',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
          },
        });
        window.location.reload();
      }
    } else {
      const confirmation = await Swal.fire({
        title: '¿Estás seguro que quieres eliminar este usuario?',
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
          cancelButton: 'bg-green-600 text-white rounded-md px-4 py-2 mr-2',
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
      if (confirmation.isConfirmed) {
        dispatch(DeleteUser(id));
        await Swal.fire({
          title: 'El usuario ha sido eliminado',
          icon: 'success',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
          },
        });
        window.location.reload();
      }

    }
  };


  //alert('¿Estás seguro que quieres eliminar este usuario?');
  return (
    <main className='bg-slate-200 min-h-screen overflow-y-auto'>
      <NavAdmin />
      <div className='w-full md:w-9/12 lg:w-9/12 px-4 mx-auto flex justify-center'>
            <Card className='p-4 bg-white mt-6 mb-6'>
              <h1 className='text-2xl font-bold'>Usuarios</h1>
              <div className='overflow-x-auto flex flex-col'>
                <table className='w-full mt-2'>
                  <thead>
                    <tr>
                      <th className='py-2 pr-8 text-left border-b border-gray-300 border-r'>
                        ID
                      </th>
                      <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r'>
                        Nombre
                      </th>
                      <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r'>
                        Email
                      </th>
                      <th className='py-2 pl-8 pr-8 text-center border-b border-gray-300 border-r'>
                        Cambiar Rol
                      </th>
                      <th className='py-2 pl-8 pr-8 text-center border-b border-gray-300'>
                        Eliminar
                      </th>
                      {/* <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300 border-gray-300'>
                        Banear Usuario
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user, index) => (
                      <tr key={index}>
                        {user.id === 111 ? (<td className={`py-2 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>
                          <div className='flex justify-center'><FontAwesomeIcon icon={faLock} /></div>
                        </td>) : <td className={`py-2 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>
                          {user.id}
                        </td>}

                        <td className={`py-2 pl-8 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>
                          {user.name}
                        </td>
                        {user.email === "freddyher@gmail.com" ? (<td className={`py-2 pl-8 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>
                          <div className='flex justify-center'><FontAwesomeIcon icon={faLock} /></div>

                        </td>) : <td className={`py-2 pl-8 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>
                          {user.email}
                        </td>}

                        <td className={`py-2 pl-4 pr-8 text-center ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>
                          {user.type === "user" ? (<button className='bg-yellow-200 rounded-2xl w-24'>User</button>) : <button className='bg-green-300 rounded-2xl w-24'>Admin</button>}

                        </td>
                        <td className={`py-2 pl-1 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} text-center`}>

                          {user.type === "admin" ? (
                            <div className='flex justify-center'><FontAwesomeIcon icon={faLock} /></div>) :
                            (
                              user.isDeleted === true ? (<button onClick={() => handleDeleteUser(user.id, true)} className='bg-green-200 rounded-2xl w-48'>
                                Desbloquear Usuario
                              </button>
                              ) :
                                <button onClick={() => handleDeleteUser(user.id, false)} className='bg-red-200 rounded-2xl w-48'>
                                  Eliminar Usuario
                                </button>
                            )
                          }
                        </td>
                        {/* <td className={`py-2 pl-8 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>
                      <button onClick={() => handleDeleteUser(user.id)} className='bg-red-400  text-white rounded-2xl w-48'>
                            banear usuario
                          </button>
                        </td> */}
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

export default Users;
