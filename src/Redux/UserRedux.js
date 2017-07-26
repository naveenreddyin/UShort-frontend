import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  register: ['email', 'password'],
  setRegisterStatus: ['registerUserStatus', 'registerUserMessage'],
  generateToken: ['email', 'password'],
  setToken: ['token'],
  validateToken: ['token']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  password: null,
  fetching: false,
  token: null,
  registerUserStatus: null,
  registerUserMessage: null
})

/* ------------- Reducers ------------- */

export const register = (state: Object, {email, password}: Object) => state.merge({fetching: true})

export const setRegisterStatus = (state: Object, {registerUserStatus, registerUserMessage}: Object) =>
state.merge({fetching: false, registerUserStatus: registerUserStatus, registerUserMessage: registerUserMessage})

export const generateToken = (state: Object, {email, password}: Object) =>
state.merge({fetching: true, email: email, password: password})

export const setToken = (state: Object, {token}: Object) =>
state.merge({token: token, fetching: false})

export const validateToken = (state: Object, {token}: Object) =>
state.merge({token: token, fetching: true})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER]: register,
  [Types.SET_REGISTER_STATUS]: setRegisterStatus,
  [Types.GENERATE_TOKEN]: generateToken,
  [Types.SET_TOKEN]: setToken,
  [Types.VALIDATE_TOKEN]: validateToken
})
