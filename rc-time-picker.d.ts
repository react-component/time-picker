declare module 'rc-time-picker' {
  import { Moment } from 'moment';
  import * as React from 'react';

  interface ITimePickerProps {
    prefixCls?: string;
    clearText?: string;
    disabled?: boolean;
    allowEmpty?: boolean;
    open?: boolean;
    defaultValue?: moment;
    defaultOpenValue?: moment;
    value?: moment;
    placeholder?: string;
    className?: string;
    id?: string;
    popupClassName?: string;
    showHour?: boolean;
    showMinute?: boolean;
    showSecond?: boolean;
    format?: string;
    disabledHours?: function;
    disabledMinutes?: function;
    disabledSeconds?: function;
    use12Hours?: boolean;
    hideDisabledOptions?: boolean;
    onChange?: function;
    addon?: function;
    placement?: string;
    transitionName?: string;
    name?: string;
    onOpen?: function;
    onClose?: function;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    focusOnOpen?: boolean;
    inputReadOnly?: noolean;
    inputIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
  }
  export default class TimePicker extends React.Component<TimePickerProps> {}
}
