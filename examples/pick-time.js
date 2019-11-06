/* eslint no-console:0 */
import '../assets/index.less';
import React from 'react';
import moment from 'moment';
import TimePicker from '..';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

function onChange(value) {
  console.log(value && value.format(str));
}

const App = () => (
  <TimePicker
    style={{ width: 100 }}
    showSecond={showSecond}
    defaultValue={moment()}
    className="xxx"
    onChange={onChange}
  />
);

export default App;
