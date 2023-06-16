import React, { useEffect } from 'react';
import { BadgeDelta, Flex, Metric, Text } from '@tremor/react';
import { Card } from '@tremor/react';
import { getsalesandpercentaje } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

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
     
      progress: 15.9,
      deltatype: 'increase',
    },
  ];
const dispatch = useDispatch()
  useEffect(() => {
  
    dispatch(getsalesandpercentaje());
  }, []);
  const salesandpercentaje = useSelector((state) => state.salesandpercentaje);

  return (
    <div className='flex flex-wrap justify-center gap-4 mx-auto'>
     
     <Card className="max-w-sm">
    <Flex justifyContent="between" alignItems="center">
      <Text>Ventas</Text>
      <BadgeDelta  deltaType={salesandpercentaje.porcentaje < 0 ? 'decrease' : 'increase'} isIncreasePositive={true} size="xs">
        {salesandpercentaje.porcentaje}%
      </BadgeDelta>
    </Flex>
    <Metric>${salesandpercentaje.ventas}</Metric>
  </Card>
    
  <Card className="max-w-sm">
    <Flex justifyContent="between" alignItems="center">
      <Text>Clientes</Text>
      <BadgeDelta  deltaType={salesandpercentaje.porcentaje < 0 ? 'decrease' : 'increase'} isIncreasePositive={true} size="xs">
        {salesandpercentaje.porcentaje}%
      </BadgeDelta>
    </Flex>
    <Metric>${salesandpercentaje.ventas}</Metric>
  </Card>
    </div>
  );
}

export default CardGridMap;
