import React, { useEffect } from 'react';
import { BadgeDelta, Flex, Metric, Text } from '@tremor/react';
import { Card } from '@tremor/react';
import { useSelector, useDispatch } from 'react-redux';
import { getsalesandpercentaje } from '../Redux/actions';

function CardGridMap() {
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(getsalesandpercentaje());
  }, []);
  const salesandpercentaje = useSelector((state) => state.salesandpercentaje);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getsalesandpercentaje())
      .then(response => {
   
        dispatch({ type: 'SET_SALES_AND_PERCENTAJE', payload: response });
      })
      .catch(error => {
      
      });
  }, [dispatch]);

  useEffect(() => {
    const savedState = localStorage.getItem('salesandpercentaje');
    if (savedState) {
      dispatch({ type: 'SET_SALES_AND_PERCENTAJE', payload: JSON.parse(savedState) });
    }
  }, [dispatch]);

  useEffect(() => {
    const saveStateToLocalStorage = () => {
      localStorage.setItem('salesandpercentaje', JSON.stringify(salesandpercentaje));
    };

    window.addEventListener('beforeunload', saveStateToLocalStorage);
    return () => {
      window.removeEventListener('beforeunload', saveStateToLocalStorage);
    };
  }, [salesandpercentaje]);

  return (
    <div className='flex flex-wrap justify-center gap-4 mx-auto'>

      <Card className="max-w-sm">
        <Flex justifyContent="between" alignItems="center">
          <Text>Ventas</Text>
          <BadgeDelta deltaType={salesandpercentaje?.ventas?.porcentaje < 0 ? 'decrease' : 'increase'} isIncreasePositive={true} size="xs">
      <Card className="max-w-sm">
        <Flex justifyContent="between" alignItems="center">
          <Text>Ventas</Text>
          <BadgeDelta
            deltaType={salesandpercentaje?.ventas?.porcentaje < 0 ? 'decrease' : 'increase'}
            isIncreasePositive={true}
            size="xs"
          >
            {salesandpercentaje?.ventas?.porcentaje}%
          </BadgeDelta>
        </Flex>
        <Metric>${salesandpercentaje?.ventas?.total}</Metric>
      </Card>

      <Card className="max-w-sm">
        <Flex justifyContent="between" alignItems="center">
          <Text>Clientes nuevos</Text>
          <BadgeDelta deltaType={salesandpercentaje?.clientes.porcentaje < 0 ? 'decrease' : 'increase'} isIncreasePositive={true} size="xs">
    
      <Card className="max-w-sm">
        <Flex justifyContent="between" alignItems="center">
          <Text>Clientes nuevos</Text>
          <BadgeDelta
            deltaType={salesandpercentaje?.clientes?.porcentaje < 0 ? 'decrease' : 'increase'}
            isIncreasePositive={true}
            size="xs"
          >
            {salesandpercentaje?.clientes?.porcentaje}%
          </BadgeDelta>
        </Flex>
        <Metric>{salesandpercentaje?.clientes?.total}</Metric>
      </Card>
    </div>
  );
}

export default CardGridMap;
