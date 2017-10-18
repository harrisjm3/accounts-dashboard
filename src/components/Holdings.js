import React, { Component } from 'react';
import _ from 'lodash';
import {formatter} from '../util/DataFormatter';

class Holdings extends Component {

  render() {
    return (
      <div className='div-table'>
        <table className='table table-scroll'>
          <thead>
            <tr>
              <th className='th'>account_id</th>
              <th className='th'>ticker_name</th>
              <th className='th'>ticker</th>
              <th className='th'>price</th>
              <th className='th'>quantity</th>
            </tr>
          </thead>
          <tbody>
            {_.map(this.props.holdingsData, (data, index) =>
              <tr key={index}>
                  <td className='td'>{data.account_id}</td>
                  <td className='td'>{data.ticker_name}</td>
                  <td className='td'>{data.ticker}</td>
                  <td className='td'>{formatter.format(data.price)}</td>
                  <td className='td'>{data.quantity}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Holdings;
