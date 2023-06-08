import React, { useState } from 'react';
import { Card, TabList, Tab, DonutChart } from '@tremor/react';
import NavAdmin from '../components/NavAdmin';
import CardGridMap from '../components/CardGridMap';
import Chardonut from '../components/Chardonut';

function Dashboard() {
  const [selectedView, setSelectedView] = useState(1);

  return (
    <main className='bg-slate-200 h-screen'>
      <NavAdmin />
      <TabList defaultValue={selectedView} handleSelect={value => setSelectedView(value)}>
        <Tab value={1} text='Principal' />
      </TabList>
      {selectedView === 1 && (
        <div className='w-9/12 flex flex-col lg:flex-row lg:justify-center'>
          <div className='h-96 bg-slate-200 flex-grow'></div>
          <div className='lg:w-3/4'>
            <CardGridMap />
            <Card className='mt-5 bg-transparent'>
              <div className='h-96 flex justify-center items-center'>
                <Chardonut />
              </div>
            </Card>
          </div>
        </div>
      )}
      {selectedView === 2 && <></>}
    </main>
  );
}

export default Dashboard;
