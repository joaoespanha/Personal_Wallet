// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const FAILED_REQUEST = 'FAILED_REQUEST';
const REQUEST_API = 'REQUEST_API';
const RECEIVE_DATA = 'RECEIVE_DATA';

const INITIAL_STATE = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
  totalExpenses: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  headerCurrency: 'BRL',

};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      loading: true,
    };
  case RECEIVE_DATA:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((curr) => curr !== 'USDT'),
    };
  case FAILED_REQUEST:
    return {
      ...state,
      lastError: action.error,
    };
  default:
    return state;
  }
}
