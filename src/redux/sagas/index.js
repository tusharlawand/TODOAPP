import { all } from 'redux-saga/effects';
import mySaga from './mySaga';

export default function* rootSaga() {
  yield all([mySaga()]);
}
