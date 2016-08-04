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
    style={{ width: 100 }}
    showSecond={showSecond}
    defaultValue={moment()}
    className="xxx"
    onChange={onChange}
  />,
  document.getElementById('__react-content')
);
