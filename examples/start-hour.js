import '../assets/index.less';
import React from 'react';
import moment from 'moment';
import TimePicker from '..';

const App = () => (
  <>
    <TimePicker defaultValue={moment()} showSecond={false} startHour={10} />
  </>
);

export default App;
