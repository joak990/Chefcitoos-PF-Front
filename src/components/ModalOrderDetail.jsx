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
        <h6 className="text-gray-900 text-md mt-6 font-bold self-start">
          Orden ID: <span className="text-red-500">{orderDetail.id}</span>
        </h6>
        <div className="h-[230px] overflow-y-scroll mt-2">
          {orderDetail.Creations?.map((creation, index) => (
            <div className="flex flex-col mt-1 mb-1 gap-10 items-center justify-end py-[9px] w-full border-b border-gray-300 pb-1">
              <div className="flex px-2 flex-row items-end justify-between w-full">
                <div className="bg-gray_51 flex flex-row items-center justify-between rounded-[16.5px] w-[50%]">
                  <div className="flex flex-row">
                    <h5 className="font-semibold text-sm uppercase mr-3">
                      {creation.Creations_orders.quantity}
                    </h5>
                    <span className="mr-3">x</span>
                    <h5 className="font-semibold text-sm uppercase">
                      {creation.name}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {orderDetail.products?.map((product, index) => (
            <div className="flex flex-col mt-1 mb-1 gap-10 items-center justify-end py-[9px] w-full border-b border-gray-300 pb-1">
              <div className="flex px-2 flex-row items-end justify-between w-full">
                <div className="bg-gray_51 flex flex-row items-center justify-between rounded-[16.5px] w-[50%]">
                  <div className="flex flex-row">
                    <h5 className="font-semibold text-sm uppercase mr-3">
                      {product.Order_products.quantity}
                    </h5>
                    <span className="mr-3">x</span>
                    <h5 className="font-semibold text-sm uppercase">
                      {product.name}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}          
        </div>
        
            <div className="flex flex-row items-center justify-end w-full">
              <h5 className=" mr-10 font-semibold text-black_900" variant="body1">
                Total:
              </h5>
              <h5 className="font-bold text-lg text-gray_900" variant="body1">
                ${orderDetail.total_price}
              </h5>
            </div>
          
        
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-orange-600 w-20 h-10  text-white rounded-xl font-bold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalOrderDetail;