import * as actions from './auth-actions';

const api = {
  [`${actions.SIGN_UP}`]: {
    url: `${process.env.REACT_APP_API_URL}/api/users/`,
  },
  [`${actions.SIGN_IN}`]: {
    url: `${process.env.REACT_APP_API_URL}/api/auth/`,
  },
  [`${actions.GOOGLE_URL}`]: {
    url: `${process.env.REACT_APP_API_URL}/api/auth/google-url`,
  },
  [`${actions.SIGN_IN_GOOGLE}`]: {
    url: `${process.env.REACT_APP_API_URL}/api/auth/google`,
  },
};

export default api;
