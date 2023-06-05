import { DELETE_PRODUCTS, 
        GET_COMPONENTS, 
        GET_CREATIONS, 
        GET_CREATIONS_BY_ID, 
        GET_CREATIONS_BY_USER, 
        GET_CREATION_FILTERS, 
        GET_PRODUCTS, 
        LOGIN_SUCCESS, 
        POST_PRODUCTS, 
        PUT_PRODUCTS,
        REGISTER_USER,
        GET_CREATION_FILTERS_PRICE,
        GET_PUBLICATION_FILTERS,
        GET_PUBLICATION_FILTERS_PRICE,
        CLEAN_DETAIL,
        GET_CREATION_BY_NAME,
        GET_PUBLICATION_BY_NAME
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
    yourCreationsprice: []
    
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
                    allCreations :payload,
                   
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
            case GET_CREATION_FILTERS:
                
                return {
                    ...state,
                    yourCreations: payload,
                    yourCreationsprice: payload
                }
            
                case GET_CREATION_FILTERS_PRICE:
                    let sorteCreation2 = payload === "desc" ? 
                    state.yourCreations.sort(function (a,b) {
                        if(a.price > b.price) {
                            return 1;
                        }
                        if (b.price > a.price) {
                            return -1;
                        }
                        return 0
                    }) : 
                    state.yourCreations.sort(function (a,b) {
                        if(a.price > b.price) {
                            return -1;
                        }
                        if (b.price > a.price) {
                            return 1;
                        }
                        return 0
                    })
                    return {
                      ...state,
                      yourCreations: [...sorteCreation2],
                    };
                    
            case GET_PUBLICATION_FILTERS:
                return {
                    ...state,
                    allCreations: payload
                    
                }
            case GET_PUBLICATION_FILTERS_PRICE:
                let sortePubli = payload === "desc" ? 
                state.allCreations.sort(function (a,b) {
                    if(a.price > b.price) {
                        return 1;
                    }
                    if (b.price > a.price) {
                        return -1;
                    }
                    return 0
                }) : 
                state.allCreations.sort(function (a,b) {
                    if(a.price > b.price) {
                        return -1;
                    }
                    if (b.price > a.price) {
                        return 1;
                    }
                    return 0
                })
                return {
                    ...state,
                    allCreations:[...sortePubli]
                }
                case CLEAN_DETAIL:
                    return{
                      ...state,
                      creationDetail: {}
          
                    };
                case GET_CREATION_BY_NAME:
                    return{
                        ...state,
                        yourCreations: payload,
                    }

                    case GET_PUBLICATION_BY_NAME:
                        return{
                            ...state,
                            allCreations: payload,
                        }

                   
        default:
            return {...state}
    }
}

export default rootReducer;