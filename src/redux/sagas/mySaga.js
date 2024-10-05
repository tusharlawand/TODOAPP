import { call, put, takeLatest, all } from 'redux-saga/effects';
import { fetchData } from '../../api/api';
import {
  FETCH_DATA_REQUEST,
  fetchDataSuccess,
  fetchDataFailure,
} from '../actions/myActions';

// Cache to avoid unnecessary calls
const cache = new Map();

function* fetchDataSaga() {
  // Check if the data is already cached
  if (cache.has('todos')) {
    yield put(fetchDataSuccess(cache.get('todos')));
    return;
  }

  try {
    const data = yield call(fetchData);
    cache.set('todos', data); // Cache the result
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export default function* mySaga() {
  yield all([
    takeLatest(FETCH_DATA_REQUEST, fetchDataSaga),
  ]);
}
