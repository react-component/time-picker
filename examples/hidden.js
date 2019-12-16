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
    format={str}
    showSecond={showSecond}
    // use to control utfOffset, locale, default open value
    defaultOpenValue={moment()}
    className="xxx"
    onChange={onChange}
    disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23]}
    disabledMinutes={() => [0, 2, 4, 6, 8]}
    hideDisabledOptions
  />
);

export default App;
