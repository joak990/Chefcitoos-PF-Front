import React, { useEffect, useState } from 'react';
import { useUser } from '../useUser';
import { useDispatch, useSelector } from 'react-redux';
import CardCreations from '../components/CardCreations';
import { getCreations, resetfilters,getPublicacionesFilter, getPublicacionesFilters, getPublicacionesFilterPrice, pagePublications, getallcomponents } from '../Redux/actions';
import SeacrhBar from '../components/SeacrhBar';
import { Pagination } from '../components/Pagination';

const ingredientes = [
  "Tomate",
  "Cebolla Freida",
  "Pepinillo",
  "Huevos de codorniz",
  "Papitas",
  "Jamon",
  "Queso",
  "Pico de gallo",
  "Hogao",
  "Fresas"
];


function Publicaciones() {
  const [selectedOptions, setSelectedOptions] = useState({
    ingredientes: [],
    categoria: [],
    priceCase: 0,
    Rating:""
  });
  const dispatch = useDispatch();
  const allCreations = useSelector((state) => state.allCreations);
  const page = useSelector((state) => state.numPagePublications);
  const allcomponents = useSelector((state) => state.allComponents);
  const [perPage, setPerPage] = useState(9);
  const maxPage = Math.ceil(allCreations.length / perPage);

  useEffect(() => {
    if (allCreations.length <= 0) {
      dispatch(getCreations());
    }
    dispatch(getallcomponents())
  }, [dispatch]);

  const HandleButton = (event) => {
    const value = event.target.value;
    dispatch(getPublicacionesFilters(value));
  };

  const HandlePrice = (event) => {
    const value = event.target.value;
    dispatch(getPublicacionesFilterPrice(value));
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu2 = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleOptionChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      ingredientes : [...selectedOptions.ingredientes,event.target.value]
  })
  }

  
  const handleCategoria = (event) => {;
    setSelectedOptions({
        ...selectedOptions,
        categoria : [...selectedOptions.categoria,event.target.value]
    })
}

const handleInputChange = (event) => {
  const { name, value } = event.target;

  if (name === "priceCase") {
    const price = parseFloat(value);
    setSelectedOptions({
      ...selectedOptions,
      [name]: price,
    });
  } else {
    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    });
  }
};

  const handlesubmit = (event)=>{
    event.preventDefault();
    console.log('hola1');
    dispatch(getPublicacionesFilter(selectedOptions));
    console.log('hola2');
  }

  const handlereset = ()=>{
    dispatch(resetfilters())

  console.log("entro al dispatch");
  }

  return (
    <div className="flex flex-col items-center justify-start w-full md:px-20">
      <h3 className="text-gray-900 font-bold text-4xl mt-8 mb-2 text-center">Explora y conoce nuestra comunidad</h3>
      <div className="flex flex-row flex-wrap p-5">
        <SeacrhBar type="posts" />
      </div>


      <div className="flex flex-row flex-wrap justify-center p-5 gap-4">
        <button
          value="Todas"
          onClick={HandleButton}
          className="bg-orange-600 w-32 md:w-40 h-12 text-white rounded-xl font-bold mt-6"
        >
          Todas
        </button>
        <form onSubmit={handlesubmit} >
        
        <select
          defaultValue="DEFAULT"
          className="bg-gray-300 w-32 md:w-40 h-12 text-black rounded-xl font-bold mt-6 mr-3"
          onChange={handleCategoria}
          name="categoria"
        >
          <option value="DEFAULT" disabled className="text-center">
            Tipo de Producto
          </option>
          <option value="hamburguesa">Hamburguesas</option>
          <option value="burrito">Burritos</option>
          <option value="Sandwich">Sandwich</option>
          <option value="perro_caliente">Perros Calientes</option>
        </select>        
        <select
          onChange={handleInputChange}
          name="priceCase"
          defaultValue="DEFAULT"
          className="bg-gray-300 w-32 md:w-40 h-12 text-black rounded-xl font-bold mt-6 mr-3"
          >
          <option value="DEFAULT" disabled className="text-center">
            Precio
          </option>
          <option value="1">$10.000 - $15.000</option>
          <option value="2">$15.000 - $20.000</option>
          <option value="3">$20.000 - $28.000</option>
        </select>
        <select
        onChange={handleInputChange}
        defaultValue="DEFAULT"
        name="Rating"
        className="bg-gray-300 w-32 md:w-40 h-12 text-black rounded-xl font-bold mt-6 mr-3"
        >
          <option value="DEFAULT" disabled className="text-center">
            Rating
          </option>
          <option value="DESC">Menor Rating </option>
          <option value="ASC">Mayor Rating</option>

        </select>
        <button type='submit' className='bg-orange-600 w-32 md:w-28 h-12 text-white rounded-xl font-bold mt-6 '>Filtrar</button>
        </form>
      <button onClick={handlereset} className='bg-orange-500 w-32 md:w-28 h-12 text-white rounded-xl font-bold mt-6'>Reset</button>
      </div> 

        
        <div className="mr-10 flex  mt-4 gap-2 bg-orange-100 p-2 ">
            {allcomponents && allcomponents.map((elem) => {
              return (
                <>
                  <label className='mr-3 font-semibold'  >
                    <input className='mr-1 w-5'
                      type="checkbox"
                      value={elem.id}
                      onChange={handleOptionChange}
                    />
                    {elem.name}
                  </label>
                </>
              )
            })}
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
                      product={elem?.product?.name}
                      image={elem?.image}
                      name={elem.name}
                      user={elem?.Users?.name}
                      price={elem?.price}
                      average={elem?.average}

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
