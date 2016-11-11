import 'rc-time-picker/assets/index.less';
import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

const App = React.createClass({
  render() {
    return (
      <div>
        <TimePicker defaultValue={moment()} showHour={false} />
        <TimePicker defaultValue={moment()} showMinute={false} />
        <TimePicker defaultValue={moment()} showSecond={false} />

        <TimePicker defaultValue={moment()} showMinute={false} showSecond={false} />
        <TimePicker defaultValue={moment()} showHour={false} showSecond={false}/>
        <TimePicker defaultValue={moment()} showHour={false} showMinute={false} />
      </div>
    );
  },
});

ReactDom.render(
  <App />,
  document.getElementById('__react-content')
);
