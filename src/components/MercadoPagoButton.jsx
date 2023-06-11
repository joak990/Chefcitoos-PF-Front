import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import { useEffect, useState } from 'react';

const MercadoPagoButton = (props) => {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    initMercadoPago('TEST-c1ac68a0-d8dc-4dee-9372-dc5e3861f727');
    handleButton();
  }, []);



  const handleButton = async () => {
    try {
      const orderData = {
        quantity: 1,
        description: 'Orden Nro. ' + props.order.id,
        price: props.order.total_price,
        order_id: props.order.id
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/mercadoPago/create_preference`, orderData);
      setPreferenceId(response.data.id);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  )
}

export default MercadoPagoButton;
