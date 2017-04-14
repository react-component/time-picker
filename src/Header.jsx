import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Header extends Component {
  static propTypes = {
    format: PropTypes.string,
    prefixCls: PropTypes.string,
    disabledDate: PropTypes.func,
    placeholder: PropTypes.string,
    clearText: PropTypes.string,
    value: PropTypes.object,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onEsc: PropTypes.func,
    allowEmpty: PropTypes.bool,
    defaultOpenValue: PropTypes.object,
    currentSelectPanel: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { value, format } = props;
    this.state = {
      str: value && value.format(format) || '',
      invalid: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value, format } = nextProps;
    this.setState({
      str: value && value.format(format) || '',
      invalid: false,
    });
  }

  onInputChange = (event) => {
    const str = event.target.value;
    this.setState({
      str,
    });
    const {
      format, hourOptions, minuteOptions, secondOptions,
      disabledHours, disabledMinutes,
      disabledSeconds, onChange, allowEmpty,
    } = this.props;

    if (str) {
      const originalValue = this.props.value;
      const value = this.getProtoValue().clone();
      const parsed = moment(str, format, true);
      if (!parsed.isValid()) {
        this.setState({
          invalid: true,
        });
        return;
      }
      value.hour(parsed.hour()).minute(parsed.minute()).second(parsed.second());

      // if time value not allowed, response warning.
      if (
        hourOptions.indexOf(value.hour()) < 0 ||
        minuteOptions.indexOf(value.minute()) < 0 ||
        secondOptions.indexOf(value.second()) < 0
      ) {
        this.setState({
          invalid: true,
        });
        return;
      }

      // if time value is disabled, response warning.
      const disabledHourOptions = disabledHours();
      const disabledMinuteOptions = disabledMinutes(value.hour());
      const disabledSecondOptions = disabledSeconds(value.hour(), value.minute());
      if (
        (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0) ||
        (disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0) ||
        (disabledSecondOptions && disabledSecondOptions.indexOf(value.second()) >= 0)
      ) {
        this.setState({
          invalid: true,
        });
        return;
      }

      if (originalValue) {
        if (
          originalValue.hour() !== value.hour() ||
          originalValue.minute() !== value.minute() ||
          originalValue.second() !== value.second()
        ) {
          // keep other fields for rc-calendar
          const changedValue = originalValue.clone();
          changedValue.hour(value.hour());
          changedValue.minute(value.minute());
          changedValue.second(value.second());
          onChange(changedValue);
        }
      } else if (originalValue !== value) {
        onChange(value);
      }
    } else if (allowEmpty) {
      onChange(null);
    } else {
      this.setState({
        invalid: true,
      });
      return;
    }

    this.setState({
      invalid: false,
    });
  }

  onKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.onEsc();
    }
  }

  onClear = () => {
    this.setState({ str: '' });
    this.props.onClear();
  }

  getClearButton() {
    const { prefixCls, allowEmpty } = this.props;
    if (!allowEmpty) {
      return null;
    }
    return (<a
      className={`${prefixCls}-clear-btn`}
      role="button"
      title={this.props.clearText}
      onMouseDown={this.onClear}
    />);
  }

  getProtoValue() {
    return this.props.value || this.props.defaultOpenValue;
  }

  getInput() {
    const { prefixCls, placeholder } = this.props;
    const { invalid, str } = this.state;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
    return (
      <input
        className={`${prefixCls}-input  ${invalidClass}`}
        ref="input"
        onKeyDown={this.onKeyDown}
        value={str}
        placeholder={placeholder}
        onChange={this.onInputChange}
      />
    );
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-input-wrap`}>
        {this.getInput()}
        {this.getClearButton()}
      </div>
    );
  }
}

export default Header;
