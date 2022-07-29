import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionInput: '',
      tagsInput: '',
      valueInput: '',
      methodInput: '',
      currencyInput: '',

      // mover states abaixo para o estado do redux no reducer wallet
      acceptedMethods: ['Cartão de crédito', 'Cartão de débito', 'Dinheiro'],
      tags: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    };
  }

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies } = this.props;
    const { acceptedMethods,
      tags,
      tagsInput,
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="valueInput">
            Valor:
            <input
              onChange={ this.handleInputChange }
              value={ valueInput }
              name="valueInput"
              data-testid="value-input"
              id="valueInput"
            />
          </label>
          <label htmlFor="currencyInput">
            Moeda:
            <select
              id="currencyInput"
              value={ currencyInput }
              data-testid="currency-input"
              onChange={ this.handleInputChange }
              name="currencyInput"

            >

              {
                currencies
                  // .filter((code) => code !== 'USDT')
                  .map((code) => (
                    <option
                      key={ code }
                      value={ code }
                    >
                      {code}
                    </option>))
              }
            </select>
          </label>
          <label htmlFor="methodInput">
            Metodo de Pagamento:
            <select
              name="methodInput"
              data-testid="method-input"
              value={ methodInput }
              onChange={ this.handleInputChange }
              id="methodInput"
            >

              {
                acceptedMethods
                  .map((method) => (
                    <option
                      key={ method }
                      value={ method }
                    >
                      {method}

                    </option>))
              }
            </select>
          </label>
          <label htmlFor="tagsInput">
            Categorias:
            <select
              name="tagsInput"
              value={ tagsInput }
              data-testid="tag-input"
              onChange={ this.handleInputChange }
              id="tagsInput"
            >

              {
                tags.map((tag) => (
                  <option
                    key={ tag }
                    value={ tag }
                  >
                    {tag}
                  </option>))
              }
            </select>
            <label htmlFor="descriptionInput">
              Descricao:
              <input
                name="descriptionInput"
                value={ descriptionInput }
                onChange={ this.handleInputChange }
                data-testid="description-input"
                id="descriptionInput"
              />
            </label>
          </label>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps)(WalletForm);
