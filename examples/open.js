/* eslint no-console:0 */

import 'rc-time-picker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';
import TimePicker from 'rc-time-picker';

const App = React.createClass({
  getInitialState() {
    return {
      open: false,
    };
  },
  toggleOpen() {
    this.setState({
      open: !this.state.open,
    });
  },
  setOpen({ open }) {
    this.setState({ open });
  },
  render() {
    return (
      <div>
        <button onClick={this.toggleOpen}>Toggle open</button>
        <TimePicker open={this.state.open} onOpen={this.setOpen} onClose={this.setOpen} />
      </div>
    );
  },
});

ReactDom.render(
  <App />,
  document.getElementById('__react-content')
);
