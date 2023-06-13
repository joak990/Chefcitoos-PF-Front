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
  GET_PUBLICATION_FILTERS_PRICE,
  CLEAN_DETAIL,
  GET_CREATION_BY_NAME,
  GET_PUBLICATION_BY_NAME,
  NUM_PAGE_CREATION,
  NUM_PAGE_PUBLICATION,
  CLEAN_YOUR_CREATIONS,
  CLEAN_PUBLICATIONS,
  GET_ASSESSMENT_VALIDATE,
  GET_ALL_COMMENTS,
  PUT_PRODUCTS_BY_ID,
  GET_ALL_USERS,
  DELETE_USER,
  GET_COMMENTS,
  ADD_CREATION,
  GET_CREATIONS_SELECTED,
  DELETE_CREATION,
  UPDATE_CREATION_QUANTITY,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT_QUANTITY,
  SET_SHOPPING_CART,
  CLEAN_SHOPPING_CART,
  DELETE_COMMENT,
  ORDER_DETAIL,
  SET_USER,
  GET_RECENT_ORDERS
} from "./typeAction";

import axios from "axios";
import Swal from 'sweetalert2'

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/products`);
      // console.log("::json.data:::", json.data);
      return dispatch({
        type: GET_PRODUCTS,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error GET PRODUCTS',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${GET_PRODUCTS}:`, error);
    }
  };
};

export const getCreations = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/creations/posts?filterName=isPosted`);
      
      return dispatch({
        type: GET_CREATIONS,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error GET CREATIONS',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${GET_CREATIONS}:`, error);
    }
  };
};


