import React, { useEffect, useState } from 'react';
import { Card, TabList, Tab, DonutChart } from '@tremor/react';
import NavAdmin from './NavAdmin';
import CardGridMap from './CardGridMap';
import Chardonut from './Chardonut';
import { getRecentOrders } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import merca from "./merca.png"
function Dashboard() {
  const [selectedView, setSelectedView] = useState(1);

const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRecentOrders());
  }, [dispatch]);
  

  
  const orders = useSelector((state) => state.recentorders);
 

  return (
    <main className='bg-slate-200 min-h-screen overflow-y-auto'>
      <NavAdmin />
      <TabList defaultValue={selectedView} handleSelect={value => setSelectedView(value)}>
        <Tab value={1} text='Principal' />
      </TabList>
      {selectedView === 1 && (
        <div className='w-full lg:w-9/12 flex flex-col lg:flex-row lg:justify-center'>
          <div className='h-screen bg-slate-200 flex-grow'></div>
          <div className='lg:w-3/4'>
            <CardGridMap />
            <Card className='mt-5 bg-transparent'>
              <div className='h-96 flex justify-center items-center'>
                <Chardonut />
              </div>
            </Card>
            <div className='mt-5'>
              <Card className='p-4 bg-white'>
                <h1 className='text-2xl font-bold'>Órdenes Recientes</h1>
                <div className='overflow-x-auto'>
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
                          <td className='py-2 px-4 text-green-600'> ✔</td>
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
