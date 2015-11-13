import {PropTypes} from 'react';
import enUs from '../locale/en_US';
import {getFormatter} from '../util/index';

export default {
  propTypes: {
    prefixCls: PropTypes.string,
    locale: PropTypes.object,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-timepicker',
      locale: enUs,
    };
  },

  getFormatter() {
    const formatter = this.props.formatter;
    const locale = this.props.locale;
    if (formatter) {
      if (formatter === this.lastFormatter) {
        return this.normalFormatter;
      }
      this.normalFormatter = getFormatter(formatter, locale);
      this.lastFormatter = formatter;
      return this.normalFormatter;
    }
    if (!this.showSecond) {
      if (!this.notShowSecondFormatter) {
        this.notShowSecondFormatter = getFormatter('HH:mm', locale);
      }
      return this.notShowSecondFormatter;
    }
    if (!this.showHour) {
      if (!this.notShowHourFormatter) {
        this.notShowHourFormatter = getFormatter('mm:ss', locale);
      }
      return this.notShowHourFormatter;
    }
    if (!this.normalFormatter) {
      this.normalFormatter = getFormatter('HH:mm:ss', locale);
    }
    return this.normalFormatter;
  },
};
