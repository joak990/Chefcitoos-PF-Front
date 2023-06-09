import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, putProductsbyid } from '../Redux/actions';
import NavAdmin from './NavAdmin';
import { Card } from '@tremor/react';
import Swal from 'sweetalert2'

function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.Products);
  const prueba = async (id) => {
    const confirmation = await Swal.fire({
      title: '¿Estás seguro que quieres modificar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9800',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, modificar',
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
      dispatch(putProductsbyid(id));
      await Swal.fire({
        title: 'El producto ha sido modificado',
        icon: 'success',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
        },
      });
      window.location.reload();
    }
  };
  
  return (
    <main className='bg-slate-200 min-h-screen overflow-y-auto'>
    <NavAdmin />
    <div className='w-9/12 flex flex-col lg:flex-row lg:justify-center'>
      <div className='h-screen bg-slate-200 flex-grow'></div>
      <div className='lg:w-3/4'>
        <div className='mt-5'>
          <Card className='p-4 bg-white'>
            <h1 className='text-2xl font-bold'>Productos</h1>
            <div className='overflow-x-auto'>
              <table className='w-full mt-2'>
                <thead>
                  <tr>
                    <th className='py-2 pr-8 text-left border-b border-gray-300 border-r border-gray-300'>ID</th>
                    <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r border-gray-300'>Nombre</th>
                    <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r border-gray-300'>Descripción</th>
                    <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r border-gray-300'>Precio</th>
                    <th className='py-2 pl-8 pr-8 text-left border-b border-gray-300'>Estado</th>
                    <th  className='py-2 pl-8 pr-8 text-left border-b border-gray-300'>Modificar</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, index) => (
                    <tr key={product.id}>
                      <td  className={`py-2 pr-8 ${index !== products.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>{product.id}</td>
                      <td className={`py-2 pl-8 pr-8 ${index !== products.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>{product.name}</td>
                      <td className={`py-2 pl-8 pr-8 ${index !== products.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>{product.elements}</td>
                      <td className={`py-2 pl-8 pr-8 ${index !== products.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}>{product.price}</td>
                      <td className={`py-2 pl-8 pr-8 ${index !== products.length - 1 ? 'border-b border-gray-300' : ''}`}>
                         { product.isDeleted ? (<span  product_id={product.id}   role='img' aria-label='Delete' className='delete-icon'>
                            ❌
                          </span>):<span  product_id={product.id}   role='img' aria-label='Delete' className='text-green-500'>
                          ✔
                          </span>

                         }
                          
                      </td>
                      { product.isDeleted ? 
                      (<td product_id={product.id} className={`py-2 pl-8 pr-8  ${index !== products.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}> <button onClick={()=> prueba(product.id)} className='bg-red-200 rounded-xl' >Cambiar Estado</button></td>)
                      : <td product_id={product.id} className={`py-2 pl-8 pr-8  ${index !== products.length - 1 ? 'border-b border-gray-300' : ''} border-r border-gray-300`}> <button onClick={()=> prueba(product.id)} className='bg-green-200 rounded-xl' >Cambiar Estado</button></td> }
                      
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

export default Products;
