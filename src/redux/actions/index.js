import * as actionTypes from './actionTypes';
import fecthCurrencies from '../../helpers/fetchCurrencies';

// Coloque aqui suas actions

export const userLogin = (email) => ({ type: actionTypes.USER_LOGIN, email });

const requestApi = () => ({ type: actionTypes.REQUEST_API });

const sumExpenses = (totalExpenses) => (
  { type: actionTypes.SUM_EXPENSES, totalExpenses });

const receiveData = (payload) => ({ type: actionTypes.RECEIVE_DATA, payload });

export const addExpenseAction = (expense) => ({ type: actionTypes.ADD_EXPENSE, expense });

export function getCurrCodes() {
  return async (dispatch) => {
    dispatch(requestApi());
    const currData = await fecthCurrencies();
    const currenciesCodes = Object.keys(currData);

    const filtredCodes = currenciesCodes.filter((code) => code !== 'USDT');
    dispatch(receiveData(filtredCodes));
    // console.log(actionTypes);
  };
}

export function sumAllExpenses() {
  return (dispatch, getState) => {
    const { wallet: { expenses } } = getState();
    const totalExpenses = expenses
      .reduce(
        (total, curr) => total + (
          parseFloat(curr.value) * curr.exchangeRates[curr.currency].ask), 0,
      ).toFixed(2);
    // console.log(totalExpenses);
    dispatch(sumExpenses(totalExpenses));
  };
}

export function addExpense(expense) {
  return async (dispatch) => {
    dispatch(requestApi());
    const exchangeRates = await fecthCurrencies();
    // const { exchangeRates } = currData;
    const resultExpense = { ...expense, exchangeRates };

    dispatch(addExpenseAction(resultExpense));
  };
}
