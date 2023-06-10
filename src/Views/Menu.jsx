import React, { useEffect, useState } from "react";
import hamburguesa from "../img/hamburguesa.jpg";
import perritocaliente from "../img/perritocaliente.jpg";
import CardMenu from "../components/CardMenu";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProducts, updateProductQuantity } from "../Redux/actions";
import Swal from 'sweetalert2'

function Menu() {

  const component_categ_producto = [];

  const [productSelected, setProductSelected] = useState(null);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.AllProducts);
  const productsShoppingCart = useSelector((state) => state.shoppingCart.products);



  const addProductToCart = (product) => {
    if( productsShoppingCart.some(productCurrent => productCurrent.product_id === product.id)){
      dispatch(updateProductQuantity({quantity: 1, index: productsShoppingCart.findIndex(productCurrent => { 
        return productCurrent.product_id === product.id
      })}))
    } else {

      const productAdd = {
        product_id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1
      };
      dispatch(addProduct(productAdd));
    }
    Swal.fire({
      title: 'Producto agregado satisfactoriamente al carrito',
      icon: 'success',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
      }
    })
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
                      onOrderProduct={ () => setProductSelected(product)}
              
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
                      onOrderProduct={ () => setProductSelected(product)}
                     
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
                      onOrderProduct={ () => setProductSelected(product)}
                    
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
                      onOrderProduct={ () => setProductSelected(product)}
                     
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
                      onOrderProduct={() => addProductToCart(product)}
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
                      onOrderProduct={() => addProductToCart(product)}
                    />
                  );
              })}
          </div>
        </div>
      </div>
      {productSelected && (
        <Modal productSelected={productSelected} onClose={() => setProductSelected(null)} />
      )}
    </>
  );
}

export default Menu;
