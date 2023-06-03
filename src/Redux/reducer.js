import { DELETE_PRODUCTS, 
        GET_COMPONENTS, 
        GET_CREATIONS, 
        GET_CREATIONS_BY_ID, 
        GET_CREATIONS_BY_USER, 
        GET_PRODUCTS, 
        LOGIN_SUCCESS, 
        POST_PRODUCTS, 
        PUT_PRODUCTS,
        REGISTER_USER
    } from "./typeAction";

const initialState = {
    Products : [],
    AllProducts : [],
    AllUsers: [],
    allCreations: [],
    yourCreations: [],
    creationDetail: {},
    isAuthenticated: false,
    components: [],
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
            case GET_CREATIONS:
                return {
                    ...state,
                allCreations : [...payload],
                }
            case GET_CREATIONS_BY_ID:
                return{
                    ...state,
                    creationDetail: payload,
                }
            case GET_CREATIONS_BY_USER:
                return {
                    ...state,
                    yourCreations: payload,
                }
                case LOGIN_SUCCESS:
                 return {
                ...state,
                isAuthenticated: true,
                };
            case GET_COMPONENTS:
                return {
                ...state,
                components: [...payload],
                };
        default:
            return {...state}
    }
}

export default rootReducer;