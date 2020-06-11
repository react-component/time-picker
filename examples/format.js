import '../assets/index.less';
import React from 'react';
import moment from 'moment';
import TimePicker from '..';

const App = () => (
  <>
    <TimePicker defaultValue={moment()} showHour={false} />
    <TimePicker defaultValue={moment()} showMinute={false} />
    <TimePicker defaultValue={moment()} showSecond={false} />

    <TimePicker defaultValue={moment()} showMinute={false} showSecond={false} />
    <TimePicker defaultValue={moment()} showHour={false} showSecond={false} />
    <TimePicker defaultValue={moment()} showHour={false} showMinute={false} />

    <TimePicker defaultValue={moment()} format={['HH:mm:ss', 'HH.mm.ss', 'HH.mm.ss']} />
    <TimePicker
      defaultValue={moment()}
      format={['HH:mm a', 'HH.mm a', 'HH.mm a']}
      showSecond={false}
      use12Hours
    />
  </>
);

export default App;
