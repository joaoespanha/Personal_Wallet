// Coloque aqui suas actions
const END_POINT = 'https://economia.awesomeapi.com.br/json/all';
const USER_LOGIN = 'USER_LOGIN';
const FAILED_REQUEST = 'FAILED_REQUEST';
const REQUEST_API = 'REQUEST_API';
const RECEIVE_DATA = 'RECEIVE_DATA';

const userLogin = (email) => ({ type: USER_LOGIN, email });

const requestApi = () => ({ type: REQUEST_API });
const receiveData = (currencies) => ({ type: RECEIVE_DATA, currencies });

const failedRequest = (error) => ({ type: FAILED_REQUEST, error });

export function fecthCurrencies() {
  return async (dispatch) => {
    dispatch(requestApi());
    try {
      const fecthData = await fetch(END_POINT);
      const currenciesInfo = await fecthData.json();

      dispatch(receiveData(currenciesInfo));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export default userLogin;
