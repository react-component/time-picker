/* eslint no-console:0 */

import 'rc-time-picker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import moment from 'moment';

import TimePicker from 'rc-time-picker';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

function onChange(value) {
  console.log(value && value.format(str));
}

ReactDom.render(
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
  />,
  document.getElementById('__react-content')
);
