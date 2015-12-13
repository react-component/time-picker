/* eslint no-console:0 */

import 'rc-time-picker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import GregorianCalendar from 'gregorian-calendar';
import DateTimeFormat from 'gregorian-calendar-format';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';

import TimePicker from 'rc-time-picker';
import TimePickerLocale from 'rc-time-picker/src/locale/zh_CN';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

const formatter = new DateTimeFormat(str);

const now = new GregorianCalendar(zhCn);
now.setTime(Date.now());

function onChange(value) {
  console.log(value && formatter.format(value));
}

ReactDom.render(
  <TimePicker formatter={formatter} locale={TimePickerLocale}
              showSecond={showSecond}
              defaultValue={now}
              className="xxx"
              onChange={onChange}
              disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23]}
              disabledMinutes={() => [0, 2, 4, 6, 8]}
              hideDisabledOptions />,
  document.getElementById('__react-content')
);
