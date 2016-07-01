const request = require('request');
const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');
const { Input } = require('react-bootstrap');
const { Button } = require('@holidayextras/ui-toolkit');
var _ = require('lodash');

var CurrencyConverter = React.createClass({
  getInitialState() {
    return {
      rates: {},
      conversion: 'EUR',
      base: 1,
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

  selectConversion(conversion) {
    this.setState({ conversion });
    this.convertCurrency();
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
    console.log(this.state);

    var elems = [];
    Object.keys(this.state.rates).map((key) => {
      elems.push(<li key={key}>{key} => {this.state.rates[key]}</li>)
    });

    return (
      <div>
        <Button purpose='primary' onClick={this.selectConversion.bind(this, 'USD')}>USD</Button>
        <Button purpose='primary' onClick={this.selectConversion.bind(this, 'EUR')}>EUR</Button>
        <Input type='text' label='GBP' onChange={this.convertCurrency} value={this.state.base} />
        <Input type='text' label={this.state.conversion} onChange={this.convertCurrency} value={this.state.converted} />
      </div>
    );
  }
});

ReactDOM.render(<CurrencyConverter />, document.getElementById('demo'));

















