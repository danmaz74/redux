import { CALL_API, Schemas } from '../middleware/api';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export function fetchUser(login) {
  return {
    [CALL_API]: {
      types: [FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE],
      endpoint: `users/${login}`,
      schema: Schemas.USER
    }
  };
}

export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  };
}
