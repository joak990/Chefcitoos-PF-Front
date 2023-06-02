
import { GET_PRODUCTS, 
        DELETE_PRODUCTS,
        POST_PRODUCTS,
        PUT_PRODUCTS,
        REGISTER_USER,
        LOGIN_USER,
        GET_CREATIONS
        } from "./typeAction";

import axios from 'axios';

export const getProducts = () => {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/products`)
            console.log('::json.data:::', json.data);
            return dispatch ({
                type : GET_PRODUCTS,
                payload : json.data
            })
        } catch (error) {
            alert(`Message ${GET_PRODUCTS}:` ,error)
        }
    }
}

export const getCreations = () => {
    return async function(dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/creations`)
            console.log('::json.data:::', json.data);
            return dispatch ({
                type : GET_CREATIONS,
                payload : json.data
            })
        } catch (error) {
            alert(`Message ${GET_CREATIONS}:` ,error)
        }
    }
}

export const deleteProducts = (id) => {
    return async function(dispatch) {
        try {
            const json = await axios.delete(`http://localhost:3001/products/${id}`)
            return dispatch({
                type : DELETE_PRODUCTS, 
                payload :json.data
            })
        } catch (error) {
            alert(`Message ${DELETE_PRODUCTS}:` ,error)
        }
    }
}

export const postProducts = (payload) => {
    return async function(dispatch) {
        try {
            const post = await axios.post(`http://localhost:3001/products`, payload)
            return post
        } catch (error) {
            alert(`Message ${POST_PRODUCTS}:` ,error)
        }
    }
}

export const putProducts = (id , payload) => {
    return async function(dispatch){
        try {
            const put = await axios.put(`http://localhost:3001/products/${id}` , payload)
            return dispatch ({
                type: PUT_PRODUCTS,
                payload: put.data
            })
        } catch (error) {
            alert(`Message ${PUT_PRODUCTS}:` ,error)
        }

    }
}

export const postRegisterUser = (payload) => {
    console.log(payload);
    return async function(dispatch) {
        try {
            const post = await axios.post(`http://localhost:3001/users`, payload)
            return post
        } catch (error) {
            alert(`Message ${REGISTER_USER}:` ,error)
        }
    }
}

export const postLoginUser = (payload) => {
    console.log(payload);
    return async function(dispatch) {
        try {
            const post = await axios.post(`http://localhost:3001/users/validate`, payload) 
            console.log(post.data);
            return post.data
           
        } catch (error) {
            alert("" ,error)
        }
    }
}
