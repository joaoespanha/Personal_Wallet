import * as actionTypes from '../actions/actionTypes';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

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
  case actionTypes.REQUEST_API:
    return {
      ...state,
      loading: true,
    };
  case actionTypes.RECEIVE_DATA:
    return {
      ...state,
      currencies: action.payload,
    };
  case actionTypes.ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      // totalExpenses: state.expenses.reduce((total, curr) => total + curr.value, 0),
    };
  case actionTypes.SUM_EXPENSES:
    return {
      ...state,
      totalExpenses: action.totalExpenses,
    };
  case actionTypes.REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.filtredExpenses,
    };

  default:
    return state;
  }
}
