import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fecthCurrencies } from '../redux/actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // list: [],
    };
  }

  componentDidMount() {
    const { fecthCurr } = this.props;
    fecthCurr();
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
  fecthCurr: () => dispatch(fecthCurrencies()),
});

Wallet.propTypes = {
  fecthCurr: PropTypes.func,
}.isRequired;
export default connect(null, mapDispatchToProps)(Wallet);
