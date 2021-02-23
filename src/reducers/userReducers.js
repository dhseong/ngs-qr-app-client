const currentUser = (state = {}, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, user: action.user, login: true };
    case "LOG_OUT":
      return { ...state, user: "", login: false };
    default:
      return state;
  }
};

export default currentUser;
