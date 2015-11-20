import React, {PropTypes} from 'react';
import classnames from 'classnames';
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';

import CommonMixin from '../mixin/CommonMixin';
import Header from './Header';
import Combobox from './Combobox';

function noop() {
}

function generateOptions(length) {
  return Array.apply(null, {length: length}).map((item, index) => {
    return index;
  });
}

const Panel = React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    locale: PropTypes.object,
    placeholder: PropTypes.string,
    formatter: PropTypes.object,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
  },

  mixins: [CommonMixin],

  getDefaultProps() {
    return {
      hourOptions: generateOptions(24),
      minuteOptions: generateOptions(60),
      secondOptions: generateOptions(60),
      onChange: noop,
      onClear: noop,
    };
  },

  getInitialState() {
    let value = this.props.value;
    if (!value) {
      value = new GregorianCalendar(zhCn);
      value.setTime(Date.now());
    }
    return {
      value,
    };
  },

  componentWillMount() {
    const formatter = this.props.formatter;
    const pattern = formatter.originalPattern;
    if (pattern === 'HH:mm') {
      this.showSecond = false;
    } else if (pattern === 'mm:ss') {
      this.showHour = false;
    }
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

  showHour: true,
  showSecond: true,

  render() {
    const { locale, prefixCls, placeholder, hourOptions, minuteOptions, secondOptions } = this.props;
    const value = this.state.value;
    const cls = classnames({ 'narrow': !this.showHour || !this.showSecond });

    return (
      <div className={`${prefixCls}-panel-inner ${cls}`}>
        <Header
          prefixCls={prefixCls}
          gregorianTimePickerLocale={value.locale}
          locale={locale}
          value={value}
          formatter={this.getFormatter()}
          placeholder={placeholder}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
          onChange={this.onChange}
          onClear={this.onClear}
          showClear
        />
        <Combobox
          prefixCls={prefixCls}
          value={value}
          formatter={this.getFormatter()}
          onChange={this.onChange}
          showHour={this.showHour}
          showSecond={this.showSecond}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
        />
      </div>
    );
  },
});

export default Panel;