export const  getCreationDetail = (id) => {

  return async function (dispatch) {
    try {
      const json = await axios.get(`/creations/myCreations/${id}?type=creation`);
      // console.log("::json.data:::", json.data);
      return dispatch({
        type: GET_CREATIONS_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error GET_CREATIONS_BY_ID',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${GET_CREATIONS_BY_ID}:`, error);
    }
  };
};


//todas las creaciones del usuario
export const getCreationDetailByUser = (id) => {
  console.log('id',id);
  return async function (dispatch) {
    try {
      const json = await axios.get(`/creations/myCreations/${id}?type=user`);
      // console.log("::json.data:::", json.data);
      return dispatch({
        type: GET_CREATIONS_BY_USER,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error GET_CREATIONS_BY_USER',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${GET_CREATIONS_BY_USER}:`, error);
    }
  };
};


export const deleteProducts = (id) => {
  return async function (dispatch) {
    try {
      const json = await axios.delete(`/products/${id}`);
      return dispatch({
        type: DELETE_PRODUCTS,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error DELETE_PRODUCTS',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${DELETE_PRODUCTS}:`, error); 
    }
  };
};

export const postProducts = (payload) => {
  return async function (dispatch) {
    try {
      const post = await axios.post(`/products`, payload);
      return post;
    } catch (error) {
      Swal.fire({
        title: 'Error POST_PRODUCTS',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
     // alert(`Message ${POST_PRODUCTS}:`, error);
    }
  };
};

export const putProducts = (id, payload) => {
  return async function (dispatch) {
    try {
      const put = await axios.put(
        `/products/${id}`,
        payload
      );
      return dispatch({
        type: PUT_PRODUCTS,
        payload: put.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error PUT_PRODUCTS',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${PUT_PRODUCTS}:`, error);
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
      const post = await axios.post(`/users`, payload);
      
     if(post.data.root === "register"){
      if(post.data.duplicated === true){
        Swal.fire({
          title: 'El usuario ya esta registrado',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
          }
        });
      }else{
        Swal.fire({
          title: 'El usuario se creo correctamente',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
          }
        });
      }
     }else{
      localStorage.setItem("email", post.data.email);
      localStorage.setItem("id", post.data.id);
      localStorage.setItem("name", post.data.name);
      localStorage.setItem("userLogin", JSON.stringify(post.data));
      return post.data;
     }     
    } catch (error) {
      Swal.fire({
        title: 'Error REGISTER_USER',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      
      //alert(`Message ${REGISTER_USER}:`, error);
    }
  };
};
// 

// VALIDATE ->>> OK -> email y id(datos son validos) - NO --> FALSE (datos son incorrectos)

//LOGIN REGISTER
export const postLoginUser = (payload) => {

  return async function (dispatch) {
    try {
      const response = await axios.post(
        "/users/validate",
        payload
      );
    
      if (response.data.email && response.data.id && response.data.name) {
        // Autenticación exitosa
        // Puedes realizar acciones adicionales aquí, como guardar el token de autenticación en el estado global
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userLogin", JSON.stringify(response.data));
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
      const json = await axios.get(`/components`);
      // console.log("::json.data:::", json.data);
      return dispatch({
        type: GET_COMPONENTS,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error GET_COMPONENTS',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${GET_COMPONENTS}:`, error);
    }
  };
};
//creaciones propias por id 
 export const getCreationFilters = (TypeProducts,id) => {
  //console.log('id',id);
  //console.log('typeProducts', TypeProducts);
  return async function (dispatch){
    try {
      const json = await axios.get(`/creations/myCreations/${id}?type=user&filterName=typeProduct${TypeProducts}`)
      return dispatch ({
        type : GET_CREATION_FILTERS,
        payload : json.data,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error GET_CREATION_FILTERS',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert((`Message ${GET_CREATION_FILTERS}:`, error))
    }
  }
 }

 export const getPublicacionesFilters = (TypeProducts) => {
  return async function (dispatch){
    try {
      const json = await axios.get(`/creations/posts?filterName=typeProduct${TypeProducts}`)
      return dispatch ({
        type : GET_PUBLICATION_FILTERS,
        payload : json.data,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error GET_PUBLICATION_FILTERS',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert((`Message ${GET_PUBLICATION_FILTERS}:`, error))
    }
  }
 }

 export const getCreationFilterPrice = (payload) => {
 // console.log('value', payload );
  return  {
    type:GET_CREATION_FILTERS_PRICE,
     payload: payload,  
  }
}

export const getPublicacionesFilterPrice = (payload) => {
  //console.log('value', payload );
  return  {
    type:GET_PUBLICATION_FILTERS_PRICE,
     payload: payload,  
  }
}
 

//  export const getPublicacionesFilterPrice = (TypePrice) => {
//   return async function (dispatch){
//     try {
//       const json = await axios.get(`http://localhost:3001/creations/?filterName=${TypePrice}`)
//       return dispatch ({
//         type : GET_PUBLICATION_FILTERS_PRICE,
//         payload : json.data,
//       })
//     } catch (error) {
//       alert((`Message ${GET_PUBLICATION_FILTERS_PRICE}:`, error))
//     }
//   }
//  }
 

 export function cleanDetail(){
  return {
    type: CLEAN_DETAIL,
  }
}

export const getCreationByName = (id, name) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/searchBar/${id}?productName=${name}`);
     
      return dispatch({
        type: GET_CREATION_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error GET_CREATION_BY_NAME',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${GET_CREATION_BY_NAME}:`, error);
    }
  };
};

export const getPublicationName = (name) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/searchBar/?productName=${name}`);
    
      return dispatch({
        type: GET_PUBLICATION_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error GET_PUBLICATION_BY_NAME',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${GET_PUBLICATION_BY_NAME}:`, error);
    }
  };
};

export const pageCreations = (value) => {
  return {
    type : NUM_PAGE_CREATION, 
    payload : value,
  }
}

export const pagePublications = (value) => {
  return {
    type : NUM_PAGE_PUBLICATION,
    payload : value
  }
}

export function cleanYourCreations(){
  return {
    type: CLEAN_YOUR_CREATIONS,
  }
}
export function cleanPublications(){
  return {
    type: CLEAN_PUBLICATIONS,
  }
}


export const postAssessment = (payload) => {
  
  return async function (dispatch) {
    try {
      const json = await axios.post(`/assessments`, payload);
      // console.log("::json.data:::", json.data);
      return json.data;
    } catch (error) {
      Swal.fire({
        title: 'Error POST_ASSESSMENT',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message POST_ASSESSMENT:`, error);
    }
  };
};


export const comments = (id) => {
  console.log('id',id);
  return async function (dispatch) {
    try {
      const json = await axios.get(`/assessments/comments/${id}`);
      console.log("::jsonDdata:::", json.data);
      return dispatch({
        type : GET_ALL_COMMENTS ,
        payload:json.data
      })
    } catch (error) {
      Swal.fire({
        title: 'Error AssesmentValidate',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message AssesmentValidate:`, error);
    }
  };
}


export const getAssessmentValidate = () => {
  return async function (dispatch) {
    try {
      const obj = {creation_id:1,user_id:100}
      const json = await axios.get(`/assessments/validateAssessment`, obj);
      return json.data;
    } catch (error) {
      Swal.fire({
        title: 'Error AssesmentValidate',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message AssesmentValidate:`, error);
    }
  };
};


export const LoginAdminValidate = (payload) => {

  return async function (dispatch) {
    try {
      const response = await axios.post(
        "/users/validate",
        payload
      );
     console.log("date",response.data);
      if (response.data.validate === true) {
      if(response.data.id){
        localStorage.setItem("id", response.data.id);
      }
        // y redireccionar al usuario al home
        dispatch({ type: LOGIN_SUCCESS });
        return { validate: true };
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





export const putProductsbyid = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/products/change/${id}`);
      console.log(response.data);
      return dispatch({
        type: PUT_PRODUCTS_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error PUT_PRODUCTS_BY_ID',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${PUT_PRODUCTS}:`, error);
    }
  };
};


export const GetAllUsers = () => {
  return async function (dispatch){
    try {
      const json = await axios.get(`/users`)
      return dispatch ({
        type : GET_ALL_USERS,
        payload : json.data,
      })
    } catch (error) {
      Swal.fire({
        title: 'Error GET_ALL_USERS',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert((`Message ${GET_ALL_USERS}:`, error))
    }
  }
 }

 
export const DeleteUser = (id) => {
  return async function (dispatch) {
    try {
      const json = await axios.delete(`/users/${id}`);
      return dispatch({
        type: DELETE_USER,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error DELETE_PRODUCTS',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${DELETE_PRODUCTS}:`, error);
    }
  };
};
export const GetAllComments = (id) => {
  return async function (dispatch){
    try {
      const json = await axios.get(`/assessments/${id}`)
      return dispatch ({
        type : GET_COMMENTS,
        payload : json.data,
      })
    } catch (error) {
      alert((`Message ${GET_ALL_USERS}:`, error))
    }
  }
 }

 export function addCreation(payload){
  return {
    type: ADD_CREATION,
    payload
  }
}

export function deleteCreation(payload){
  return {
    type: DELETE_CREATION,
    payload
  }
}
export function updateCreationQuantity(payload){
  return {
    type: UPDATE_CREATION_QUANTITY,
    payload
  }
}
 export function addProduct(payload){
  return {
    type: ADD_PRODUCT,
    payload
  }
}

export function deleteProduct(payload){
  return {
    type: DELETE_PRODUCT,
    payload
  }
}
export function updateProductQuantity(payload){
  return {
    type: UPDATE_PRODUCT_QUANTITY,
    payload
  }
}
export function setShoppingCart(payload){
  return {
    type: SET_SHOPPING_CART,
    payload
  }
}
export function cleanShoppingCart(){
  return {
    type: CLEAN_SHOPPING_CART,
  }
}

 export const DeleteComments = (id) => {
  return async function (dispatch) {
    try {
      const json = await axios.delete(`/assessments/${id}`);
      return dispatch({
        type: DELETE_COMMENT,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error DELETE_PRODUCTS',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
      //alert(`Message ${DELETE_PRODUCTS}:`, error);
    }
  };
};

export const orderDetail = (id) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/orders/${id}`);
      return dispatch({
        type: ORDER_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error ORDER_DETAIL' + error.message,
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2', 
        }
      })
    }
  };
};

export const setUser = () => {
   return  {
     type:SET_USER,  
   }
 }


 export const getRecentOrders = () => {
  return async function (dispatch){
    try {
      const json = await axios.get(`/admin/orders`)
      return dispatch ({
        type : GET_RECENT_ORDERS,
        payload : json.data,
      })
    } catch (error) {
      alert((`Message ${GET_RECENT_ORDERS}:`, error))
    }
  }}