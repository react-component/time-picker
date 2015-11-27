import {PropTypes} from 'react';
import enUs from '../locale/en_US';

export default {
  propTypes: {
    prefixCls: PropTypes.string,
    locale: PropTypes.object,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-time-picker',
      locale: enUs,
    };
  },
};
