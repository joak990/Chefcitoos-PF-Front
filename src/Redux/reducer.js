import { DELETE_PRODUCTS, 
        GET_PRODUCTS, 
        POST_PRODUCTS, 
        PUT_PRODUCTS,
        REGISTER_USER
    } from "./typeAction";

const initialState = {
    Products : [],
    AllProducts : [],
    AllUsers: []
}

const rootReducer = (state = initialState, {type,payload}) => {
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                Products : [...payload],
                AllProducts : [...payload],
            }
        case DELETE_PRODUCTS:
            const deleteProduct = state.AllProducts.filter((el) => el.AllProducts.id !== payload.id )
            return{
                ...state,
                Products : deleteProduct  
            }
        case POST_PRODUCTS: 
            return {
                ...state
            }
        case PUT_PRODUCTS:
            return {
                ...state,
                Products : [...payload]
            }
            case REGISTER_USER:
             return {
                ...state,
                
                }
        default:
            return {...state}
    }
}

export default rootReducer;