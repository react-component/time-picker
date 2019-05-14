declare module 'rc-time-picker' {
  import { Moment } from 'moment';
  import * as React from 'react';

  type TimePickerProps = {
    prefixCls?: String;
    clearText?: String;
    disabled?: Boolean;
    allowEmpty?: Boolean;
    open?: Boolean;
    defaultValue?: Moment;
    defaultOpenValue?: Moment;
    value?: Moment;
    placeholder?: String;
    className?: String;
    id?: String;
    popupClassName?: String;
    showHour?: Boolean;
    showMinute?: Boolean;
    showSecond?: Boolean;
    showMillisecond?: Boolean;
    format?: String;
    disabledHours?: Function;
    disabledMinutes?: Function;
    disabledSeconds?: Function;
    disabledMilliseconds?: Function;
    use12Hours?: Boolean;
    hideDisabledOptions?: Boolean;
    onChange?: Function;
    addon?: Function;
    placement?: String;
    transitionName?: String;
    name?: String;
    onOpen?: Function;
    onClose?: Function;
    hourStep?: Number;
    minuteStep?: Number;
    secondStep?: Number;
    millisecondStep?: Number;
    focusOnOpen?: Boolean;
    inputReadOnly?: Boolean;
    inputIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
  };
  export default class TimePicker extends React.Component<TimePickerProps> {}
}
