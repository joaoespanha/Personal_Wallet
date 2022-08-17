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
    beforeEach(() => {
        renderWithRouterAndRedux(<Wallet/>, {initialState});
    })
    it('tests', () => {
        screen.getAllByRole('option', {name:/moeda/i})
    })
})