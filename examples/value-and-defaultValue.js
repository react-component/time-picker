/* eslint no-console:0 */

import 'rc-time-picker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import GregorianCalendar from 'gregorian-calendar';
import DateTimeFormat from 'gregorian-calendar-format';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';

import TimePicker from 'rc-time-picker';
import TimePickerLocale from 'rc-time-picker/src/locale/zh_CN';

const formatter = new DateTimeFormat('HH:mm:ss');

const now = new GregorianCalendar(zhCn);
now.setTime(Date.now());

const App = React.createClass({
  getInitialState() {
    return {
      value: now,
    };
  },
  handleValueChange(value) {
    console.log(value && formatter.format(value));
    this.setState({ value });
  },
  render() {
    return (
      <div>
        <TimePicker formatter={formatter} locale={TimePickerLocale}
              defaultValue={now} />
        <TimePicker formatter={formatter} locale={TimePickerLocale}
              value={this.state.value}
              onChange={this.handleValueChange}/>
      </div>
    );
  }
});

ReactDom.render(
  <App />,
  document.getElementById('__react-content')
);
