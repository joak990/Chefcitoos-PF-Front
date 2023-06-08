import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUser, GetAllUsers, getProducts, putProductsbyid } from '../Redux/actions';
import NavAdmin from './NavAdmin';
import { Card } from '@tremor/react';

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

  const handleDeleteUser = (id) => {
    
    alert('¿estas seguro que quieres eliminar este usuario?');
    dispatch(DeleteUser(id))
    window.location.reload();
  };

  return (
    <main className='bg-slate-200 min-h-screen overflow-y-auto'>
      <NavAdmin />
      <div className='w-9/12 flex flex-col lg:flex-row lg:justify-center'>
        <div className='h-screen bg-slate-200 flex-grow'></div>
        <div className='lg:w-3/4'>
          <div className='mt-5'>
            <Card className='p-4 bg-white'>
              <h1 className='text-2xl font-bold'>Usuarios</h1>
              <div className='overflow-x-auto'>
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
                      <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300 border-gray-300'>
                        Eliminar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((users, index) => (
                      <tr key={index}>
                        <td className={`py-2 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>{users.id}</td>
                        <td className={`py-2 pl-8 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>{users.name}</td>
                        <td className={`py-2 pl-8 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>{users.email}</td>
                        <td className={`py-2 pl-8 pr-8 ${index !== users.length - 1 ? 'border-b border-gray-300' : ''} text-center`}>
                          <button onClick={() => handleDeleteUser(users.id)} className='bg-red-200 rounded-2xl w-48'>
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
