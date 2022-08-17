import { cleanup, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import '@testing-library/jest-dom'
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import Wallet from '../pages/Wallet';
import fecthCurrencies from '../helpers/fetchCurrencies'
import mockData from './helpers/mockData'
import {initialState, totalExpended, VALID_EMAIL, newExpense} from './helpers/mockConsts';


  // console.log(coinCodes);
describe('tests the header component', () => {
    beforeEach(async () =>{
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });

        renderWithRouterAndRedux(<Wallet/>, {initialState})
        // console.log(initialState);
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    });
     afterEach(() => jest.clearAllMocks());

    it('tests if th total expended displayed is correct',  () =>{
        const totalDisplayed =  screen.getByTestId('total-field');
        // console.log(totalDisplayed);
        expect(totalDisplayed).toHaveTextContent(totalExpended());
    });
    it('tests if the rigth email is dispayed', () => {
        const displayedEmail = screen.getByTestId('email-field');
        expect(displayedEmail).toHaveTextContent(VALID_EMAIL);
    });
    it('tests if the headerCurrency is BRL', () => {
        const displayedHC = screen.getByTestId('header-currency-field');
        expect(displayedHC).toHaveTextContent('BRL');
    });
    it('tests if the total value is updated correctly when adding one expense', () => {
        const totalDisplayed =  screen.getByTestId('total-field');
        const valueInput = screen.getByLabelText(/valor/i);
        const currencyInput = screen.getByLabelText(/moeda/i);
        const methodInput = screen.getByLabelText(/metodo de Pagamento/i);
        const tagInput = screen.getByLabelText(/categorias/i);
        const addExpenseBtn = screen.getByRole('button', {name: /adicionar despesa/i})
        const descriptionInput = screen.getByTestId('description-input')

        // console.log(currencyInput);
         const newExpense1 = newExpense();

        userEvent.type(valueInput, newExpense1.value)
        userEvent.selectOptions(currencyInput, newExpense1.currency)
        userEvent.selectOptions(methodInput, newExpense1.method)
        userEvent.selectOptions(tagInput, newExpense1.tag)


        // console.log(typeof valueInput.value);
        expect(valueInput).toHaveValue(newExpense1.value)
        expect(currencyInput).toHaveValue(newExpense1.currency) 
        expect(methodInput).toHaveValue(newExpense1.method) 
        expect(tagInput).toHaveValue(newExpense1.tag) 

        userEvent.click(addExpenseBtn)

        expect(totalDisplayed).toHaveTextContent(totalExpended());
    })
   
});
