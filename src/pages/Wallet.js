import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { getCurrCodes } from '../redux/actions/index';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { getCodes } = this.props;
    getCodes();
  }

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getCodes: () => dispatch(getCurrCodes()),
});

Wallet.propTypes = {
  fecthCurr: PropTypes.func,
}.isRequired;
export default connect(null, mapDispatchToProps)(Wallet);
