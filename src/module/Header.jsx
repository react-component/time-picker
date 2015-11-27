import React, {PropTypes} from 'react';

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
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onEsc: PropTypes.func,
    allowEmpty: PropTypes.bool,
  },

  getInitialState() {
    const value = this.props.value;
    return {
      str: value && this.props.formatter.format(value) || '',
      invalid: false,
    };
  },

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.refs.input.focus();
    }, 0);
  },

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    this.setState({
      str: value && nextProps.formatter.format(value) || '',
      invalid: false,
    });
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
    const {formatter, gregorianCalendarLocale, hourOptions, minuteOptions, secondOptions, onChange, allowEmpty} = this.props;

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
