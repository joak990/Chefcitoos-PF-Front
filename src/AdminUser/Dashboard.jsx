import React, { useEffect, useState } from 'react';
import { Card, TabList, Tab, DonutChart } from '@tremor/react';
import NavAdmin from './NavAdmin';
import CardGridMap from './CardGridMap';
import Chardonut from './Chardonut';
import { getDonutProducts, getRecentOrders, getsalesandpercentaje } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import merca from "./merca.png"
function Dashboard() {
  const dispatch = useDispatch()
  const [selectedView, setSelectedView] = useState(1);
  const donutProductos = useSelector((state) => state.donutProducts)
  console.log('::donutProductos::', donutProductos);

  useEffect(() => {
    dispatch(getRecentOrders());
    dispatch(getDonutProducts())
  }, [dispatch]);



  const orders = useSelector((state) => state.recentorders);


  return (
    <main className='bg-slate-200 min-h-screen overflow-y-auto'>
      <NavAdmin />
      <TabList defaultValue={selectedView} handleSelect={value => setSelectedView(value)}>
        <Tab value={1} text='' />
      </TabList>
      {selectedView === 1 && (
        <div className='w-full md:lg:w-9/12 lg:w-9/12 mx-auto flex flex-row lg:justify-center md:justify-center'>
          <div className='w-full lg:w-3/4'>
            <CardGridMap />
            <Card className='mt-5 bg-transparent'>
              <div className='h-96 flex justify-center items-center'>
                <Chardonut donutProductos={donutProductos} />
              </div>
            </Card>
            <div className='mt-5'>
              <Card className='p-4 bg-white mb-6 mx-1'>
                <h1 className='text-2xl font-bold'>Órdenes Recientes</h1>
                <div className='overflow-x-auto '>
                  <table className='w-full mt-2'>
                    <thead>
                      <tr>
                        <th className='py-2 text-left'>Estado</th>
                        <th className='py-2 px-24 text-left'>Fecha</th>
                        <th className='py-2 text-left'>Nombre</th>
                        <th className='py-2 text-left'>Método de Pago</th>
                        <th className='py-2 text-left'>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map(order => (
                        <tr key={order.id}>
                          {
                            order.state === "Pendiente" ? (
                              <td className='py-2 px-4 text-yellow-600'>{order.state} ⚠️</td>
                            ) : (
                              order.state === "Pagada" ? (
                                <td className='py-2 px-4 text-green-600'>{order.state} ✔</td>
                              ) :
                                (
                                  <td className='py-2 px-4 text-red-600'>{order.state} ❌</td>
                                )
                            )
                          }
                          <td className='py-2 px-10'>{order.date}</td>
                          <td className='py-2'>{order.User.name}</td>
                          <td className='py-2'><img className='w-4 ml-10' src={merca} alt="" /> Mercado Pago</td>
                          <td className='py-2 font-bold'>${order.total_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
