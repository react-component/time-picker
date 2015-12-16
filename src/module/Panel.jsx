import React, {PropTypes} from 'react';
import CommonMixin from '../mixin/CommonMixin';
import Header from './Header';
import Combobox from './Combobox';

function noop() {
}

function generateOptions(length, disabledOptions, hideDisabledOptions) {
  const arr = [];
  for (let value = 0; value < length; value++) {
    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
      arr.push(value);
    }
  }
  return arr;
}

const Panel = React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    locale: PropTypes.object,
    placeholder: PropTypes.string,
    gregorianCalendarLocale: PropTypes.object,
    formatter: PropTypes.object,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    hideDisabledOptions: PropTypes.bool,
    onChange: PropTypes.func,
    onEsc: PropTypes.func,
    allowEmpty: PropTypes.bool,
    showHour: PropTypes.bool,
    showSecond: PropTypes.bool,
    onClear: PropTypes.func,
  },

  mixins: [CommonMixin],

  getDefaultProps() {
    return {
      onChange: noop,
      onClear: noop,
    };
  },

  getInitialState() {
    return {
      value: this.props.value,
      selectionRange: [],
    };
  },

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    if (value) {
      this.setState({
        value,
      });
    }
  },

  onChange(newValue) {
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  },

  onClear() {
    this.props.onClear();
  },

  onCurrentSelectPanelChange(currentSelectPanel) {
    this.setState({ currentSelectPanel });
  },

  render() {
    const { locale, prefixCls, placeholder, disabledHours, disabledMinutes, disabledSeconds, hideDisabledOptions, allowEmpty, showHour, showSecond, formatter, gregorianCalendarLocale } = this.props;
    const value = this.state.value;
    const disabledHourOptions = disabledHours();
    const disabledMinuteOptions = disabledMinutes(value.getHourOfDay());
    const disabledSecondOptions = disabledSeconds(value.getHourOfDay(), value.getMinutes());
    const hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions);
    const minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions);
    const secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions);

    return (
      <div className={`${prefixCls}-inner`}>
        <Header
          prefixCls={prefixCls}
          gregorianCalendarLocale={gregorianCalendarLocale}
          locale={locale}
          value={value}
          currentSelectPanel={this.state.currentSelectPanel}
          onEsc={this.props.onEsc}
          formatter={formatter}
          placeholder={placeholder}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          onChange={this.onChange}
          onClear={this.onClear}
          allowEmpty={allowEmpty}
        />
        <Combobox
          prefixCls={prefixCls}
          value={value}
          gregorianCalendarLocale={gregorianCalendarLocale}
          formatter={formatter}
          onChange={this.onChange}
          showHour={showHour}
          showSecond={showSecond}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          onCurrentSelectPanelChange={this.onCurrentSelectPanelChange}
        />
      </div>
    );
  },
});

export default Panel;
