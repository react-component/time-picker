import 'rc-time-picker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import GregorianCalendar from 'gregorian-calendar';
import DateTimeFormat from 'gregorian-calendar-format';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';

import TimePicker from 'rc-time-picker/src/TimePicker';
import TimePanel from 'rc-time-picker/src/TimePanel';
import TimePickerLocale from 'rc-time-picker/src/locale/zh_CN';

const formatter = new DateTimeFormat('HH:mm:ss');

const now = new GregorianCalendar(zhCn);
now.setTime(Date.now());

const timePanel = (
  <TimePanel
    defaultValue={now}
    locale={TimePickerLocale}
    formatter={formatter}
    minuteOptions={[0, 30]}
  />
);

ReactDom.render(
  <TimePicker panel={timePanel} value={now}>
    {
      ({value}) => {
        return <input type="text" placeholder="请选择时间" readOnly value={value && formatter.format(value)} />;
      }
    }
  </TimePicker>,
  document.getElementById('__react-content')
);
