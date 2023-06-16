import React from 'react';
import { useSelector } from 'react-redux';
import imgChefcitos from "../img/LogoChefcitoos.png";

function ModalOrderDetail({ onClose }) {
  const orderDetail = useSelector(state => state.orderDetail);

  const getStatusColor = (status) => {
    if (status === 'Pagada') {
      return 'text-green-500';
    } else if (status === 'Cancelada') {
      return 'text-red-500';
    } else {
      return 'text-yellow-500';
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
      <div className="bg-white p-8 rounded-lg" style={{ width: '400px' }}>
        <div className="flex justify-center items-center mb-4">
          <img src={imgChefcitos} alt="Chef Sitos Logo" className="w-42 h-24" />
        </div>
        <div className="text-center mb-4">
          <h3 className={`text-md font-semibold mb-2 ${getStatusColor(orderDetail?.state)}`}>Estado: {orderDetail?.state}</h3>
          {/* Aquí puedes mostrar otros detalles de la orden */}
        </div>
        <h1 className="text-lg flex items-center justify-center text-xl font-bold mb-2">Detalle de la orden</h1>
        
     
        <div>
          {orderDetail?.products?.map((product) => (
            <div key={product.id} className="mb-2">
              <div className="font-bold flex items-center justify-center mt-7" style={{ borderBottom: '1px solid black' }}>
                {product?.Order_products?.quantity} x {product?.name}
              </div>
            </div>
          ))}
        </div>
        {orderDetail?.Creations?.map((creation) => (
          <div key={creation.id} className="mb-2">
            <div className="font-bold flex items-center justify-center mt-7" style={{ borderBottom: '1px solid black' }}>
              {creation?.Creations_orders?.quantity} x {creation?.name}
            </div>
          </div>
        ))}
       
        <div>
          {orderDetail && (
            <div>
              <div className="font-bold flex items-center justify-end mt-20">Total: {orderDetail?.total_price}</div>
              {/* Aquí puedes mostrar otros detalles de la orden */}
            </div>
          )}
        </div>
        
        <div className="flex justify-start mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-300 rounded-md text-gray-800 hover:bg-orange-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalOrderDetail;