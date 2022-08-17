import { cleanup, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import '@testing-library/jest-dom'
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import Wallet from '../pages/Wallet';
import fecthCurrencies from '../helpers/fetchCurrencies'
import mockData from './helpers/mockData'
import {initialState, totalExpended, VALID_EMAIL} from './helpers/mockConsts';


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

    })
   
});
