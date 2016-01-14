/* eslint no-console:0 */

import 'rc-time-picker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import GregorianCalendar from 'gregorian-calendar';
import DateTimeFormat from 'gregorian-calendar-format';

import TimePicker from 'rc-time-picker';
import TimePickerLocale from 'rc-time-picker/src/locale/zh_CN';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

const formatter = new DateTimeFormat(str);

const now = new GregorianCalendar(TimePickerLocale.calendar);
now.setTime(Date.now());

function onChange(value) {
  console.log(value && formatter.format(value));
}

ReactDom.render(
  <TimePicker formatter={formatter} locale={TimePickerLocale}
              style={{width: 100}}
              showSecond={showSecond}
              defaultValue={now}
              className="xxx"
              onChange={onChange} />,
  document.getElementById('__react-content')
);
