import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, sumAllExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionInput: '',
      tagsInput: '',
      valueInput: '',
      methodInput: 'Cartão de débito',
      currencyInput: 'BTC',

      // mover states abaixo para o estado do redux no reducer wallet
      acceptedMethods: ['Cartão de crédito', 'Cartão de débito', 'Dinheiro'],
      tags: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    };
  }

  componentDidMount() {
    const { sumExp } = this.props;
    sumExp();
  }

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  resetInputs = () => {
    this.setState({
      descriptionInput: '',
      valueInput: '',
    });
  }

  onClick = async () => {
    const { addExp, expenses, sumExp } = this.props;
    const { tagsInput,
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput } = this.state;

    const newExpense = {
      value: valueInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagsInput,
      description: descriptionInput,
      id: expenses.length,

    };

    await addExp(newExpense);
    sumExp();

    this.resetInputs();
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
          <button
            onClick={ this.onClick }
            type="button"
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExp: (expense) => dispatch(addExpense(expense)),
  sumExp: () => dispatch(sumAllExpenses()),

});

WalletForm.propTypes = {
  currencies: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
