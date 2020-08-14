import { SET_LOADING, SEARCH_USER, GET_USER, CLEAR_SEARCH } from "./../types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SEARCH_USER: {
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    }
    case GET_USER: {
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
    }
    case CLEAR_SEARCH: {
      return {
        ...state,
        users: [],
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
