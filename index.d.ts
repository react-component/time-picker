import * as moment from 'moment';
import * as React from 'react';

interface ITimePickerProps {
  prefixCls: string;
  clearText: string;
  disabled: boolean;
  allowEmpty: boolean;
  open: boolean;
  defaultValue: moment.Moment;
  defaultOpenValue: moment.Moment;
  value: moment.Moment;
  placeholder: string;
  className: string;
  inputClassName: string;
  id: string;
  popupClassName: string;
  showHour: boolean;
  showMinute: boolean;
  showSecond: boolean;
  format: string;
  disabledHours: () => number[];
  disabledMinutes: (hour: number) => number[];
  disabledSeconds: (hour: number, minute: number) => number[];
  use12Hours: boolean;
  hideDisabledOptions: boolean;
  onChange: (value: moment.Moment) => void;
  addon: (timepicker: TimePicker) => JSX.Element;
  placement: string;
  transitionName: string;
  onOpen: (state: { open: boolean }) => void;
  onClose: (state: { open: boolean }) => void;
  hourStep: number;
  minuteStep: number;
  secondStep: number;
  focusOnOpen: boolean;
  inputReadOnly: boolean;
  inputIcon: React.ReactNode;
  clearIcon: React.ReactNode;
}

declare class TimePicker extends React.Component<Partial<ITimePickerProps>> {
  constructor(props: Readonly<Partial<ITimePickerProps>>);

  public close(): void;
  public isAM(): boolean;
}

export = TimePicker;
