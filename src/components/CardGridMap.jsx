import React from 'react';
import { BadgeDelta, Flex, Metric, Text } from '@tremor/react';
import { Card } from '@tremor/react';

function CardGridMap() {
  const data = [
    {
      title: 'Ventas',
      metric: '$12,100',
      progress: 15.9,
      deltatype: 'increase',
    },
    {
      title: 'Ganancia',
      metric: '$12,400',
      progress: 15.9,
      deltatype: 'increase',
    },
    {
      title: 'Clientes',
      metric: '$12,200',
      progress: 15.9,
      deltatype: 'increase',
    },
  ];

  return (
    <div className='flex flex-wrap justify-center gap-4 mx-auto'>
      {data.map((item) => (
        <Card key={item.title} className='w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4'>
          <div>
            <h4 className='font-semibold'>{item.title}</h4>
            <div className='flex justify-end items-center'>
              <Metric>{item.metric}</Metric>
              <BadgeDelta className='ml-2'>{item.progress}</BadgeDelta>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default CardGridMap;
