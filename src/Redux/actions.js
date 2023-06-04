import {
  GET_PRODUCTS,
  DELETE_PRODUCTS,
  POST_PRODUCTS,
  PUT_PRODUCTS,
  REGISTER_USER,
  LOGIN_USER,
  GET_CREATIONS,
  LOGIN_SUCCESS,
  GET_CREATIONS_BY_ID,
  GET_CREATIONS_BY_USER,
  GET_COMPONENTS,
  GET_CREATION_FILTERS,
  GET_CREATION_FILTERS_PRICE,
  GET_PUBLICATION_FILTERS,
  GET_PUBLICATION_FILTERS_PRICE
} from "./typeAction";

import axios from "axios";

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/products`);
      console.log("::json.data:::", json.data);
      return dispatch({
        type: GET_PRODUCTS,
        payload: json.data,
      });
    } catch (error) {
      alert(`Message ${GET_PRODUCTS}:`, error);
    }
  };
};

export const getCreations = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/creations/posts`);
      // console.log("::json.data:::", json.data);
      return dispatch({
        type: GET_CREATIONS,
        payload: json.data,
      });
    } catch (error) {
      alert(`Message ${GET_CREATIONS}:`, error);
    }
  };
};

export const getCreationDetail = (id) => {

  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/creations/${id}?type=creation`);
      console.log("::json.data:::", json.data);
      return dispatch({
        type: GET_CREATIONS_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      alert(`Message ${GET_CREATIONS_BY_ID}:`, error);
    }
  };
};
//todas las creaciones del usuario
export const getCreationDetailByUser = (id) => {
  console.log('id',id);
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/creations/myCreations/${id}?type=user`);
      console.log("::json.data:::", json.data);
      return dispatch({
        type: GET_CREATIONS_BY_USER,
        payload: json.data,
      });
    } catch (error) {
      alert(`Message ${GET_CREATIONS_BY_USER}:`, error);
    }
  };
};

export const deleteProducts = (id) => {
  return async function (dispatch) {
    try {
      const json = await axios.delete(`http://localhost:3001/products/${id}`);
      return dispatch({
        type: DELETE_PRODUCTS,
        payload: json.data,
      });
    } catch (error) {
      alert(`Message ${DELETE_PRODUCTS}:`, error);
    }
  };
};

export const postProducts = (payload) => {
  return async function (dispatch) {
    try {
      const post = await axios.post(`http://localhost:3001/products`, payload);
      return post;
    } catch (error) {
      alert(`Message ${POST_PRODUCTS}:`, error);
    }
  };
};

export const putProducts = (id, payload) => {
  return async function (dispatch) {
    try {
      const put = await axios.put(
        `http://localhost:3001/products/${id}`,
        payload
      );
      return dispatch({
        type: PUT_PRODUCTS,
        payload: put.data,
      });
    } catch (error) {
      alert(`Message ${PUT_PRODUCTS}:`, error);
    }
  };
};

// USER --> ok -> TRUE - NO ->> USUARIO 
//Login GOOGLE

//necesitamos que si viene de register (importante filtrar solo por register) y ademas esta duplicado al consultar
//en el back devolve una nueva propiedad que se llame duplicated y que sea true
//podes enviar duplicated de uktina en false si no lo esta 
export const postRegisterUser = (payload) => {
  //console.log('::payload:',payload);
  return async function (dispatch) {
    try {
      const post = await axios.post(`http://localhost:3001/users`, payload);
      
     if(post.data.root === "register"){
      if(post.data.duplicated === true){
        alert("el usuario ya esta registrado")
      }else{
        alert("el usuario se creo correctamente")
      }
     }else{
      localStorage.setItem("email", post.data.email);
      localStorage.setItem("id", post.data.id);
      localStorage.setItem("name", post.data.name);
      return post.data;
     }     
    } catch (error) {
      alert(`Message ${REGISTER_USER}:`, error);
    }
  };
};
// 

// VALIDATE ->>> OK -> email y id(datos son validos) - NO --> FALSE (datos son incorrectos)

//LOGIN REGISTER
export const postLoginUser = (payload) => {
  console.log('payload', payload);
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/validate",
        payload
      );
    
      if (response.data.email && response.data.id && response.data.name) {
        // Autenticación exitosa
        // Puedes realizar acciones adicionales aquí, como guardar el token de autenticación en el estado global
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("name", response.data.name);
        // y redireccionar al usuario al home
        dispatch({ type: LOGIN_SUCCESS });
        return { success: true,email:response.data.email, id:response.data.id };
      } else {
        // Autenticación fallida
        const errorMessage = response.data.message || "Error de autenticación";
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error de autenticación" };
    }
  };
};

export const getComponents = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/components`);
      console.log("::json.data:::", json.data);
      return dispatch({
        type: GET_COMPONENTS,
        payload: json.data,
      });
    } catch (error) {
      alert(`Message ${GET_COMPONENTS}:`, error);
    }
  };
};
//creaciones propias por id 
 export const getCreationFilters = (TypeProducts,id) => {
  console.log('id',id);
  console.log('typeProducts', TypeProducts);
  return async function (dispatch){
    try {
      const json = await axios.get(`http://localhost:3001/creations/myCreations/${id}?type=user&filterName=typeProduct${TypeProducts}`)
      return dispatch ({
        type : GET_CREATION_FILTERS,
        payload : json.data,
      })
    } catch (error) {
      alert((`Message ${GET_CREATION_FILTERS}:`, error))
    }
  }
 }

 export const getCreationFilterPrice = (TypePrice,id) => {
  return async function (dispatch){
    try {
      const json = await axios.get(`http://localhost:3001/creations/${id}?type=user${TypePrice}`)
      return dispatch ({
        type : GET_CREATION_FILTERS_PRICE,
        payload : json.data,
      })
    } catch (error) {
      alert((`Message ${GET_CREATION_FILTERS_PRICE}:`, error))
    }
  }
 }
 
 export const getPublicacionesFilters = (TypeProducts) => {
  return async function (dispatch){
    try {
      const json = await axios.get(`http://localhost:3001/creations/posts?filterName=typeProduct${TypeProducts}`)
      return dispatch ({
        type : GET_PUBLICATION_FILTERS,
        payload : json.data,
      })
    } catch (error) {
      alert((`Message ${GET_PUBLICATION_FILTERS}:`, error))
    }
  }
 }

 export const getPublicacionesFilterPrice = (TypePrice) => {
  return async function (dispatch){
    try {
      const json = await axios.get(`http://localhost:3001/creations/?filterName=${TypePrice}`)
      return dispatch ({
        type : GET_PUBLICATION_FILTERS_PRICE,
        payload : json.data,
      })
    } catch (error) {
      alert((`Message ${GET_PUBLICATION_FILTERS_PRICE}:`, error))
    }
  }
 }
