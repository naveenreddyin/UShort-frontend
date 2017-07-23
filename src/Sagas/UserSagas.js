import { put, call } from 'redux-saga/effects'

import UserActions from '../Redux/UserRedux'

import { path } from 'ramda'


export function * testCall(api){
    const response = yield call(api.testApi)
    console.log(response)
}


export function * fetchNewsletters(api){

console.log("coming inside fetchnewsletters")
console.log()
const response = yield call(api.fetchNewsletters)
console.log(response)
const data = path(['data'], response)
yield put(UserActions.setNewsletters(data))
yield put(UserActions.getNewsletters())

}
