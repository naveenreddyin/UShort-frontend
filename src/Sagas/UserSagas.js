import { put, call } from 'redux-saga/effects'

import UserActions from '../Redux/UserRedux'

import { path } from 'ramda'


export function * register(api, {email, password}){
    const response = yield call(api.register, email, password)
    if(response.status == 409)
    yield put(UserActions.setRegisterStatus(response.status, "User already present."))
    if(response.status == 201)
    yield put(UserActions.setRegisterStatus(response.status, "User created."))


}


export function * generateToken(api, {email, password}){

const response = yield call(api.generateToken, email)
// console.log(response.data)

  if(response.status == 200){
    yield put(UserActions.setRegisterStatus(response.status, "Please check your email to verify token."))
    yield put(UserActions.setToken(response.data.code))
  }

  if(response.status == 409){
    yield put(UserActions.setRegisterStatus(response.status, "You already have a token present, check your email."))
    yield put(UserActions.setToken(response.data))
  }

  if(response.status == 404){
    yield put(UserActions.setRegisterStatus(response.status, "Are you sure you are a registered user?"))
  }

}

export function * validateToken(api, {token}){
  const response = yield call(api.validateToken, token)
  // console.log(response.data)
  if(response.status == 200){
    yield put(UserActions.setRegisterStatus(response.status, "Token verified...logging you in."))
  }

  if(response.status == 400){
    yield put(UserActions.setRegisterStatus(response.status, "Token invalid."))
  }

}
