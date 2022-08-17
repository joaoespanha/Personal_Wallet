import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: '',
      isBtnEnabled: false,
    };
  }

  emailValidation = (email) => {
    const validation = email.includes('@' && '.com');
    return validation;
  }

  passwordValidation = (password) => {
    const MINIMUM_CHAR = 6;
    const validation = password.length >= MINIMUM_CHAR;

    return validation;
  }

  checkInputs = (email, password) => {
    const emailInput = this.emailValidation(email);
    const passwordInput = this.passwordValidation(password);
    const checks = [emailInput, passwordInput];
    // console.log(checks);
    this.setState({ isBtnEnabled: checks.every((check) => check === true) });
  }

  handelInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { emailInput, passwordInput } = this.state;
      this.checkInputs(emailInput, passwordInput);
    });
  }

  handleLogin = () => {
    const { saveInfo, history } = this.props;
    const { emailInput } = this.state;
    saveInfo(emailInput);
    history.push('/carteira');
  }

  render() {
    const { emailInput, passwordInput, isBtnEnabled } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="emailInput">
            Email:
            <input
              value={ emailInput }
              onChange={ this.handelInputChange }
              data-testid="email-input"
              id="emailInput"
              name="emailInput"
            />
          </label>
          <label htmlFor="passwordInput">
            Password:
            <input
              value={ passwordInput }
              onChange={ this.handelInputChange }
              data-testid="password-input"
              id="passwordInput"
              name="passwordInput"
            />
          </label>
          <button
            onClick={ this.handleLogin }
            disabled={ !isBtnEnabled }
            type="button"
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveInfo: (value) => dispatch(userLogin(value)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  saveInfo: PropTypes.func,
}.isRequires;

export default connect(null, mapDispatchToProps)(Login);
