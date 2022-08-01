import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { getCurrCodes } from '../redux/actions/index';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // list: [],
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
