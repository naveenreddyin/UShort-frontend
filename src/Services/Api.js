// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
var baseAPIURL = '';
// console.log(process.env)
if(process.env.NODE_ENV === 'production'){
  baseAPIURL = 'http://localhost:8080/api';

}
else if (process.env.NODE_ENV === 'development') {
  baseAPIURL = 'http://localhost:8080/api';

}

// hardcoding backend url, not a good idea, but would do for a prototype
const create = (baseURL = baseAPIURL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
    },
    // 10 second timeout...
    timeout: 10000
  })

  // Force OpenWeather API Key on all requests
  api.addRequestTransform((request) => {
    // request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
//  if (__DEV__ && console.tron) {
//    api.addMonitor(console.tron.apisauce)
//  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
 


const generateToken = (email) => api.get('generate/'+email)

const validateToken = (token) => api.get('validate/'+token)

const createURL = (URL) => api.post('shorten/?url='+URL, {})

  const fetchAll = () => api.get('fetchAllShortened/', {})
  const deleteURL = (code) => api.delete('delete/'+code, {})
//
//  const checkIfBookingIsPossibleByTime = (date, time) => api.get('book_appointment_for_customer/'+date+" "+time)
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    // getCity
//    checkIfEmailExists,
//    createCustomer,
//    loginAndGetToken,
//    getCustomerDetails,
//    getAllRestaurants,
    fetchAll,
generateToken,
validateToken,
createURL,
deleteURL
  }
}

// let's return back our create method as the default.
export default {
  create
}
