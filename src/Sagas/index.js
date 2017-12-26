import { takeLatest, takeEvery } from 'redux-saga/effects'
import API from '../Services/Api'
//import FixtureAPI from '../Services/FixtureApi'
//import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { UserTypes } from '../Redux/UserRedux'
//import { TemperatureTypes } from '../Redux/TemperatureRedux'
//import { LoginTypes } from '../Redux/LoginRedux'
//import { AppointmentTypes } from '../Redux/AppointmentRedux'
//import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
//import { BusinessTypes } from '../Redux/BusinessRedux'
//import { CartTypes } from '../Redux/CartRedux'

/* ------------- Sagas ------------- */
import { fetchAll, createURL, deleteCode} from './UserSagas'
//import { login, register, checkIfEmailExists } from './LoginSagas'
//import { getTemperature } from './TemperatureSagas'
//import { openScreen } from './OpenScreenSagas'
//import { getCity, bookAnAppointmentForDoctor,
//fetchEventsByDoctor, checkIfBookable } from './AppointmentSagas'
//import { getRestaurants } from './BusinessSagas'
//import { getItems } from './CartSagas'


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
    console.log("coming inside root saga")
    yield [
        takeEvery(UserTypes.FETCH_ALL, fetchAll, api),
        takeEvery(UserTypes.CREATE_SHORT, createURL, api),
        takeEvery(UserTypes.DELETE_CODE, deleteCode, api)
    ]
}
