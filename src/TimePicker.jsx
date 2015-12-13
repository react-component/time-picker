import React, {PropTypes} from 'react';
import Trigger from 'rc-trigger';
import Panel from './module/Panel';
import placements from './util/placements';
import CommonMixin from './mixin/CommonMixin';
import {getFormatter} from './util/index';
import defaultGregorianCalendarLocale from 'gregorian-calendar/lib/locale/en_US';

function noop() {
}

function refFn(field, component) {
  this[field] = component;
}

const Picker = React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    locale: PropTypes.object,
    value: PropTypes.object,
    disabled: PropTypes.bool,
    allowEmpty: PropTypes.bool,
    defaultValue: PropTypes.object,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    align: PropTypes.object,
    placement: PropTypes.any,
    transitionName: PropTypes.string,
    getPopupContainer: PropTypes.func,
    gregorianCalendarLocale: PropTypes.object,
    placeholder: PropTypes.string,
    formatter: PropTypes.any,
    showHour: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    showSecond: PropTypes.bool,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    hideDisabledOptions: PropTypes.bool,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  },

  mixins: [CommonMixin],

  getDefaultProps() {
    return {
      defaultOpen: false,
      style: {},
      className: '',
      gregorianCalendarLocale: defaultGregorianCalendarLocale,
      align: {},
      allowEmpty: true,
      showHour: true,
      showSecond: true,
      disabledHours: noop,
      disabledMinutes: noop,
      disabledSeconds: noop,
      hideDisabledOptions: false,
      placement: 'bottomLeft',
      onChange: noop,
      onOpen: noop,
      onClose: noop,
    };
  },

  getInitialState() {
    this.savePanelRef = refFn.bind(this, 'panelInstance');
    const { defaultOpen, defaultValue, open = defaultOpen, value = defaultValue } = this.props;
    return {
      open,
      value,
    };
  },

  componentWillReceiveProps(nextProps) {
    const { value, open } = nextProps;
    if (value !== undefined) {
      this.setState({
        value,
      });
    }
    if (open !== undefined) {
      this.setState({open});
    }
  },

  onPanelChange(value) {
    this.setValue(value);
  },

  onPanelClear() {
    this.setValue(null);
    this.setOpen(false);
  },

  onVisibleChange(open) {
    this.setOpen(open);
  },

  onEsc() {
    this.setOpen(false);
    this.refs.picker.focus();
  },

  onKeyDown(e) {
    if (e.keyCode === 40) {
      this.setOpen(true);
    }
  },

  setValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    this.props.onChange(value);
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
    if (!this.props.showSecond) {
      if (!this.notShowSecondFormatter) {
        this.notShowSecondFormatter = getFormatter('HH:mm', locale);
      }
      return this.notShowSecondFormatter;
    }
    if (!this.props.showHour) {
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

  getPanelElement() {
    const { prefixCls, defaultValue, locale, placeholder, disabledHours, disabledMinutes, disabledSeconds, hideDisabledOptions, allowEmpty, showHour, showSecond, gregorianCalendarLocale, value } = this.props;
    let calendarLocale;
    if (value) {
      calendarLocale = value.locale;
    } else if (defaultValue) {
      calendarLocale = defaultValue.locale;
    } else {
      calendarLocale = gregorianCalendarLocale;
    }
    return (
      <Panel
        prefixCls={`${prefixCls}-panel`}
        ref={this.savePanelRef}
        value={this.state.value}
        onChange={this.onPanelChange}
        gregorianCalendarLocale={calendarLocale}
        onClear={this.onPanelClear}
        defaultValue={defaultValue}
        showHour={showHour}
        onEsc={this.onEsc}
        showSecond={showSecond}
        locale={locale}
        allowEmpty={allowEmpty}
        formatter={this.getFormatter()}
        placeholder={placeholder}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
        hideDisabledOptions={hideDisabledOptions}
      />
    );
  },

  setOpen(open, callback) {
    const {onOpen, onClose} = this.props;
    if (this.state.open !== open) {
      this.setState({
        open,
      }, callback);
      const event = {
        open,
      };
      if (open) {
        onOpen(event);
      } else {
        onClose(event);
      }
    }
  },

  render() {
    const { prefixCls, placeholder, placement, align, disabled, transitionName, style, className, showHour, showSecond, getPopupContainer } = this.props;
    const { open, value } = this.state;
    let popupClassName;
    if (!showHour || !showSecond) {
      popupClassName = `${prefixCls}-panel-narrow`;
    }
    return (
      <Trigger
        prefixCls={`${prefixCls}-panel`}
        popupClassName={popupClassName}
        popup={this.getPanelElement()}
        popupAlign={align}
        builtinPlacements={placements}
        popupPlacement={placement}
        action={disabled ? [] : ['click']}
        destroyPopupOnHide
        getPopupContainer={getPopupContainer}
        popupTransitionName={transitionName}
        popupVisible={open}
        onPopupVisibleChange={this.onVisibleChange}
      >
        <span className={`${prefixCls} ${className}`} style={style}>
          <input className={`${prefixCls}-input`}
                 ref="picker" type="text" placeholder={placeholder}
                 readOnly
                 onKeyDown={this.onKeyDown}
                 disabled={disabled} value={value && this.getFormatter().format(value)}/>
          <span className={`${prefixCls}-icon`}/>
        </span>
      </Trigger>
    );
  },
});

export default Picker;
