import { Route } from 'react-router-dom';
import React from 'react';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

export const loginRoute = (...newProps) => (<Route
  path="/"
  exact
  render={ (props) => (<Login { ...props } { ...newProps } />) }
/>);

export const walletRoute = (...newProps) => (<Route
  path="/wallet"
  render={ (props) => (<Wallet { ...props } { ...newProps } />) }
/>);
