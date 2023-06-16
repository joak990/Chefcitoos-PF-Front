import React, { useEffect, useState } from 'react';
import { useUser } from '../useUser';
import { useDispatch, useSelector } from 'react-redux';
import CardCreations from '../components/CardCreations';
import { getCreations, getPublicacionesFilters, getPublicacionesFilterPrice, pagePublications } from '../Redux/actions';
import SeacrhBar from '../components/SeacrhBar';
import { Pagination } from '../components/Pagination';

function Publicaciones() {
  const dispatch = useDispatch();
  const allCreations = useSelector((state) => state.allCreations);
  const page = useSelector((state) => state.numPagePublications);
  console.log('::::AllPublications:::', allCreations);

  const [perPage, setPerPage] = useState(9);
  const maxPage = Math.ceil(allCreations.length / perPage);

  useEffect(() => {
    if (allCreations.length <= 0) {
      dispatch(getCreations());
    }
  }, [dispatch]);

  const HandleButton = (event) => {
    const value = event.target.value;
    dispatch(getPublicacionesFilters(value));
  };

  const HandlePrice = (event) => {
    const value = event.target.value;
    dispatch(getPublicacionesFilterPrice(value));
  };

  return (
    <div className="flex flex-col items-center justify-start w-full md:px-20">
      <div className="flex flex-row flex-wrap p-5">
        <SeacrhBar type="posts" />
      </div>

      <h3 className="text-gray-900 font-bold text-4xl mt-6 mb-6 text-center">Explora y conoce nuestra comunidad</h3>

      <div className="flex flex-row flex-wrap justify-center p-5 gap-4">
        <button
          value="Todas"
          onClick={HandleButton}
          className="bg-orange-600 w-32 md:w-40 h-12 text-white rounded-xl font-bold mt-6"
        >
          Todas
        </button>
        <button
          value="Burgers"
          onClick={HandleButton}
          className="bg-gray-300 w-32 md:w-40 h-12 text-black rounded-xl font-bold mt-6"
        >
          Hamburguesa
        </button>
        <button
          value="HotDogs"
          onClick={HandleButton}
          className="bg-gray-300 w-32 md:w-40 h-12 text-black rounded-xl font-bold mt-6"
        >
          Perro Caliente
        </button>
        <button
          value="Sandwitch"
          onClick={HandleButton}
          className="bg-gray-300 w-32 md:w-40 h-12 text-black rounded-xl font-bold mt-6"
        >
          Sandwich
        </button>
        <button
          value="Burrito"
          onClick={HandleButton}
          className="bg-gray-300 w-32 md:w-40 h-12 text-black rounded-xl font-bold mt-6"
        >
          Burrito
        </button>
        <select
          onChange={HandlePrice}
          defaultValue="DEFAULT"
          className="bg-gray-300 w-32 md:w-40 h-12 text-black rounded-xl font-bold mt-6"
        >
          <option value="DEFAULT" disabled className="text-center">
            Precio
          </option>
          <option value="desc">Menor Precio</option>
          <option value="asc">Mayor Precio</option>
        </select>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-8 pb-6">
        {allCreations &&
          allCreations
          
            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((elem, index) => (
              <>
                {
                  !elem.isDeleted ? (
                    <CardCreations
                      key={index}
                      id={elem.id}
                      product={elem.product.name}
                      image={elem.image}
                      name={elem.name}
                      user={elem.Users.name}
                      price={elem.price}
                      average={elem.average}
                     
                    />
                  ) :
                    null
                }
                
              </>
            ))}
      </div>
      {allCreations.length > 0 && <Pagination action={pagePublications} page={page} maxPage={maxPage} />}
    </div>
  );
}

export default Publicaciones;
