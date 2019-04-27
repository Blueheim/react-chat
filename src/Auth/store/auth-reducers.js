import * as actions from './auth-actions';

const signUpReducer = (state, action) => {
  switch (action.type) {
    case actions.SIGN_UP_PENDING:
      return { ...state, isLoading: true, data: null, error: null };
    case actions.SIGN_UP_SUCCESS:
      return { ...state, isLoading: false, data: action.payload, error: null };
    case actions.SIGN_UP_FAILED:
      return { ...state, isLoading: false, data: null, error: action.payload };
    default:
      throw new Error('Unexpected action');
  }
};

const signInReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actions.SIGN_IN_PENDING:
      return { ...state, isLoading: true, data: null, error: null };
    case actions.SIGN_IN_SUCCESS:
      return { ...state, isLoading: false, data: action.payload, error: null };
    case actions.SIGN_IN_FAILED:
      return { ...state, isLoading: false, data: null, error: action.payload };
    default:
      throw new Error('Unexpected action');
  }
};

export { signInReducer, signUpReducer };
