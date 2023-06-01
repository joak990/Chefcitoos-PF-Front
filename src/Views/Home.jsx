import React from 'react'
import imgChefcitos from '../img/LogoChefcitoos.png'
import imglog from '../img/logo.jpg'
import { useUser } from '../useUser';


const Home = () => {
  const userstorage = useUser();
  return (
    <div className="flex md:flex-row flex-row md:gap-10 items-center justify-around w-full pt-20 bg-gradient-to-b from-orange-100 to-white">
    <div className="flex flex-col items-center justify-start rounded-[16px]">
      <div className="flex flex-col gap-9 items-start justify-start w-full">
        <div className="flex flex-col gap-4 items-start justify-start w-full">
          <img src={imgChefcitos} alt="img" className='h-52 mb-8' ></img>
          <h3
            className=" text-gray-900"
          >
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
          <h3
            className="font-normal leading-[200.00%] text-gray_802 w-[91%] sm:w-full"
          >
            Explora un mundo de sabores en cada momento
          </h3>
        </div>
        <div className="flex flex-row items-center justify-start">
          <button
            className="cursor-pointer bg-orange-600 min-w-[140px] h-12 text-white rounded-xl font-bold"
            // onClick={() => navigate("/menu")}
          >
            Ordenar ahora
          </button>
        </div>
      </div>
    </div>
    <img
      src={imglog}
      className="h-[502px] md:h-auto object-cover rounded-full"
      alt="illustration"
    />
  </div>
  );
}









export default Home
