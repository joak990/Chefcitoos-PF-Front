import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../Firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { DeleteUser, getdetailorder, getordersbyid } from '../Redux/actions';
import ModalOrderDetail from '../components/ModalOrderDetail';

function MisPedidos() {
  const firebaseAuth = getAuth(app);
  const user = firebaseAuth.currentUser;
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = localStorage.getItem('id');
  const myorders = useSelector(state => state.ordersbyid);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(getordersbyid(id));
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro que quieres desactivar tu cuenta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9800',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-red-600 text-white rounded-md px-4 py-2 mr-2',
        cancelButton: 'bg-green-600 text-white rounded-md px-4 py-2 mr-2',
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(DeleteUser(id));
        signOut(firebaseAuth);
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        navigate('/login');
        window.location.reload();
      }
    });
  };

  const handleDetailOrder = id => {
    dispatch(getdetailorder(id));
    setSelectedOrderId(id);
  };

  const getStatusIcon = status => {
    if (status === 'Pagada') {
      return (
        <span className="text-green-500" role="img" aria-label="Pagada">
          ✔️
        </span>
      );
    } else if (status === 'Cancelada') {
      return (
        <span className="text-red-500" role="img" aria-label="Cancelada">
          ❌
        </span>
      );
    } else {
      return (
        <span className="text-yellow-500" role="img" aria-label="Pendiente">
          ⏳
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-gray-200 rounded-lg p-4 mt-4 mx-4">
        {user ? (
          <img src={user.photoURL} alt="" className="rounded-full w-24 h-24 mb-2 mx-auto" />
        ) : (
          <FontAwesomeIcon size="3x" icon={faUser} />
        )}
        <h1 className="text-xl font-bold text-center">{name}</h1>
        <div className="flex justify-center mt-2">
          <p className="bg-white rounded-3xl w-56 text-center">{email}</p>
        </div>
        <div className="flex mt-4 justify-center">
        
        </div>
        <div className="flex mt-4 justify-center">
          <button
            onClick={handleDelete}
            className="px-4 py-1 bg-red-500 rounded-md text-white hover:bg-red-600"
          >
            Desactivar cuenta
          </button>
        </div>
        <div className="flex mt-4 justify-center">
          <Link to="/myProfile">
            <button className="px-10 py-1 bg-orange-500 rounded-md text-white hover:bg-orange-700">
              Ver perfil
            </button>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Mis Órdenes</h2>
          <div className="flex justify-between bg-gray-100 p-2 mb-4">
            <div className="w-1/6 text-center">Estado</div>
            <div className="w-1/6 text-center">Id Producto</div>
            <div className="w-1/3 text-center">Fecha</div>
            <div className="w-1/6 text-center">Total</div>
            <div className="w-1/6 text-center">Detalles</div>
          </div>
          {myorders?.map(order => (
            <div key={order.id} className="flex justify-between p-2">
              <div className="w-1/6 text-center">
                {getStatusIcon(order.state)}
              </div>
              <div className="w-1/6 text-center">{order.id}</div>
              <div className="w-1/3 text-center">{order.date}</div>
              <div className="w-1/6 text-center font-bold">$ {order.total_price}</div>
              <div className="w-1/6 text-center">
                <button
                   onClick={() => {
                    handleDetailOrder(order.id);
                    openModal();
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ModalOrderDetail orderId={selectedOrderId} onClose={closeModal} />
      )}
    </div>
  );
}

export default MisPedidos;