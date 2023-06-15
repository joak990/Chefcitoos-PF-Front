import { calculateAmounts, updateLocalStorage } from "../helpers";
import {
  DELETE_PRODUCTS,
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
  GET_PUBLICATION_BY_NAME,
  NUM_PAGE_CREATION,
  NUM_PAGE_PUBLICATION,
  CLEAN_YOUR_CREATIONS,
  CLEAN_PUBLICATIONS,
  GET_ALL_COMMENTS,
  PUT_PRODUCTS_BY_ID,
  GET_ALL_USERS,
  GET_COMMENTS,
  DELETE_CREATION,
  UPDATE_CREATION,
  GET_CREATIONS_SELECTED,
  ADD_CREATION,
  UPDATE_CREATION_QUANTITY,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT_QUANTITY,
  SET_SHOPPING_CART,
  CLEAN_SHOPPING_CART,
  DELETE_COMMENT,
  ORDER_DETAIL,
  SET_USER,
  GET_RECENT_ORDERS,
  GET_COMPONENTS_CATEG_PRODUCTS,
  GET_FAV_CREATIONS,
  GET_FAV_BY_USER,
  GET_USER,
} from "./typeAction";

const initialState = {
  Products: [],
  AllProducts: [],
  AllUsers: [],
  allCreations: [],
  yourCreations: [],
  creationDetail: {},
  isAuthenticated: false,
  components: [],
  yourCreationsprice: [],
  AllComments: [],
  numPageCreations: 1,
  numPagePublications: 1,
  Comments: [],
  shoppingCart: {
    creations: [],
    products: [],
    quantity: 0,
    amounts: {
      subtotal: 0,
      iva: 0,
      total: 0,
    },
  },
  orderDetail: {},
  user: {},
  recentorders:[],
  componentsCategProducts:[],
  favCreations : [],
  favCreationsByUser : [],
  userbyid: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        Products: [...payload],
        AllProducts: [...payload],
      };
    case DELETE_PRODUCTS:
      const deleteProduct = state.AllProducts.filter(
        (el) => el.AllProducts.id !== payload.id
      );
      return {
        ...state,
        Products: deleteProduct,
      };
    case POST_PRODUCTS:
      return {
        ...state,
      };
    case PUT_PRODUCTS:
      return {
        ...state,
        Products: [...payload],
      };
    case REGISTER_USER:
      return {
        ...state,
      };
    case GET_CREATIONS:
      return {
        ...state,
        allCreations: payload,
      };
    case GET_CREATIONS_BY_ID:
      return {
        ...state,
        creationDetail: payload,
      };
    case GET_CREATIONS_BY_USER:
      return {
        ...state,
        yourCreations: payload,
      };
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
        yourCreationsprice: payload,
      };

    case GET_CREATION_FILTERS_PRICE:
      let sorteCreation2 =
        payload === "desc"
          ? state.yourCreations.sort(function (a, b) {
              if (a.price > b.price) {
                return 1;
              }
              if (b.price > a.price) {
                return -1;
              }
              return 0;
            })
          : state.yourCreations.sort(function (a, b) {
              if (a.price > b.price) {
                return -1;
              }
              if (b.price > a.price) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        yourCreations: [...sorteCreation2],
      };

    case GET_PUBLICATION_FILTERS:
      return {
        ...state,
        allCreations: payload,
      };
    case GET_PUBLICATION_FILTERS_PRICE:
      let sortePubli =
        payload === "desc"
          ? state.allCreations.sort(function (a, b) {
              if (a.price > b.price) {
                return 1;
              }
              if (b.price > a.price) {
                return -1;
              }
              return 0;
            })
          : state.allCreations.sort(function (a, b) {
              if (a.price > b.price) {
                return -1;
              }
              if (b.price > a.price) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allCreations: [...sortePubli],
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        creationDetail: {},
      };
    case GET_CREATION_BY_NAME:
      return {
        ...state,
        yourCreations: payload,
      };

    case GET_PUBLICATION_BY_NAME:
      return {
        ...state,
        allCreations: payload,
      };
    case NUM_PAGE_CREATION:
      return {
        ...state,
        numPageCreations: payload,
      };

    case CLEAN_YOUR_CREATIONS:
      return {
        ...state,
        yourCreations: [],
      };

    case CLEAN_PUBLICATIONS:
      return {
        ...state,
        allCreations: [],
      };
    case NUM_PAGE_PUBLICATION:
      return {
        ...state,
        numPagePublications: payload,
      };
    case GET_ALL_COMMENTS:
      return {
        ...state,
        AllComments: payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        AllUsers: payload,
      };
    case GET_COMMENTS:
      return {
        ...state,
        Comments: payload,
      };

    case ADD_CREATION:
      const quantity = state.shoppingCart.quantity + payload.quantity;
      const shoppingCart = {
        ...state.shoppingCart,
        creations: [...state.shoppingCart.creations, payload],
        quantity,
      };
      shoppingCart.amounts = calculateAmounts(shoppingCart);
      updateLocalStorage(shoppingCart);

      return {
        ...state,
        shoppingCart,
      };

    case DELETE_CREATION:
      const creationsUpdate = state.shoppingCart.creations.filter(
        (creation, index) => index !== payload.index
      );
      const quantityUpdate =
        creationsUpdate.reduce((prev, cur) => prev + cur.quantity, 0) +
        state.shoppingCart.products.reduce(
          (prev, cur) => prev + cur.quantity,
          0
        );
      const shoppingCartDelete = {
        ...state.shoppingCart,
        creations: [...creationsUpdate],
        quantity: quantityUpdate,
      };
      shoppingCartDelete.amounts = calculateAmounts(shoppingCartDelete);
      updateLocalStorage(shoppingCartDelete);

      return {
        ...state,
        shoppingCart: shoppingCartDelete,
      };
    case UPDATE_CREATION_QUANTITY:
      const temporal = [...state.shoppingCart.creations];
      temporal[payload.index].quantity =
        temporal[payload.index].quantity + payload.quantity;
      const shoppingCartUpdate = {
        ...state.shoppingCart,
        creations: [...temporal],
        quantity: state.shoppingCart.quantity + payload.quantity,
      };
      shoppingCartUpdate.amounts = calculateAmounts(shoppingCartUpdate);
      updateLocalStorage(shoppingCartUpdate);

      return {
        ...state,
        shoppingCart: shoppingCartUpdate,
      };

    case ADD_PRODUCT:
      const quantityProducts = state.shoppingCart.quantity + payload.quantity;
      const shoppingCartProducts = {
        ...state.shoppingCart,
        products: [...state.shoppingCart.products, payload],
        quantity: quantityProducts,
      };
      shoppingCartProducts.amounts = calculateAmounts(shoppingCartProducts);
      updateLocalStorage(shoppingCartProducts);

      return {
        ...state,
        shoppingCart: shoppingCartProducts,
      };

    case DELETE_PRODUCT:
      const productsUpdate = state.shoppingCart.products.filter(
        (product, index) => index !== payload.index
      );
      const quantityProductsUpdate =
        productsUpdate.reduce((prev, cur) => prev + cur.quantity, 0) +
        state.shoppingCart.creations.reduce(
          (prev, cur) => prev + cur.quantity,
          0
        );
      const shoppingCartProductsDelete = {
        ...state.shoppingCart,
        products: [...productsUpdate],
        quantity: quantityProductsUpdate,
      };
      shoppingCartProductsDelete.amounts = calculateAmounts(
        shoppingCartProductsDelete
      );
      updateLocalStorage(shoppingCartProductsDelete);

      return {
        ...state,
        shoppingCart: shoppingCartProductsDelete,
      };
    case UPDATE_PRODUCT_QUANTITY:
      const temporalProducts = [...state.shoppingCart.products];
      temporalProducts[payload.index].quantity =
        temporalProducts[payload.index].quantity + payload.quantity;
      const shoppingCartProductsUpdate = {
        ...state.shoppingCart,
        products: [...temporalProducts],
        quantity: state.shoppingCart.quantity + payload.quantity,
      };
      shoppingCartProductsUpdate.amounts = calculateAmounts(
        shoppingCartProductsUpdate
      );
      updateLocalStorage(shoppingCartProductsUpdate);

      return {
        ...state,
        shoppingCart: shoppingCartProductsUpdate,
      };
    case SET_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: payload,
      };
    case CLEAN_SHOPPING_CART:
      localStorage.removeItem("shoppingCart");
      return {
        ...state,
        shoppingCart: { ...initialState.shoppingCart },
      };

    case DELETE_COMMENT:
      const updatedComments = state.Comments.filter(
        (comment) => comment.creation_id !== payload
      );
      console.log("aaaa", updatedComments);
      return {
        ...state,
        Comments: updatedComments,
      };
    case ORDER_DETAIL:
      return {
        ...state,
        orderDetail: payload,
      };
    case SET_USER:
      return {
        ...state,
        user: JSON.parse(localStorage.getItem("userLogin")),
      };
      case GET_RECENT_ORDERS:
      return {
        ...state,
        recentorders: [...payload]
       
      };
      case GET_COMPONENTS_CATEG_PRODUCTS:
      return {
        ...state,
        componentsCategProducts: payload,
      };
      case GET_FAV_CREATIONS:
        return {
          ...state,
          favCreations: [...payload],
        };
        case GET_FAV_BY_USER:
          return {
            ...state,
            favCreationsByUser: [...payload],
          };
      case GET_USER:
        return {
          ...state,
          userbyid: payload,
        };
    default:
      return { ...state };
  }
};

export default rootReducer;
