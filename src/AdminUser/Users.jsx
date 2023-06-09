import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUser, GetAllUsers, getProducts, putProductsbyid } from '../Redux/actions';
import NavAdmin from './NavAdmin';
import { Card } from '@tremor/react';
import Swal from 'sweetalert2'

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

  
    const handleDeleteUser = async (id) => {
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
    };
    
 //alert('¿Estás seguro que quieres eliminar este usuario?');
  return (
    <main className='bg-slate-200 min-h-screen overflow-y-auto'>
      <NavAdmin />
      <div className='w-9/12 flex flex-col lg:flex-row lg:justify-center'>
        <div className='h-screen bg-slate-200 flex-grow'></div>
        <div className='lg:w-3/4'>
          <div className='mt-5'>
            <Card className='p-4 bg-white'>
              <h1 className='text-2xl font-bold'>Usuarios</h1>
              <div className='overflow-x-hidden'>
                <table className='w-full mt-2'>
                  <thead>
                    <tr>
                      <th className='py-2 pr-8 text-left border-b border-gray-300 border-r border-gray-300'>
                        ID
                      </th>
                      <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r border-gray-300'>
                        Nombre
                      </th>
                      <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r border-gray-300'>
                        Email
                      </th>
                      <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r border-gray-300'>
                        Cambiar Rol
                      </th>
                      <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300 border-gray-300'>
                        Eliminar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user, index) => (
                      <tr key={index}>
                        <td className={`py-2 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>
                          {user.id}
                        </td>
                        <td className={`py-2 pl-8 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>
                          {user.name}
                        </td>
                        <td className={`py-2 pl-8 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>
                          {user.email}
                        </td>
                        <td className={`py-2 pl-4 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>
                         {user.type === "user" ? (<button className='bg-yellow-200 rounded-2xl w-48'>User</button>): <button className='bg-green-400 rounded-2xl w-48'>Admin</button>} 
                          
                        </td>
                        <td className={`py-2 pl-1 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} text-center`}>
                          <button onClick={() => handleDeleteUser(user.id)} className='bg-red-200 rounded-2xl w-48'>
                            Eliminar Usuario
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

export default Users;
