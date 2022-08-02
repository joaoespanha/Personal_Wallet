import React, { Component } from 'react';
import tableCols from '../helpers/tableCols';

class Table extends Component {
  render() {
    return (
      <table>
        <tr>
          {tableCols.map((col) => (<th scope="col" key={ col }>{col}</th>))}

          <tr>
            <td>ola</td>
          </tr>
        </tr>
      </table>
    );
  }
}

/* const mapStateToProps = (state) => ({

}); */
export default Table;
