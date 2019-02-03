/* eslint no-console:0 */

import 'rc-time-picker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import moment from 'moment';

import TimePicker from 'rc-time-picker';

const format = ['h:mm a', 'h:mm a', 'HH:mm a', 'h:mm', 'HH:mm', 'hhmm', 'HHmm'];

const now = moment().hour(3).minute(0);

ReactDom.render(
  <TimePicker
    defaultValue={now}
    format={format}
  />,
  document.getElementById('__react-content')
);
