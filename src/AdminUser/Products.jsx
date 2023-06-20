import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, putProductsbyid } from "../Redux/actions";
import NavAdmin from "./NavAdmin";
import { Card } from "@tremor/react";
import Swal from "sweetalert2";
import ModalProducts from "../components/ModalProducts";
import {
  faPencil,
  faRotate,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function Products() {
  const dispatch = useDispatch();
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [productSelected, setProductSelected] = useState({});

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.Products);
  const prueba = async (id) => {
    const confirmation = await Swal.fire({
      title: "¿Estás seguro que quieres modificar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff9800",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, modificar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: "bg-red-600 text-white rounded-md px-4 py-2 mr-2",
        cancelButton: "bg-green-600 text-white rounded-md px-4 mr-2 py-2",
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (confirmation.isConfirmed) {
      dispatch(putProductsbyid(id));
      await Swal.fire({
        title: "El producto ha sido modificado",
        icon: "success",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-orange-600 text-white rounded-md px-4 py-2",
        },
      });
      window.location.reload();
    }
  };

  const handleModalProducts = (product) => {
    setShowModalProduct(true);
    setProductSelected(product);
  };

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "¿Está seguro que desea eliminar permanentemente el producto?",
      icon: "danger",
      showCancelButton: true,
      confirmButtonColor: "#9CA3AF",
      cancelButtonColor: "#EA580C",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`${process.env.REACT_APP_API_URL}products/${productId}`)
        .then((response) => {
          dispatch(getProducts());
          Swal.fire({
            title: "Producto eliminado satisfactoriamente",
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
  }

  return (
    <main className="bg-slate-200 min-h-screen overflow-y-auto">
      <NavAdmin />
      <div className="w-10/12 mx-auto flex justify-center">
        <Card className="p-4 bg-white mt-6 mb-6">
          <h1 className="text-2xl font-bold">Productos</h1>
          <div className="overflow-x-auto flex flex-col">
            <button
              onClick={() => handleModalProducts({})}
              className="bg-orange-600 w-36 my-4 h-8 text-white rounded-xl font-semibold self-start md:self-end lg:self-end"
            >
              Crear Producto
            </button>
            <table className="w-full mt-2">
              <thead>
                <tr>
                  <th className="py-2 pr-8 text-left border-b border-gray-300 border-r">
                    ID
                  </th>
                  <th className="py-2 pl-8 pr-8 text-left border-b border-gray-300 border-r">
                    Imagen
                  </th>
                  <th className="py-2 pl-4 pr-4 text-left border-b border-gray-300 border-r">
                    Nombre
                  </th>
                  <th className="py-2 pl-4 pr-4 text-left border-b border-gray-300 border-r">
                    Elementos
                  </th>
                  <th className="py-2 pl-4 pr-4 text-center border-b border-gray-300 border-r">
                    Tipo de Producto
                  </th>
                  <th className="py-2 pl-4 pr-4 text-left border-b border-gray-300 border-r">
                    Precio (COP)
                  </th>
                  <th className="py-2 pl-4 pr-4 text-left border-b border-gray-300 border-r">
                    Estado
                  </th>
                  <th className="py-2 pl-4 pr-4 text-left border-b border-gray-300">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr key={product.id}>
                    <td
                      className={`py-2 pr-8 ${
                        index !== products.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } border-r border-gray-300`}
                    >
                      {product.id}
                    </td>
                    <td
                      className={`py-2 pl-8 pr-8 ${
                        index !== products.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } border-r border-gray-300`}
                    >
                      <img className="w-20" src={product.image} />
                    </td>
                    <td
                      className={`py-2 pl-4 pr-4 ${
                        index !== products.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } border-r border-gray-300`}
                    >
                      {product.name}
                    </td>
                    <td
                      className={`py-2 pl-4 pr-4 ${
                        index !== products.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } border-r border-gray-300`}
                    >
                      {product.elements?.length > 50 ? product.elements.slice(0, 50) + "..." : product.elements}
                    </td>
                    <td
                      className={`py-2 pl-4 pr-4 text-center ${
                        index !== products.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } border-r border-gray-300`}
                    >
                      <span
                        className={`${
                          product.type_product === "hamburguesa"
                            ? "bg-indigo-200"
                            : product.type_product === "perro_caliente"
                            ? "bg-green-200"
                            : product.type_product === "sandwich"
                            ? "bg-yellow-200"
                            : product.type_product === "burrito"
                            ? "bg-orange-200"
                            : product.type_product === "bebidas"
                            ? "bg-red-200"
                            : "bg-teal-200"
                        } rounded-2xl w-full px-8 py-1 capitalize`}
                      >
                        {product.type_product}
                      </span>
                    </td>
                    <td
                      className={`py-2 pl-4 pr-4 text-center ${
                        index !== products.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } border-r border-gray-300`}
                    >
                      {product.price}
                    </td>
                    <td
                      className={`py-2 pl-8 pr-8 text-center ${
                        index !== products.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } border-r border-gray-300`}
                    >
                      {product.isDeleted ? (
                        <span
                          product_id={product.id}
                          role="img"
                          aria-label="Delete"
                          className="delete-icon"
                        >
                          ❌
                        </span>
                      ) : (
                        <span
                          product_id={product.id}
                          role="img"
                          aria-label="Delete"
                          className="text-green-500"
                        >
                          ✔
                        </span>
                      )}
                    </td>
                    <td
                      className={`py-2 pl-8 pr-8 text-center border-b ${
                        index !== products.length - 1
                          ? " border-gray-300"
                          : "border-none"
                      } `}
                    >
                      <div className="flex flex-row">
                        {product.isDeleted ? (
                          <div className="group relative">
                            <button
                              onClick={() => prueba(product.id)}
                              className="bg-green-400 rounded-xl"
                            >
                              <FontAwesomeIcon
                                className="p-1 text-white"
                                icon={faRotateRight}
                              />
                            </button>
                            <span className="invisible opacity-0 bg-gray-100 text-gray-800 rounded-md py-1 px-2 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:visible group-hover:opacity-100 text-sm">
                              Activar
                            </span>
                          </div>
                        ) : (
                          <div className="group relative">
                            <button
                              onClick={() => prueba(product.id)}
                              className="bg-yellow-400 rounded-xl"
                            >
                              <FontAwesomeIcon
                                className="p-1 text-white"
                                icon={faRotateRight}
                              />
                            </button>
                            <span className="invisible opacity-0 bg-gray-100 text-gray-800 rounded-md py-1 px-2 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:visible group-hover:opacity-100 text-sm">
                              Desactivar
                            </span>
                          </div>
                        )}
                        <div className="group relative">
                          <button
                            onClick={() => handleModalProducts(product)}
                            className="bg-blue-400 rounded-xl ml-2"
                          >
                            <FontAwesomeIcon
                              className="p-1 text-white"
                              icon={faPencil}
                            />
                          </button>
                          <span className="invisible opacity-0 bg-gray-100 text-gray-800 rounded-md py-1 px-2 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:visible group-hover:opacity-100 text-sm">
                            Editar
                          </span>
                        </div>
                        <div className="group relative">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-400 rounded-xl ml-2"
                          >
                            <FontAwesomeIcon
                              className="p-1 text-white"
                              icon={faTrash}
                            />
                          </button>
                          <span className="invisible opacity-0 bg-gray-100 text-gray-800 rounded-md py-1 px-2 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:visible group-hover:opacity-100 text-sm">
                            Eliminar
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      {showModalProduct && (
        <ModalProducts onClose={() => setShowModalProduct(false)} productSelected={productSelected} />
      )}
    </main>
  );
}

export default Products;
