import React from "react";
import imgChefcitos from "../img/LogoChefcitoos.png";
import imglog from "../img/logo.jpg";
import hambur from "../img/pruebaProducto.jpeg";
import Card from "../components/Card";
import MercadoPagoButton from "../components/MercadoPagoButton";
import { useUser } from "../useUser";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavCreations  , getFavByUser } from "../Redux/actions";
import CardCreations from "../components/CardCreations";

const burgers = [
  {
    id: 1,
    image: `${hambur}`,
    name: "Hamburguesa Clásica",
    description:
      "Una deliciosa hamburguesa con ingredientes frescos y jugosa carne de res.",
    ratingValue: 4.5,
    price: 8.99,
  },
  {
    id: 2,
    image: `${hambur}`,
    name: "Hamburguesa con Queso",
    description:
      "Una hamburguesa con queso fundido y carne jugosa, perfecta para los amantes del queso.",
    ratingValue: 4.2,
    price: 9.99,
  },
  {
    id: 3,
    image: `${hambur}`,
    name: "Hamburguesa Vegetariana",
    description:
      "Una opción saludable y deliciosa, hecha con una mezcla de vegetales frescos y legumbres.",
    ratingValue: 4.0,
    price: 7.99,
  },
];

const Home = () => {
  const dispatch = useDispatch()
  const FavCreations = useSelector((state) => state.favCreations)
  const FavUser = useSelector((state) => state.favCreationsByUser)
  const userstorage = useUser();

  
  console.log(':::FavUser::', FavUser);
  useEffect(() => {
    dispatch(getFavCreations())
  },[dispatch])

  return (
    <>
      <div className="flex md:flex-row flex-row md:gap-10 items-center justify-around w-full pt-20 bg-gradient-to-b from-orange-100 to-white">
        <div className="flex flex-col items-center justify-start rounded-[16px]">
          <div className="flex flex-col gap-9 items-start justify-start w-full">
            <div className="flex flex-col gap-4 items-start justify-start w-full">
              <img src={imgChefcitos} alt="img" className="h-52 mb-8"></img>
              <h3 className="text-gray-900">
                <span className="md:text-5xl text-gray-900 text-[70px] text-left font-bold">
                  <>
                    Crea, comparte y disfruta
                    <br />
                  </>
                </span>
                <span className="md:text-5xl text-orange-600 text-[70px] text-left font-bold">
                  tus creaciones culinarias.
                </span>
              </h3>
              <h3 className="font-normal leading-[200.00%] text-gray_802 w-[91%] sm:w-full">
                Explora un mundo de sabores en cada momento
              </h3>
            </div>
            <div className="flex flex-row items-center justify-start">
              <Link to="/menu">
                <button className="cursor-pointer bg-orange-600 min-w-[140px] h-12 text-white rounded-xl font-bold">
                  Ordenar ahora
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img
            src={imglog}
            className="h-[502px] md:h-auto object-cover rounded-full"
            alt="illustration"
          />
        </div>
      </div>

      <div className="flex flex-col mt-28">
        <div className="flex items-center justify-center ">
          <h4>
            <span className="md:text-5xl text-orange-600 text-[70px] text-left font-bold items-center">
              Siempre Favoritos
            </span>
          </h4>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-8 pb-6 mt-12">
          {FavUser && FavUser.map((elem,index) => (
            <CardCreations
            key={index}
            id={elem.id}
            name={elem.name}
            image={elem.image}
            price={elem.price}
          />
          ))}
        </div>
        <div className="flex flex-row items-center justify-center">
          <Link to="/menu">
            <button className="mt-16 cursor-pointer bg-orange-600 min-w-[140px] h-12 text-white rounded-xl font-bold">
              Menu completo
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col mt-28">
        <h4 className="text-center">
          <span className="lg:text-6xl text-gray-900 text-[70px] text-left font-bold">
            Creaciones mas votadas
          </span>
        </h4>
        <div className="flex flex-row flex-wrap justify-center gap-8 pb-6 mt-12">
          { FavCreations && FavCreations.map((elem,index) => (
            <CardCreations
            key={index}
            id={elem.id}
            name={elem.name}
            image={elem.image}
            price={elem.price}
          />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;