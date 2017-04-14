/* eslint no-console:0 */

import 'rc-time-picker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

class App extends React.Component {
  state = {
    value: moment(),
  };
  handleValueChange = (value) => {
    console.log(value && value.format('HH:mm:ss'));
    this.setState({ value });
  }
  clear = () => {
    this.setState({
      value: undefined,
    });
  }
  render() {
    return (
      <div>
        <TimePicker
          defaultValue={this.state.value}
          onChange={this.handleValueChange}
        />
        <TimePicker
          value={this.state.value}
          onChange={this.handleValueChange}
        />
        <button onClick={this.clear}>clear</button>
      </div>
    );
  }
}

ReactDom.render(
  <App />,
  document.getElementById('__react-content')
);
