import { takeLatest, all } from 'redux-saga/effects';
// import DebugConfig from '../Config/DebugConfig'
import api from '../Services/Api';

/* ------------- Types ------------- */

import { SearchTypes } from '../Redux/SearchRedux';

/* ------------- Sagas ------------- */

import { onSearchRequest } from './SearchSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(SearchTypes.SEARCH_LIST_REQUEST, onSearchRequest, api)
  ]);
}
