import Action from "../actions/action";

export default function reducer(state = [], action) {
  switch (action.type) {
    case Action.LOGIN_DETAILS: {
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("password", action.payload.password);
      return { ...state, authCredentials: action.payload };
    }

    // case Action.SIGNUP_DETAILS: {
    //   localStorage.clear();
    //   return {
    //     ...state,
    //     authCredentials: { fname: null, password: null, email: null }
    //   };
    // }

    case Action.LOGOUT_DETAILS: {
      localStorage.clear();
      return {
        ...state,
        authCredentials: { username: null, password: null, email: null }
      };
    }

    case Action.SAVE_TOKEN: {
      return {
        ...state,
        token: action.payload
      };
    }


    default:
      return state;
  }
}
