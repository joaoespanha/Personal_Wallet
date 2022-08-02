import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, sumAllExpenses } from '../redux/actions/index';
import tableCols from '../helpers/tableCols';

class Table extends Component {
  render() {
    const { expenses, removeExp, updateExpenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {tableCols.map((col) => (<th scope="col" key={ col }>{col}</th>))}
          </tr>
        </thead>

        <tbody>
          {
            expenses
              .map((exp) => (
                <tr key={ `${exp.value} ${exp.description} ${exp.currency}` }>
                  <td>{exp.description}</td>
                  <td>{exp.tag}</td>
                  <td>{exp.method}</td>
                  <td>
                    {parseFloat(exp.value).toFixed(2)}
                  </td>
                  <td>{exp.exchangeRates[exp.currency].name}</td>
                  <td>{Math.round(exp.exchangeRates[exp.currency].ask * 100) / 100}</td>
                  <td>
                    {
                      Math.round(
                        (exp.exchangeRates[exp.currency].ask * exp.value) * 100,
                      ) / 100
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ async () => {
                        await removeExp(exp);
                        updateExpenses();
                      } }
                    >
                      Remove

                    </button>
                  </td>
                </tr>))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispacth) => ({
  removeExp: (expense) => dispacth(removeExpense(expense)),
  updateExpenses: () => dispacth(sumAllExpenses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
