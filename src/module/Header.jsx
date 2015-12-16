import React, {PropTypes} from 'react';
import createSelection from '../util/selection';

const Header = React.createClass({
  propTypes: {
    formatter: PropTypes.object,
    prefixCls: PropTypes.string,
    gregorianCalendarLocale: PropTypes.object,
    locale: PropTypes.object,
    disabledDate: PropTypes.func,
    placeholder: PropTypes.string,
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
    currentSelectPanel: PropTypes.string,
  },

  getInitialState() {
    const value = this.props.value;
    return {
      str: value && this.props.formatter.format(value) || '',
      invalid: false,
    };
  },

  componentDidMount() {
    this.timer = setTimeout(this.selectRange, 0);
  },

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    this.setState({
      str: value && nextProps.formatter.format(value) || '',
      invalid: false,
    });
  },

  componentDidUpdate() {
    this.timer = setTimeout(this.selectRange, 0);
  },

  componentWillUnmount() {
    clearTimeout(this.timer);
  },

  onInputChange(event) {
    const str = event.target.value;
    this.setState({
      str,
    });
    let value = null;
    const {formatter, gregorianCalendarLocale, hourOptions, minuteOptions, secondOptions, disabledHours, disabledMinutes, disabledSeconds, onChange, allowEmpty} = this.props;

    if (str) {
      const originalValue = this.props.value;
      try {
        value = formatter.parse(str, {
          locale: gregorianCalendarLocale,
          obeyCount: true,
        });
      } catch (ex) {
        this.setState({
          invalid: true,
        });
        return;
      }

      if (value) {
        // if time value not allowed, response warning.
        if (
          hourOptions.indexOf(value.getHourOfDay()) < 0 ||
          minuteOptions.indexOf(value.getMinutes()) < 0 ||
          secondOptions.indexOf(value.getSeconds()) < 0
        ) {
          this.setState({
            invalid: true,
          });
          return;
        }

        // if time value is disabled, response warning.
        const disabledHourOptions = disabledHours();
        const disabledMinuteOptions = disabledMinutes(value.getHourOfDay());
        const disabledSecondOptions = disabledSeconds(value.getHourOfDay(), value.getMinutes());
        if (
          (disabledHourOptions && disabledHourOptions.indexOf(value.getHourOfDay()) >= 0) ||
          (disabledMinuteOptions && disabledMinuteOptions.indexOf(value.getMinutes()) >= 0) ||
          (disabledSecondOptions && disabledSecondOptions.indexOf(value.getSeconds()) >= 0)
        ) {
          this.setState({
            invalid: true,
          });
          return;
        }

        if (originalValue && value) {
          if (
            originalValue.getHourOfDay() !== value.getHourOfDay() ||
            originalValue.getMinutes() !== value.getMinutes() ||
            originalValue.getSeconds() !== value.getSeconds()
          ) {
            onChange(value);
          }
        } else if (originalValue !== value) {
          onChange(value);
        }
      } else {
        this.setState({
          invalid: true,
        });
        return;
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
  },

  onKeyDown(e) {
    if (e.keyCode === 27) {
      this.props.onEsc();
    }
  },

  onClear() {
    this.setState({str: ''});
    this.props.onClear();
  },

  getClearButton() {
    const { locale, prefixCls, allowEmpty } = this.props;
    if (!allowEmpty) {
      return null;
    }
    return <a className={`${prefixCls}-clear-btn`} role="button" title={locale.clear} onMouseDown={this.onClear}/>;
  },

  getInput() {
    const { prefixCls, placeholder } = this.props;
    const { invalid, str } = this.state;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
    return (<input className={`${prefixCls}-input  ${invalidClass}`}
                   ref="input"
                   onKeyDown={this.onKeyDown}
                   value={str}
                   placeholder={placeholder} onChange={this.onInputChange}/>);
  },

  selectRange() {
    this.refs.input.focus();
    if (this.props.currentSelectPanel && this.refs.input.value) {
      let selectionRangeStart = 0;
      let selectionRangeEnd = 0;
      if (this.props.currentSelectPanel === 'hour') {
        selectionRangeStart = 0;
        selectionRangeEnd = this.refs.input.value.indexOf(':');
      } else if (this.props.currentSelectPanel === 'minute') {
        selectionRangeStart = this.refs.input.value.indexOf(':') + 1;
        selectionRangeEnd = this.refs.input.value.lastIndexOf(':');
      } else if (this.props.currentSelectPanel === 'second') {
        selectionRangeStart = this.refs.input.value.lastIndexOf(':') + 1;
        selectionRangeEnd = this.refs.input.value.length;
      }
      if (selectionRangeEnd - selectionRangeStart === 2) {
        createSelection(this.refs.input, selectionRangeStart, selectionRangeEnd);
      }
    }
  },

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-input-wrap`}>
        {this.getInput()}
        {this.getClearButton()}
      </div>
    );
  },
});

export default Header;
