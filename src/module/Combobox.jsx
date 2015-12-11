import React, {PropTypes} from 'react';
import Select from './Select';
import GregorianCalendar from 'gregorian-calendar';

const formatOption = (option) => {
  if (option < 10) {
    return `0${option}`;
  }
  return `${option}`;
};

const Combobox = React.createClass({
  propTypes: {
    formatter: PropTypes.object,
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    showHour: PropTypes.bool,
    gregorianCalendarLocale: PropTypes.object,
    showSecond: PropTypes.bool,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    onCurrentSelectPanelChange: PropTypes.func,
  },

  onItemChange(type, itemValue) {
    const { onChange } = this.props;
    let value = this.props.value;
    if (value) {
      value = value.clone();
    } else {
      value = this.getNow().clone();
    }
    if (type === 'hour') {
      value.setHourOfDay(itemValue);
    } else if (type === 'minute') {
      value.setMinutes(itemValue);
    } else {
      value.setSeconds(itemValue);
    }
    onChange(value);
  },

  onEnterSelectPanel(range) {
    this.props.onCurrentSelectPanelChange(range);
  },

  getHourSelect(hour) {
    const { prefixCls, hourOptions, showHour } = this.props;
    if (!showHour) {
      return null;
    }
    return (
      <Select
        prefixCls={prefixCls}
        options={hourOptions.map(option => formatOption(option))}
        selectedIndex={hourOptions.indexOf(hour)}
        type="hour"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'hour')}
      />
    );
  },

  getMinuteSelect(minute) {
    const { prefixCls, minuteOptions } = this.props;
    return (
      <Select
        prefixCls={prefixCls}
        options={minuteOptions.map(option => formatOption(option))}
        selectedIndex={minuteOptions.indexOf(minute)}
        type="minute"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'minute')}
      />
    );
  },

  getSecondSelect(second) {
    const { prefixCls, secondOptions, showSecond } = this.props;
    if (!showSecond) {
      return null;
    }
    return (
      <Select
        prefixCls={prefixCls}
        options={secondOptions.map(option => formatOption(option))}
        selectedIndex={secondOptions.indexOf(second)}
        type="second"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'second')}
      />
    );
  },

  getNow() {
    if (this.showNow) {
      return this.showNow;
    }
    const value = new GregorianCalendar(this.props.gregorianCalendarLocale);
    value.setTime(Date.now());
    this.showNow = value;
    return value;
  },

  render() {
    const { prefixCls } = this.props;
    const value = this.props.value || this.getNow();
    return (
      <div className={`${prefixCls}-combobox`}>
        {this.getHourSelect(value.getHourOfDay())}
        {this.getMinuteSelect(value.getMinutes())}
        {this.getSecondSelect(value.getSeconds())}
      </div>
    );
  },
});

export default Combobox;
