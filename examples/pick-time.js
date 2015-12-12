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

const options = {
  disabledHours() {
    return [0, 2, 21];
  },
  disabledMinutes(h) {
    return h === 22 ? [0, 3, 31] : [];
  },
  disabledSeconds(h, m) {
    return [];
  },
};

ReactDom.render(
  <TimePicker formatter={formatter} locale={TimePickerLocale}
              showSecond={showSecond}
              defaultValue={now}
              className="xxx"
              onChange={onChange}
              disabledHours={[0, 2, 21]}
              disabledMinutes={[0, 2, 21]}
              disabledSeconds={[]}
              hideDisabledOptions={true} />,
  document.getElementById('__react-content')
);
