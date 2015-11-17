TimePicker
==========

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

| Name          | Type                       | Default                                       | Description                                   |
|---------------|----------------------------|-----------------------------------------------|-----------------------------------------------|
| prefixCls     | String                     |                                               | prefixCls of this component                   |
| locale        | Object                     | import from 'rc-time-picker/lib/locale/en_US' |                                               |
| disabled      | Boolean                    | false                                         | whether picker is disabled                    |
| open          | Boolean                    | false                                         | current open state of picker. controlled prop |
| value         | GregorianCalendar          | null                                          | current value like input's value              |
| placeholder   | String                     | ''                                            | time input's placeholder                      |
| formatter     | GregorianCalendarFormatter | HH:mm:ss or HH:mm or mm:ss                    |                                               |
| hourOptions   | Array<String>              | hour options                                  |                                               |
| minuteOptions | Array<String>              | minute options                                |                                               |
| secondOptions | Array<String>              | second options                                |                                               |
| onChange      | Function                   | null                                          | called when select a different value          |
| onOpen        | Function                   | null                                          | called when open picker                       |
| onClose       | Function                   | null                                          | called when close picker                      |

License
-------

rc-time-picker is released under the MIT license.
