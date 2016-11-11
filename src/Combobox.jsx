import React, { PropTypes } from 'react';
import Select from './Select';

const formatOption = (option, disabledOptions) => {
  let value = `${option}`;
  if (option < 10) {
    value = `0${option}`;
  }

  let disabled = false;
  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value,
    disabled,
  };
};

const Combobox = React.createClass({
  propTypes: {
    format: PropTypes.string,
    defaultOpenValue: PropTypes.object,
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    showHour: PropTypes.bool,
    showMinute: PropTypes.bool,
    showSecond: PropTypes.bool,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    onCurrentSelectPanelChange: PropTypes.func,
  },

  onItemChange(type, itemValue) {
    const { onChange, defaultOpenValue } = this.props;
    const value = (this.props.value || defaultOpenValue).clone();
    if (type === 'hour') {
      value.hour(itemValue);
    } else if (type === 'minute') {
      value.minute(itemValue);
    } else {
      value.second(itemValue);
    }
    onChange(value);
  },

  onEnterSelectPanel(range) {
    this.props.onCurrentSelectPanelChange(range);
  },

  getHourSelect(hour) {
    const { prefixCls, hourOptions, disabledHours, showHour } = this.props;
    if (!showHour) {
      return null;
    }
    const disabledOptions = disabledHours();

    return (
      <Select
        prefixCls={prefixCls}
        options={hourOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={hourOptions.indexOf(hour)}
        type="hour"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'hour')}
      />
    );
  },

  getMinuteSelect(minute) {
    const { prefixCls, minuteOptions, disabledMinutes, defaultOpenValue, showMinute } = this.props;
    if (!showMinute) {
      return null;
    }
    const value = this.props.value || defaultOpenValue;
    const disabledOptions = disabledMinutes(value.hour());

    return (
      <Select
        prefixCls={prefixCls}
        options={minuteOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={minuteOptions.indexOf(minute)}
        type="minute"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'minute')}
      />
    );
  },

  getSecondSelect(second) {
    const { prefixCls, secondOptions, disabledSeconds, showSecond, defaultOpenValue } = this.props;
    if (!showSecond) {
      return null;
    }
    const value = this.props.value || defaultOpenValue;
    const disabledOptions = disabledSeconds(value.hour(), value.minute());

    return (
      <Select
        prefixCls={prefixCls}
        options={secondOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={secondOptions.indexOf(second)}
        type="second"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'second')}
      />
    );
  },

  render() {
    const { prefixCls, defaultOpenValue } = this.props;
    const value = this.props.value || defaultOpenValue;
    return (
      <div className={`${prefixCls}-combobox`}>
        {this.getHourSelect(value.hour())}
        {this.getMinuteSelect(value.minute())}
        {this.getSecondSelect(value.second())}
      </div>
    );
  },
});

export default Combobox;
