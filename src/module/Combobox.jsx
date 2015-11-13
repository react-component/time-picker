import React, {PropTypes} from 'react';
import Select from './Select';

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
    showSecond: PropTypes.bool,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
  },

  onItemChange(type, itemValue) {
    const { value, onChange } = this.props;
    let index = 4;
    if (type === 'minute') {
      index = 5;
    } else if (type === 'second') {
      index = 6;
    }
    value.fields[index] = itemValue;
    onChange(value);
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
      />
    );
  },

  getSectionSelect(second) {
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
      />
    );
  },

  render() {
    const { prefixCls, value } = this.props;
    const timeFields = value.fields;

    return (
      <div className={`${prefixCls}-combobox`}>
        {this.getHourSelect(timeFields[4])}
        {this.getMinuteSelect(timeFields[5])}
        {this.getSectionSelect(timeFields[6])}
      </div>
    );
  },
});

export default Combobox;
