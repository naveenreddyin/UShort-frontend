import { takeLatest, takeEvery } from 'redux-saga'
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
import { testCall, fetchNewsletters } from './UserSagas'
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
console.log(process.env);
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
    console.log("coming inside root saga")
    yield [
        takeEvery(UserTypes.TEST_API, testCall),
        takeEvery(UserTypes.FETCH_NEWSLETTERS, fetchNewsletters, api),
//        takeEvery(AppointmentTypes.FETCH_EVENTS_BY_DOCTOR, fetchEventsByDoctor, api),
//        takeEvery(AppointmentTypes.CHECK_IF_BOOKABLE, checkIfBookable, api)
    ]
}
