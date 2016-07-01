const request = require('request');
const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');
const { Button } = require('@holidayextras/ui-toolkit');
var _ = require('lodash');

var CurrencyConverter = React.createClass({
  getInitialState() {
    return {
      rates: {},
      conversion: 'EUR',
      base: 0,
      converted: 0
    };
  },

  getRates() {
    $.getJSON('http://api.fixer.io/latest?base=gbp', (res) => {
      this.setState({
        rates: res.rates
      });
    });
  },

  componentDidMount() {
    this.getRates();
  },

  selectConversion(e) {
    this.setState({ conversion: e.target.value }, () => {
      this.convertCurrency();
    });
  },

  convertCurrency(e) {
    let val = this.state.base;
    if(e && e.target) {
      val = e.target.value;
    } 
    const rate = this.state.rates[this.state.conversion];

    this.setState({
      base: val || '',
      converted: (parseInt(val) || 0) * rate
    });
  },

  render: function() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-md-2">GBP</label>
          <div className="col-md-10">
            <input type='text' label='GBP' onChange={this.convertCurrency} value={this.state.base} />
          </div>
        </div>
        <div className="form-group">
          <select className="col-md-2" onChange={this.selectConversion}>
            <option value="EUR">Euro</option>
            <option value="USD">US Dollar</option>
          </select>
          <div className="col-md-10">
            <input type='text' label={this.state.conversion} onChange={this.convertCurrency} value={this.state.converted} />
          </div>
        </div>
      </form>
    );
  }
});

ReactDOM.render(<CurrencyConverter />, document.getElementById('demo'));

















