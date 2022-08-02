import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// First commit

class Header extends Component {
  render() {
    const { email, totalExpenses, headerCurrency } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{email}</h3>
        <h3 data-testid="total-field">{ totalExpenses || 0}</h3>
        <h3 data-testid="header-currency-field">{headerCurrency}</h3>

      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  email: store.user.email,
  totalExpenses: store.wallet.totalExpenses,
  headerCurrency: store.wallet.headerCurrency,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
