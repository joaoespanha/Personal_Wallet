// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const REQUEST_API = 'REQUEST_API';
const RECEIVE_DATA = 'RECEIVE_DATA';
const ADD_EXPENSE = 'ADD_EXPENSE';
const SUM_EXPENSES = 'SUM_EXPENSES';

const INITIAL_STATE = {

  currencies: [],
  expenses: [],
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
      currencies: action.payload,
    };
  case ADD_EXPENSE:

    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      // totalExpenses: state.expenses.reduce((total, curr) => total + curr.value, 0),
    };
  case SUM_EXPENSES:
    return {
      ...state,
      totalExpenses: action.totalExpenses,
    };

  default:
    return state;
  }
}
