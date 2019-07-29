import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    searchListRequest: ['term'],
    searchListSuccess: ['listData'],
    searchListFailure: ['listError'],

});

export const SearchTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  listData: [],
  listFetching: null,
  listError: null,
});

/* ------------- Reducers ------------- */

export const listRequest = (state) =>
  state.merge({ listFetching: true, listError: null })

export const listSuccess = (state, { listData }) =>
  state.merge({ listFetching: false, listData })

export const listFailure = (state, { listError }) => {
  return state.merge({ listFetching: false, listError })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_LIST_REQUEST]: listRequest,
  [Types.SEARCH_LIST_SUCCESS]: listSuccess,
  [Types.SEARCH_LIST_FAILURE]: listFailure

});
