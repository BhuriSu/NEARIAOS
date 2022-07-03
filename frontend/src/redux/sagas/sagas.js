import {
  call, put, takeLatest, delay,
} from 'redux-saga/effects';
import { LogIn, error, clearError } from '../action';
import { fetchLogin, fetchRegister } from './utils';
import { REQUEST_FETCH_LOGIN, REQUEST_FETCH_REGISTER } from '../action-types';

function* fetchSagaAsyncLogin({ email, password }) {
  try {
    const user = yield call(fetchLogin, email, password);
    const { id, nickname, profileId } = user;
    if (user.success) {
      if (profileId) {
        yield put(LogIn(id, nickname, profileId));
      } else {
        yield put(LogIn(id, nickname));
      }
    } else {
      yield put(error(user.err));
      yield delay(2000);
      yield put(clearError());
    }
  } catch (e) {
    yield put(error('Something went wrong'));
    yield delay(2000);
    yield put(clearError());
  }
}
function* fetchSagaAsyncRegister({ nickname, email, password }) {
  try {
    const user = yield call(fetchRegister, nickname, email, password);
    const { id } = user;
    if (user.success) {
      yield put(LogIn(id, nickname));
    } else {
      yield put(error(user.err));
      yield delay(2000);
      yield put(clearError());
    }
  } catch (e) {
    yield put(error('Something went wrong'));
    yield delay(2000);
    yield put(clearError());
  }
}

export default function* actionWatcher() {
  yield takeLatest(REQUEST_FETCH_LOGIN, fetchSagaAsyncLogin);
  yield takeLatest(REQUEST_FETCH_REGISTER, fetchSagaAsyncRegister);
}
