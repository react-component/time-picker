import 'rc-time-picker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import GregorianCalendar from 'gregorian-calendar';
import DateTimeFormat from 'gregorian-calendar-format';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';

import TimePicker from 'rc-time-picker/src/TimePicker';
import TimePickerLocale from 'rc-time-picker/src/locale/zh_CN';

const formatter = new DateTimeFormat('HH:mm:ss');

const now = new GregorianCalendar(zhCn);
now.setTime(Date.now());

ReactDom.render(
  <TimePicker formatter={formatter} locale={TimePickerLocale} value={now} />,
  document.getElementById('__react-content')
);
