const request = require('request');
const Money = require('money');


const makeRequest = function() {
  const obj =  {
    from: 'GBP',
    to: 'EUR'
  };

  request('http://api.fixer.io/latest?base=gbp', function(error, response, body) {
    if (error) return error;
    if (!error && response.statusCode == 200) {
      console.log('body>', body);
      var result;
      try {
        result = JSON.parse(body);
      } catch (e) {
        console.log('e>', e);
      }

      Money.rates = result.rates;
      Money.base = result.base;

      console.log('money> 12.99 = euros: ', Money.convert(12.99, obj));
    }
  });
};

makeRequest();
