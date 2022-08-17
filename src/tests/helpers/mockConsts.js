import mockData from './mockData';


const INVALID_EMAIL = 'AKSFDML@';
const INVALID_PASSWORD = '1A3';

const VALID_PASSWORD = '123456';
export const VALID_EMAIL = 'ola@ola.com'


const coinCodes = Object.keys(mockData).filter((code) => code !== 'USDT');



const defaultExpenses = [
  {
    id: 10,
        description: 'cafezin',
        value: '2',
        currency: 'USD',
        method: 'Cartão de débito',
        tag: 'Trabalho',
        exchangeRates: mockData,
  },
  {
    id: 11,
        description: 'play5',
        value: '500',
        currency: 'USD',
        method: 'Cartão de débito',
        tag: 'Trabalho',
        exchangeRates: mockData,
  }

]



export const initialState = {
    user: {
      email: VALID_EMAIL,
    },
    wallet: {
      currencies: [...coinCodes], 
      expenses: defaultExpenses,
      headerCurrency: 'BRL',
      editor: false, 
      idToEdit: 0, 
      isLoading: false,
      error: '',
    }
  };

 export const newExpense = () => ({
      value: '100',
      currency: 'CAD',
      method: 'Cartão de crédito',
      tag: 'Lazer',
      description: 'PEWDs Merch',
      id: 13,
      exchangeRates:mockData,
})



export const totalExpended = () => {
    const {wallet:{expenses}} = initialState;
    const total =   expenses.reduce(
      (total, {value, currency, exchangeRates:{[currency]:{ask}}}) => total + (value * ask)
      ,0)
    const roundedTotal = Math.round(total * 100) / 100;
    return roundedTotal;
  }
