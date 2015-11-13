import '../component/timepicker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';
import GregorianCalendar from 'gregorian-calendar';

import TimePicker from '../component/timepicker/src/Picker';
import TimePanel from '../component/timepicker/src/TimePanel';
import TimepickerLocale from '../component/timepicker/src/locale/zh_CN';
import DateTimeFormat from 'gregorian-calendar-format';

const formatter = new DateTimeFormat('HH:mm:ss');

const now = new GregorianCalendar(zhCn);
now.setTime(Date.now());

const timePanel = (
  <TimePanel
    defaultValue={now}
    locale={TimepickerLocale}
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
  document.getElementById('react-content')
);
