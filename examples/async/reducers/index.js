import { RESET_ERROR_MESSAGE } from '../actions';

/**
 * Updates a single local entity with new data.
 */
function entity(state = {}, fetchedEntity) {
  return Object.assign({}, state, fetchedEntity);
}

/**
 * Updates a local table with fetched data.
 */
function table(state = {}, fetchedTable) {
  if (!fetchedTable) {
    return state;
  }

  let nextState = Object.assign({}, state);
  Object.keys(fetchedTable).forEach(key =>
    nextState[key] = entity(state[key], fetchedTable[key])
  );
  return nextState;
}

const initialState = {
  users: {},
  repositories: {}
};

/**
 * Updates a local database in response to any action containing response.entities.
 */
export function database(state = initialState, action) {
  if (!action.response || !action.response.entities) {
    return state;
  }

  const fetchedTables = action.response.entities;

  let nextState = Object.assign({}, state);
  Object.keys(fetchedTables).forEach(key =>
    nextState[key] = table(state[key], fetchedTables[key])
  );
  return nextState;
}


/**
 * Updates error message to notify about the failed fetches.
 */
export function errorMessage(state = null, action) {
  if (action.type === RESET_ERROR_MESSAGE) {
    return null;
  } else if (action.error) {
    return action.error;
  }

  return state;
}