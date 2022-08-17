import { cleanup, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import '@testing-library/jest-dom'
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import App from '../App'


const INVALID_EMAIL = 'AKSFDML@';
const INVALID_PASSWORD = '1A3';

const VALID_PASSWORD = '123456';
const VALID_EMAIL = 'ola@ola.com'


const initialState = {
    user: {
      email: '',
    },
    wallet: {
      currencies: [], // array de string
      expenses: [],
      editor: false, // valor booleano que indica de uma despesa está sendo editada
      idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
      isLoading: false,
      error: '',
    }
  };


const getEmailInput = () => screen.getByRole('textbox', {name:/email/i})
const getPasswordInput = () => screen.getByRole('textbox', {name:/password/i})
const getLoginBtn = () => screen.getByRole('button', {name:/entrar/i})

describe('testing Login page', () => {
    describe('testing text inputs', () => {
        beforeEach(() => {
            renderWithRouterAndRedux(<App/>, {initialState} )
        })
        it('tests if it is possible to type in the email input', () => {
            const emailInput = getEmailInput();
            userEvent.type(emailInput, 'kdalk');
            expect(emailInput.value).toMatch('kdalk');
        });

        it('tests if it is possible to type in the password input', () => {
            const passwordInput = getPasswordInput();
            userEvent.type(passwordInput, 'kdalk');
            expect(passwordInput.value).toMatch('kdalk');
        });
    })
    describe('testing btn validation', () => {
        beforeEach(() => {
            renderWithRouterAndRedux(<App/>, {initialState} )
            
        });

        it('tests if the btn is disabled if the email input is invalid but the password Input is valid', () =>{
            const emailInput = getEmailInput();
            const passwordInput = getPasswordInput();
            const loginBtn = getLoginBtn();

           userEvent.type(emailInput, INVALID_EMAIL );
           userEvent.type(passwordInput, VALID_PASSWORD );

            expect(loginBtn).toBeDisabled();
        });
        it('tests if the btn is disabled if the password input is invalid but the email Input is valid', () =>{
            const emailInput = getEmailInput();
            const passwordInput = getPasswordInput();
            const loginBtn = getLoginBtn();

           userEvent.type(emailInput, VALID_EMAIL );
           userEvent.type(passwordInput, INVALID_PASSWORD );

            expect(loginBtn).toBeDisabled();
        });
        it('tests if the btn is enabled if the password input and the email Input are valid', () =>{
            const emailInput = getEmailInput();
            const passwordInput = getPasswordInput();
            const loginBtn = getLoginBtn();

           userEvent.type(emailInput, VALID_EMAIL );
           userEvent.type(passwordInput, VALID_PASSWORD );
        
            expect(loginBtn).toBeEnabled();
        })
    })
    describe('tests if the user is redirected to the wallet page', () => {
        it('tests th pathname after clcicking the login btn', async () => {
            const {history} = renderWithRouterAndRedux(<App/>, {initialState});
            
            const emailInput = getEmailInput();
            const passwordInput = getPasswordInput();
            const loginBtn = getLoginBtn();

           userEvent.type(emailInput, VALID_EMAIL );
           userEvent.type(passwordInput, VALID_PASSWORD );
           userEvent.click(loginBtn);

           await waitFor(() => {
            expect(history.location.pathname).toBe('/carteira')

           });
        });
    })

})