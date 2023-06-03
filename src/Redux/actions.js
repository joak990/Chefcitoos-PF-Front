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
} from "./typeAction";

import axios from "axios";

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/products`);
      // console.log("::json.data:::", json.data);
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
      const json = await axios.get(`http://localhost:3001/creations`);
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
  console.log("holaaaaaa");
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
export const getCreationDetailByUser = (id) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/creations/${id}?type=user`);
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
      //console.log("--->", post.data);

       
      if(post.data.root === "register" && !post.data.uid){
         alert("el se creo correctamente ")
      }else{
 // console.log(post.data);
 
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
      
      console.log('response', response.data);
      // if(response.data === true){
      //   return alert('El usuario ya existente, Redi')
      // }
      // console.log("=>>>>>",response.data.validCredentials);
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