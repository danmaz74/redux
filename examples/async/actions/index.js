import { CALL_API, Schemas } from '../middleware/api';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export const FETCH_REPOSITORY_REQUEST = 'FETCH_REPOSITORY_REQUEST';
export const FETCH_REPOSITORY_SUCCESS = 'FETCH_REPOSITORY_SUCCESS';
export const FETCH_REPOSITORY_FAILURE = 'FETCH_REPOSITORY_FAILURE';

// This is just one possible way how you can define your async action creators.
// The idea is to establish a single convention so you don't have to duplicate
// the same boilerplate code when talking to your API server.

// See middleware/api.js for an example implementation used in this example.

function existsWithFields(obj, fields) {
  return obj && fields.every(field => obj.hasOwnProperty(field));
}

export function fetchUser(login, requiredFields = []) {
  return {
    [CALL_API]: {
      types: [FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE],
      endpoint: `users/${login}`,
      schema: Schemas.USER,
      bailout: (state) => existsWithFields(
        state.database.users[login],
        requiredFields
      )
    }
  };
}

export function fetchRepository(fullName, requiredFields = []) {
  return {
    [CALL_API]: {
      types: [FETCH_REPOSITORY_REQUEST, FETCH_REPOSITORY_SUCCESS, FETCH_REPOSITORY_FAILURE],
      endpoint: `repos/${fullName}`,
      schema: Schemas.REPOSITORY,
      bailout: (state) => existsWithFields(
        state.database.repositories[fullName],
        requiredFields
      )
    }
  };
}

export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  };
}
