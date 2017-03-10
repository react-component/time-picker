/* eslint no-console:0 */

import 'rc-time-picker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import moment from 'moment';

import TimePicker from 'rc-time-picker';

const format = 'h:mm a';

const now = moment('12:57:58', format);

function onChange(value) {
  console.log(value && value.format(format));
}

ReactDom.render(
  <TimePicker
    slotHours={2}
    slotMinutes={15}
    slotSeconds={30}
    defaultValue={now}
    className="xxx"
    onChange={onChange}
    format={format}
    use12Hours
  />,
  document.getElementById('__react-content')
);
