import React, {PropTypes} from 'react';

const Header = React.createClass({
  propTypes: {
    formatter: PropTypes.object,
    prefixCls: PropTypes.string,
    gregorianTimePickerLocale: PropTypes.object,
    locale: PropTypes.object,
    disabledDate: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.object,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    showClear: PropTypes.bool,
  },

  getInitialState() {
    const value = this.props.value;
    return {
      str: value && this.props.formatter.format(value) || '',
      invalid: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    this.setState({
      str: value && nextProps.formatter.format(value) || '',
      invalid: false,
    });
  },

  onInputChange(event) {
    const str = event.target.value;
    this.setState({
      str,
    });
    let value = null;
    const {formatter, gregorianTimePickerLocale, hourOptions, minuteOptions, secondOptions, onChange} = this.props;

    if (str) {
      const originalValue = this.props.value;
      try {
        value = formatter.parse(str, {
          locale: gregorianTimePickerLocale,
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
          hourOptions.indexOf(value.fields[4]) < 0 ||
          minuteOptions.indexOf(value.fields[5]) < 0 ||
          secondOptions.indexOf(value.fields[6]) < 0
        ) {
          this.setState({
            invalid: true,
          });
          return;
        }

        if (originalValue && value) {
          if (
            originalValue.fields[4] !== value.fields[4] ||
            originalValue.fields[5] !== value.fields[5] ||
            originalValue.fields[6] !== value.fields[6]
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
    } else {
      onChange(null);
    }

    this.setState({
      invalid: false,
    });
  },

  onClear() {
    this.setState({str: ''});
    this.props.onClear();
  },

  getClearButton() {
    const { locale, prefixCls, showClear } = this.props;
    if (!showClear) {
      return null;
    }
    return <a className={`${prefixCls}-clear-btn`} role="button" title={locale.clear} onMouseDown={this.onClear} />;
  },

  getInput() {
    const { prefixCls, placeholder } = this.props;
    const { invalid, str } = this.state;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
    return <input className={`${prefixCls}-input  ${invalidClass}`} value={str} placeholder={placeholder} onChange={this.onInputChange} />;
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
