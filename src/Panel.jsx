import React, { Component } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Header from './Header';
import Combobox from './Combobox';

function noop() { }

function generateOptions(length, disabledOptions, hideDisabledOptions, step = 1) {
  const arr = [];
  for (let value = 0; value < length; value += step) {
    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
      arr.push(value);
    }
  }
  return arr;
}

function toNearestValidTime(time, hourOptions, minuteOptions, secondOptions, millisecondOptions) {
  const hour = hourOptions
    .slice()
    .sort((a, b) => Math.abs(time.hour() - a) - Math.abs(time.hour() - b))[0];
  const minute = minuteOptions
    .slice()
    .sort((a, b) => Math.abs(time.minute() - a) - Math.abs(time.minute() - b))[0];
  const second = secondOptions
    .slice()
    .sort((a, b) => Math.abs(time.second() - a) - Math.abs(time.second() - b))[0];
  const millisecond = millisecondOptions
    .slice()
    .sort((a, b) => Math.abs(time.millisecond() - a) - Math.abs(time.millisecond() - b))[0];
  return moment(`${hour}:${minute}:${second}:${millisecond}`, 'HH:mm:ss:SS');
}

class Panel extends Component {
  static defaultProps = {
    prefixCls: 'rc-time-picker-panel',
    onChange: noop,
    disabledHours: noop,
    disabledMinutes: noop,
    disabledSeconds: noop,
    disabledMilliseconds: noop,
    defaultOpenValue: moment(),
    use12Hours: false,
    addon: noop,
    onKeyDown: noop,
    onAmPmChange: noop,
    inputReadOnly: false,
  };

  state = {};

  static getDerivedStateFromProps(props, state) {
    if ('value' in props) {
      return {
        ...state,
        value: props.value,
      };
    }
    return null;
  }

  onChange = newValue => {
    const { onChange } = this.props;
    this.setState({ value: newValue });
    onChange(newValue);
  };

  onAmPmChange = ampm => {
    const { onAmPmChange } = this.props;
    onAmPmChange(ampm);
  };

  onCurrentSelectPanelChange = currentSelectPanel => {
    this.setState({ currentSelectPanel });
  };

  disabledHours = () => {
    const { use12Hours, disabledHours } = this.props;
    let disabledOptions = disabledHours();
    if (use12Hours && Array.isArray(disabledOptions)) {
      if (this.isAM()) {
        disabledOptions = disabledOptions.filter(h => h < 12).map(h => (h === 0 ? 12 : h));
      } else {
        disabledOptions = disabledOptions.map(h => (h === 12 ? 12 : h - 12));
      }
    }
    return disabledOptions;
  };

  // https://github.com/ant-design/ant-design/issues/5829
  close() {
    const { onEsc } = this.props;
    onEsc();
  }

  isAM() {
    const { defaultOpenValue } = this.props;
    const { value } = this.state;
    const realValue = value || defaultOpenValue;
    return realValue.hour() >= 0 && realValue.hour() < 12;
  }

  render() {
    const {
      prefixCls,
      className,
      placeholder,
      disabledMinutes,
      disabledSeconds,
      disabledMilliseconds,
      hideDisabledOptions,
      showHour,
      showMinute,
      showSecond,
      showMillisecond,
      format,
      defaultOpenValue,
      clearText,
      onEsc,
      addon,
      use12Hours,
      focusOnOpen,
      onKeyDown,
      hourStep,
      minuteStep,
      secondStep,
      millisecondStep,
      inputReadOnly,
      clearIcon,
    } = this.props;
    const { value, currentSelectPanel } = this.state;
    const disabledHourOptions = this.disabledHours();
    const disabledMinuteOptions = disabledMinutes(value ? value.hour() : null);
    const disabledSecondOptions = disabledSeconds(
      value ? value.hour() : null,
      value ? value.minute() : null,
    );
    const disabledMillisecondOptions = disabledMilliseconds(
      value ? value.hour() : null,
      value ? value.minute() : null,
      value ? value.second() : null,
    );
    const hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions, hourStep);
    const minuteOptions = generateOptions(
      60,
      disabledMinuteOptions,
      hideDisabledOptions,
      minuteStep,
    );
    const secondOptions = generateOptions(
      60,
      disabledSecondOptions,
      hideDisabledOptions,
      secondStep,
    );
    const millisecondOptions = generateOptions(
      100,
      disabledMillisecondOptions,
      hideDisabledOptions,
      millisecondStep,
    );

    const validDefaultOpenValue = toNearestValidTime(
      defaultOpenValue,
      hourOptions,
      minuteOptions,
      secondOptions,
      millisecondOptions,
    );

    return (
      <div className={classNames(className, `${prefixCls}-inner`)}>
        <Header
          clearText={clearText}
          prefixCls={prefixCls}
          defaultOpenValue={validDefaultOpenValue}
          value={value}
          currentSelectPanel={currentSelectPanel}
          onEsc={onEsc}
          format={format}
          placeholder={placeholder}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
          millisecondOptions={millisecondOptions}
          disabledHours={this.disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          disabledMilliseconds={disabledMilliseconds}
          onChange={this.onChange}
          focusOnOpen={focusOnOpen}
          onKeyDown={onKeyDown}
          inputReadOnly={inputReadOnly}
          clearIcon={clearIcon}
        />
        <Combobox
          prefixCls={prefixCls}
          value={value}
          defaultOpenValue={validDefaultOpenValue}
          format={format}
          onChange={this.onChange}
          onAmPmChange={this.onAmPmChange}
          showHour={showHour}
          showMinute={showMinute}
          showSecond={showSecond}
          showMillisecond={showMillisecond}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
          millisecondOptions={millisecondOptions}
          disabledHours={this.disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          disabledMilliseconds={disabledMilliseconds}
          onCurrentSelectPanelChange={this.onCurrentSelectPanelChange}
          use12Hours={use12Hours}
          onEsc={onEsc}
          isAM={this.isAM()}
        />
        {addon(this)}
      </div>
    );
  }
}

export default Panel;
