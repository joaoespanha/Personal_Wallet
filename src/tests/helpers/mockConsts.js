import mockData from './mockData';

const coinCodes = Object.keys(mockData).filter((code) => code !== 'USDT');

export const initialState = {
    user: {
      email: '',
    },
    wallet: {
      currencies: [...coinCodes], // array de string
      expenses: [],
      editor: false, // valor booleano que indica de uma despesa está sendo editada
      idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
      isLoading: false,
      error: '',
    }
  };
