import { cleanup, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import '@testing-library/jest-dom'
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import Wallet from '../pages/Wallet';
import fecthCurrencies from '../helpers/fetchCurrencies'
import mockData from './helpers/mockData'
import {initialState} from './helpers/mockConsts';



  // console.log(coinCodes);
describe('tests the Wallet page', () => {
  beforeEach(async () =>{
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet/>, {initialState})
    // console.log(initialState);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
});
 afterEach(() => jest.clearAllMocks());  
  it('tests if it it is possible to remove an expense', () => {
    const removeExpBtn = screen.getAllByRole('button', { name: /remove/i });

    userEvent.click(removeExpBtn[0])

    console.log(initialState.wallet.expenses);

    })
})