const React = require('react');
const ReactDOM = require('react-dom');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <div>Hello World!</div>
    );
  }
});

ReactDOM.render(<HelloMessage />, document.getElementById('demo'));