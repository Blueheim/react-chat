import * as actions from './auth-actions';

const signUpReducer = (state, action) => {
  switch (action.type) {
    case actions.SIGN_UP_PENDING:
      return { ...state, isLoading: true, error: {} };
    case actions.SIGN_UP_SUCCESS:
      return { ...state, isLoading: false, data: action.payload, error: {} };
    case actions.SIGN_UP_FAILED:
      return { ...state, isLoading: false, error: {} };
    default:
      throw new Error('Unexpected action');
  }
};

export { signUpReducer };
