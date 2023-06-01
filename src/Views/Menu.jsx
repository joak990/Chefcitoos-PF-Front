import React, { useEffect, useState } from "react";
import hamburguesa from "../img/hamburguesa.jpg";
import perritocaliente from "../img/perritocaliente.jpg";
import CardMenu from "../components/CardMenu";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/actions";

function Menu() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.AllProducts);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col p-2 gap-3 px-10 mt-10">
        <div>
          <h1 className="text-start font-bold text-orange-600 text-xl">
            Hamburguesas
          </h1>
          <div className="flex flex-row flex-wrap justify-center pb-6 gap-6">
            {allProducts &&
              allProducts.map((product) => {
                if (product.type_product === "hamburguesa")
                  return (
                    <CardMenu
                      key={product.id}
                      product={product}
                      onOrderProduct={handleShowModal}
                    />
                  );
              })}
          </div>
        </div>
        <div>
          <h1 className="text-start font-bold text-orange-600 text-xl">
            Perros Calientes
          </h1>
          <div className="flex flex-row flex-wrap justify-center pb-6 gap-6">
            {allProducts &&
              allProducts.map((product) => {
                if (product.type_product === "perro_caliente")
                  return (
                    <CardMenu
                      key={product.id}
                      product={product}
                      onOrderProduct={handleShowModal}
                    />
                  );
              })}
          </div>
        </div>
        <div>
          <h1 className="text-start font-bold text-orange-600 text-xl">
            Sandwiches
          </h1>
          <div className="flex flex-row flex-wrap justify-center pb-6 gap-6">
            {allProducts &&
              allProducts.map((product) => {
                if (product.type_product === "sandwich")
                  return (
                    <CardMenu
                      key={product.id}
                      product={product}
                      onOrderProduct={handleShowModal}
                    />
                  );
              })}
          </div>
        </div>
        <div>
          <h1 className="text-start font-bold text-orange-600 text-xl">
            Burritos
          </h1>
          <div className="flex flex-row flex-wrap justify-center pb-6 gap-6">
            {allProducts &&
              allProducts.map((product) => {
                if (product.type_product === "burrito")
                  return (
                    <CardMenu
                      key={product.id}
                      product={product}
                      onOrderProduct={handleShowModal}
                    />
                  );
              })}
          </div>
        </div>
        <div>
          <h1 className="text-start font-bold text-orange-600 text-xl">
            Otros Platos
          </h1>
          <div className="flex flex-row flex-wrap justify-center pb-6 gap-6">
            {allProducts &&
              allProducts.map((product) => {
                if (product.type_product === "otros_platos")
                  return (
                    <CardMenu
                      key={product.id}
                      product={product}
                      onOrderProduct={handleShowModal}
                    />
                  );
              })}
          </div>
        </div>
        <div>
          <h1 className="text-start font-bold text-orange-600 text-xl">
            Bebidas
          </h1>
          <div className="flex flex-row flex-wrap justify-center pb-6 gap-6">
            {allProducts &&
              allProducts.map((product) => {
                if (product.type_product === "bebidas")
                  return (
                    <CardMenu
                      key={product.id}
                      product={product}
                      onOrderProduct={handleShowModal}
                    />
                  );
              })}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal showModal={showModal} handleShowModal={handleShowModal} />
      )}
    </>
  );
}

export default Menu;
