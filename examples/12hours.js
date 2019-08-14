/* eslint no-console:0 */

import 'rc-time-picker/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import moment from 'moment';

import TimePicker from 'rc-time-picker';

const format = 'h:mm a';
const formatHours = 'h a';

const now = moment()
  .hour(0)
  .minute(0);

function onChange(value) {
  console.log(value && value.format(format));
}

ReactDom.render(
  <div>
    <TimePicker
      showSecond={false}
      defaultValue={now}
      className="xxx"
      onChange={onChange}
      format={format}
      use12Hours
      inputReadOnly
    />
    <TimePicker
      showSecond={false}
      defaultValue={now}
      className="xxx"
      onChange={onChange}
      format={format}
      formatHours={formatHours}
      inputReadOnly
    />
  </div>,
  document.getElementById('__react-content'),
);
