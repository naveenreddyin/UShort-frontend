import { put, call } from 'redux-saga/effects'

import UserActions from '../Redux/UserRedux'

import { path } from 'ramda'


export function * createURL(api, {URL}){
  console.log(URL)
    const response = yield call(api.createURL, URL)
    console.log(response)
    if(response.status == 201){
          yield put(UserActions.setRegisterStatus(response.status, "URL created."))
          yield put(UserActions.fetchAll())
    }
  if(response.status == 400){
    yield put(UserActions.setRegisterStatus(response.status, "Are you sure you entered right url?"))
  }

}




export function * fetchAll(api){
  const response = yield call(api.fetchAll)
  console.log(response.data)
  if(response.status == 200){
    yield put(UserActions.setRegisterStatus(response.status, "Fetched all."))
    yield put(UserActions.setData(response.data))
  }

  if(response.status == 400){
    yield put(UserActions.setRegisterStatus(response.status, "Something went wrong."))
  }

}

export function * deleteCode(api, {code}){

  const response = yield call(api.deleteURL, code)
  console.log(response)
  if(response.status == 200){
          yield put(UserActions.setRegisterStatus(response.status, "URL deleted."))
          yield put(UserActions.fetchAll())
  }
}
