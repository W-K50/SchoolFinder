import * as ActionType from "./Auth_Actions";

const initialState = {
  users: [],
  SchoolProfile: [],
};

const Auth_Reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ActionType.AUTH_STATE:
      return {
        ...state,
        users: actions.payload.user,
      };

    case ActionType.SCHOOL_PROFILE:
      return {
        ...state,
        SchoolProfile: actions.payload.schPro,
      };

    default:
      return state;
  }
};

export default Auth_Reducer;
