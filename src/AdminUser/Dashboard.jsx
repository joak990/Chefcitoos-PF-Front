import React, { useEffect, useState } from "react";
import { Card, TabList, Tab, DonutChart } from "@tremor/react";
import NavAdmin from "./NavAdmin";
import CardGridMap from "./CardGridMap";
import Chardonut from "./Chardonut";
import {
  getDonutProducts,
  getRecentOrders,
  getsalesandpercentaje,
} from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import merca from "./merca.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPencil,
  faTriangleExclamation,
  faTruckFast,
  faWorm,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
function Dashboard() {
  const dispatch = useDispatch();
  const [selectedView, setSelectedView] = useState(1);
  const donutProductos = useSelector((state) => state.donutProducts);
  console.log("::donutProductos::", donutProductos);

  useEffect(() => {
    dispatch(getRecentOrders());
    dispatch(getDonutProducts());
  }, [dispatch]);

  const orders = useSelector((state) => state.recentorders);

  const handleChangeStateOrder = (orderId, state) => {
    Swal.fire({
      title: "¿Está seguro que desea cambiar el estado de la orden?",
      icon: "danger",
      showCancelButton: true,
      confirmButtonColor: "#9CA3AF",
      cancelButtonColor: "#EA580C",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .put(`${process.env.REACT_APP_API_URL}orders/${orderId}`, {state})
        .then((response) => {
          dispatch(getRecentOrders());
          Swal.fire({
            title: "Orden modificada satisfactoriamente",
            icon: "success",
            buttonsStyling: false,
            customClass: {
              confirmButton: "bg-orange-600 text-white rounded-md px-4 py-2",
            },
          });
        })
        .catch((error) => { 
          console.log(error);
        });
      }
    });

  };

  return (
    <main className="bg-slate-200 min-h-screen overflow-y-auto">
      <NavAdmin />
      <TabList
        defaultValue={selectedView}
        handleSelect={(value) => setSelectedView(value)}
      >
        <Tab value={1} text="" />
      </TabList>
      {selectedView === 1 && (
        <div className="w-full md:lg:w-10/12 lg:w-10/12 mx-auto flex flex-row lg:justify-center md:justify-center">
          <div className="w-full lg:w-3/4">
            <CardGridMap />
            <Card className="mt-5 bg-transparent">
              <div className="h-96 flex justify-center items-center">
                <Chardonut donutProductos={donutProductos} />
              </div>
            </Card>
            <div className="mt-5">
              <Card className="p-4 bg-white mb-6 mx-1">
                <h1 className="text-2xl font-bold">Órdenes Recientes</h1>
                <div className="overflow-x-auto ">
                  <table className="w-full mt-2">
                    <thead>
                      <tr>
                        <th className="py-2 text-center">ID</th>
                        <th className="py-2 text-center">Estado</th>
                        <th className="py-2 text-center">Fecha</th>
                        <th className="py-2 text-center">Nombre</th>
                        <th className="py-2 text-center">Método de Pago</th>
                        <th className="py-2 text-center">Total</th>
                        <th className="py-2 text-center">Cambiar Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order) => (
                        <tr key={order.id}>
                          <td className="py-2 px-2 text-center">{order.id}</td>
                          {order.state === "Pendiente" ? (
                            <td className="py-2 px-2 text-yellow-600 text-center">
                              ⚠️ {order.state}
                            </td>
                          ) : order.state === "Pagada" ? (
                            <td className="py-2 px-2 text-green-600 text-center">
                              ✔ {order.state} 
                            </td>
                          ) : order.state === "Cancelada" ? (
                            <td className="py-2 px-2 text-red-600 text-center">
                             ❌ {order.state} 
                            </td>
                          ) :  (
                            <td className="py-2 px-2 text-blue-600 text-center w-40">
                              <FontAwesomeIcon
                                  className=" text-blue-600"
                                  icon={faTruckFast}
                                /> {order.state} 
                            </td>
                          ) }
                          <td className="py-2 px-2 text-center">
                            {order.date.slice(0, 10)}
                          </td>
                          <td className="py-2 px-2 text-center">
                            {order.User.name}
                          </td>
                          <td className="py-2 px-2 text-center">
                            <img className="w-4 ml-10" src={merca} alt="" />{" "}
                            Mercado Pago
                          </td>
                          <td className="py-2 px-2 text-center font-bold">
                            ${order.total_price}
                          </td>
                          <td className="py-2 px-2 text-center flex flex-row">
                            <div className="group relative">
                              <button
                                onClick={() =>
                                  handleChangeStateOrder(order.id, "Cancelada")
                                }
                                className="bg-red-400 rounded-xl ml-2"
                              >
                                <FontAwesomeIcon
                                  className="p-1 text-white"
                                  icon={faXmark}
                                />
                              </button>
                              <span className="invisible opacity-0 bg-gray-100 text-gray-800 rounded-md py-1 px-2 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:visible group-hover:opacity-100 text-sm">
                                Cancelada
                              </span>
                            </div>
                            <div className="group relative">
                              <button
                                onClick={() =>
                                  handleChangeStateOrder(order.id, "Pendiente")
                                }
                                className="bg-orange-400 rounded-xl ml-2"
                              >
                                <FontAwesomeIcon
                                  className="p-1 text-white"
                                  icon={faTriangleExclamation}
                                />
                              </button>
                              <span className="invisible opacity-0 bg-gray-100 text-gray-800 rounded-md py-1 px-2 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:visible group-hover:opacity-100 text-sm">
                                Pendiente
                              </span>
                            </div>
                            <div className="group relative">
                              <button
                                onClick={() =>
                                  handleChangeStateOrder(order.id, "Pagada")
                                }
                                className="bg-green-400 rounded-xl ml-2"
                              >
                                <FontAwesomeIcon
                                  className="p-1 text-white"
                                  icon={faCheck}
                                />
                              </button>
                              <span className="invisible opacity-0 bg-gray-100 text-gray-800 rounded-md py-1 px-2 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:visible group-hover:opacity-100 text-sm">
                                Pagada
                              </span>
                            </div>
                            <div className="group relative">
                              <button
                                onClick={() =>
                                  handleChangeStateOrder(order.id, "Despachada")
                                }
                                className="bg-blue-400 rounded-xl ml-2"
                              >
                                <FontAwesomeIcon
                                  className="p-1 text-white"
                                  icon={faTruckFast}
                                />
                              </button>
                              <span className="invisible opacity-0 bg-gray-100 text-gray-800 rounded-md py-1 px-2 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:visible group-hover:opacity-100 text-sm">
                                Despachada
                              </span>
                            </div>
                          </td>
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
