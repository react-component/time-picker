/* eslint no-console:0 */
import '../assets/index.less';
import React from 'react';
import moment from 'moment';
import TimePicker from '..';

const format = 'h:mm a';

const now = moment()
  .hour(0)
  .minute(0);

function onChange(value) {
  console.log(value && value.format(format));
}

const App = () => (
  <TimePicker
    showSecond={false}
    defaultValue={now}
    className="xxx"
    onChange={onChange}
    format={format}
    use12Hours
    inputReadOnly
  />
);

export default App;
