import React, { Component } from 'react';
import _ from 'lodash';
import {formatter} from '../util/DataFormatter';


class Accounts extends Component {

  constructor(props) {
    super(props);
    this.state = {total: 0};

    this._getTotal = this._getTotal.bind(this);
    this._buildAcctData = this._buildAcctData.bind(this);
    this._getPercTotal = this._getPercTotal.bind(this);
    this._getTotal = this._getTotal.bind(this);
    this._getSumByType = this._getSumByType.bind(this);
  }

  componentDidMount() {
    this._getTotal();
  }

  _buildAcctData(accountsData) {
    let retval = [];
    let accountTypes = [];
    for(let obj in accountsData) {
      accountTypes.push(accountsData[obj].type);
    }
    accountTypes = Array.from(new Set(accountTypes));

    for(let type in accountTypes) {
      let sum = this._getSumByType(accountTypes[type]);
      retval.push({ 'type': accountTypes[type], 'percentTotal': this._getPercTotal(sum),
      'sum':  sum});
    }
    return retval;
  }

  _getPercTotal(sum) {
    let retval = 0;
    retval = sum/this.state.total;
    return retval.toFixed(2);
  }

  _getSumByType(accountType) {
    let retval = 0;
    let accountIds = [];

    for(let account in this.props.accountsData) {
      if(accountType === this.props.accountsData[account].type) {
        accountIds.push(this.props.accountsData[account].id);
      }
    }
    for(let hold in this.props.holdingsData) {
      let obj = this.props.holdingsData[hold];
      if(accountIds.indexOf(obj.account_id) !== -1) {
        retval += obj.price * obj.quantity;
      }
    }

    return retval.toFixed(2);
  }

  _getTotal() {
    let totalVal = 0;
    for(let hold in this.props.holdingsData) {
      let obj = this.props.holdingsData[hold];
      totalVal += obj.price * obj.quantity;
    }
    this.setState({total: totalVal.toFixed(2)});
  }

  render() {
    let acctTypeByValue = this._buildAcctData(this.props.accountsData);

    return (
      <div className='div-table div-table--accounts'>
        <table className='table'>
          <thead>
            <tr>
              <th className='th'>type</th>
              <th className='th'>sum</th>
              <th className='th'>percent of total</th>
            </tr>
          </thead>
          <tbody>
            {_.map(acctTypeByValue, (data, index) =>
              <tr key={index}>
                  <td className='td'>{data.type}</td>
                  <td className='td'>{formatter.format(data.sum)}</td>
                  <td className='td'>{data.percentTotal*100}%</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

}

export default Accounts;
