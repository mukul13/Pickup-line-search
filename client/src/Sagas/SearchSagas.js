import { call, put } from 'redux-saga/effects';
import SearchActions from '../Redux/SearchRedux';

export function * onSearchRequest (api, action) {
  console.log(action)
  const resp = yield call(api.search, action.term)
  console.log(resp)
  if (resp.length) {
    yield put(SearchActions.searchListSuccess(resp))
  } else {
    yield put(
      SearchActions.searchListFailure({listError: 'No Results Found!'})
    )
  }
}