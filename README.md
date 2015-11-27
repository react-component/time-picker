# TimePicker

React TimePicker

install
-------

```
npm install rc-time-picker
```

Usage
-----

```
import TimePicker from 'rc-time-picker';
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(<TimePicker />, container);
```

API
---

### TimePicker

| Name           | Type                       | Default                                       | Description                                                                                |
|----------------|----------------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------|
| prefixCls      | String                     |                                               | prefixCls of this component                                                                |
| locale         | Object                     | import from 'rc-time-picker/lib/locale/en_US' |                                                                                            |
| disabled       | Boolean                    | false                                         | whether picker is disabled                                                                 |
| open           | Boolean                    | false                                         | current open state of picker. controlled prop                                              |
| defaultValue   | GregorianCalendar          | null                                          | default initial value                                                                      |
| value          | GregorianCalendar                 | null                                          | current value                                                                              |
| gregorianCalendarLocale   | GregorianCalendar  locale object               | null                                          | if value and defaultValue not set, you should set this to your locale                                                                            |
| placeholder    | String                     | ''                                            | time input's placeholder                                                                   |
| showHour       | Boolean                    | whether show hour                             |                                                                                            |
| showSecond     | Boolean                    | whether show second                           |                                                                                            |
| formatter      | String|GregorianCalendarFormatter |                                        |                                                                                            |
| hourOptions    | Array<String>              | hour options                                  |                                                                                            |
| minuteOptions  | Array<String>              | minute options                                |                                                                                            |
| secondOptions  | Array<String>              | second options                                |                                                                                            |
| onChange       | Function                   | null                                          | called when select a different value                                                       |
| placement      | String                     | bottomLeft                                    | one of ['left','right','top','bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'] |
| transitionName | String                     | ''                                            |                                                                                            |

License
-------

rc-time-picker is released under the MIT license.
