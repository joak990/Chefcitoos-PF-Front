import React, { useEffect } from 'react';
import { BadgeDelta, Flex, Metric, Text } from '@tremor/react';
import { Card } from '@tremor/react';
import { getsalesandpercentaje } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function CardGridMap() {
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
          <BadgeDelta deltaType={salesandpercentaje?.ventas?.porcentaje < 0 ? 'decrease' : 'increase'} isIncreasePositive={true} size="xs">
            {salesandpercentaje?.ventas?.porcentaje}%
          </BadgeDelta>
        </Flex>
        <Metric>${salesandpercentaje?.ventas?.total}</Metric>
      </Card>

      <Card className="max-w-sm">
        <Flex justifyContent="between" alignItems="center">
          <Text>Clientes nuevos</Text>
          <BadgeDelta deltaType={salesandpercentaje?.clientes.porcentaje < 0 ? 'decrease' : 'increase'} isIncreasePositive={true} size="xs">
            {salesandpercentaje?.clientes?.porcentaje}%
          </BadgeDelta>
        </Flex>
        <Metric>{salesandpercentaje?.clientes?.total}</Metric>
      </Card>
    </div>
  );
}

export default CardGridMap;
