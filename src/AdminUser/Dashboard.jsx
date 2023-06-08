import React, { useState } from 'react';
import { Card, TabList, Tab, DonutChart } from '@tremor/react';
import NavAdmin from './NavAdmin';
import CardGridMap from './CardGridMap';
import Chardonut from './Chardonut';

function Dashboard() {
  const [selectedView, setSelectedView] = useState(1);

  // Datos de ejemplo para las órdenes
  const orders = [
    {
      id: 1,
      date: '2023-06-07',
      name: 'John Doe',
      paymentMethod: 'Credit Card',
      total: 150.0,
    },
    {
      id: 2,
      date: '2023-06-06',
      name: 'Jane Smith',
      paymentMethod: 'PayPal',
      total: 200.0,
    },
    {
      id: 3,
      date: '2023-06-05',
      name: 'Robert Johnson',
      paymentMethod: 'Cash',
      total: 80.0,
    },
  ];

  return (
    <main className='bg-slate-200 min-h-screen overflow-y-auto'>
      <NavAdmin />
      <TabList defaultValue={selectedView} handleSelect={value => setSelectedView(value)}>
        <Tab value={1} text='Principal' />
      </TabList>
      {selectedView === 1 && (
        <div className='w-9/12 flex flex-col lg:flex-row lg:justify-center'>
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
                        <th className='py-2 text-left'>ID</th>
                        <th className='py-2 text-left'>Fecha</th>
                        <th className='py-2 text-left'>Nombre</th>
                        <th className='py-2 text-left'>Método de Pago</th>
                        <th className='py-2 text-left'>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td className='py-2'>{order.id}</td>
                          <td className='py-2'>{order.date}</td>
                          <td className='py-2'>{order.name}</td>
                          <td className='py-2'>{order.paymentMethod}</td>
                          <td className='py-2'>{order.total}</td>
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
