declare module "rc-time-picker" {
  import { Moment } from "moment";
  import * as React from "react";

  type TimePickerProps = {
    prefixCls?: string;
    clearText?: string;
    disabled?: boolean;
    allowEmpty?: boolean;
    open?: boolean;
    defaultValue?: Moment;
    defaultOpenValue?: Moment;
    value?: Moment;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    id?: string;
    popupClassName?: string;
    popupStyle?: any;
    showHour?: boolean;
    showMinute?: boolean;
    showSecond?: boolean;
    format?: string;
    disabledHours?: () => number[];
    disabledMinutes?: (hour: number) => number[];
    disabledSeconds?: (hour: number, minute: number) => number[];
    use12Hours?: boolean;
    hideDisabledOptions?: boolean;
    onChange?: (newValue: Moment | null) => void;
    onAmPmChange?: (ampm: 'PM' | 'AM') => void;
    addon?: (instance: typeof Panel) => React.ReactNode;
    placement?: string;
    transitionName?: string;
    name?: string;
    autoComplete?: string;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    autoFocus?: boolean;
    onOpen?: (newState: { open: true }) => void;
    onClose?: (newState: { open: false }) => void;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    focusOnOpen?: boolean;
    inputReadOnly?: boolean;
    inputIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
    getPopupContainer?: React.ReactNode;
  };
  export default class TimePicker extends React.Component<TimePickerProps> {
    focus(): void;
    blur(): void;
  }
  class Panel extends React.Component<unknown> {
    close(): void;
  }
}
