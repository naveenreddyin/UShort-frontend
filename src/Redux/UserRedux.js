import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  testApi: null,
  fetchNewsletters: null,
  setNewsletters: ['newsletters'],
  getNewsletters: null,
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userEmail: null,
  newsletters: null,
  fetching: false,
})

/* ------------- Reducers ------------- */

export const testApi = (state: Object) => state

export const fetchNewsletters = (state: Object) => state.merge({fetching: true})

export const setNewsletters = (state: Object, { newsletters } : Object) => state.merge({ newsletters: newsletters })

export const getNewsletters = (state: Object) => state.merge({ fetching: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TEST_API]: testApi,
  [Types.FETCH_NEWSLETTERS]: fetchNewsletters,
  [Types.SET_NEWSLETTERS] : setNewsletters,
  [Types.GET_NEWSLETTERS] : getNewsletters,
})
