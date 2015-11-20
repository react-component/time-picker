import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Trigger from 'rc-trigger';
import {createChainedFunction} from 'rc-util';
import Panel from './module/Panel';
import placements from './util/placements';
import CommonMixin from './mixin/CommonMixin';

function noop() {
}

function refFn(field, component) {
  this[field] = component;
}

const Picker = React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    inputClassName: PropTypes.string,
    locale: PropTypes.object,
    value: PropTypes.object,
    children: PropTypes.func,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.object,
    open: PropTypes.bool,
    align: PropTypes.object,
    placement: PropTypes.any,
    transitionName: PropTypes.string,
    placeholder: PropTypes.string,
    formatter: PropTypes.object,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  },

  mixins: [CommonMixin],

  getDefaultProps() {
    return {
      open: false,
      align: {},
      placement: 'bottomLeft',
      onChange: noop,
      onOpen: noop,
      onClose: noop,
    };
  },

  getInitialState() {
    this.savePanelRef = refFn.bind(this, 'panelInstance');
    const { open, defaultValue, value } = this.props;
    return {
      open: open,
      value: value || defaultValue,
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
    this.setValue('');
    this.setOpen(false);
  },

  onVisibleChange(open) {
    this.setOpen(open, () => {
      if (open) {
        ReactDOM.findDOMNode(this.refs.picker).blur();
        ReactDOM.findDOMNode(this.panelInstance).focus();
      }
    });
  },

  setValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    this.props.onChange(value);
  },

  getPanel() {
    const { prefixCls, defaultValue, locale, formatter, placeholder, hourOptions, minuteOptions, secondOptions } = this.props;
    return (
      <Panel
        prefixCls={prefixCls}
        defaultValue={defaultValue}
        locale={locale}
        formatter={formatter}
        placeholder={placeholder}
        hourOptions={hourOptions}
        minuteOptions={minuteOptions}
        secondOptions={secondOptions}
      />
    );
  },

  getPanelElement() {
    const panel = this.getPanel();
    const extraProps = {
      ref: this.savePanelRef,
      value: this.state.value,
      onChange: createChainedFunction(panel.props.onChange, this.onPanelChange),
      onClear: createChainedFunction(panel.props.onClear, this.onPanelClear),
    };

    return React.cloneElement(panel, extraProps);
  },

  setOpen(open, callback) {
    const {onOpen, onClose} = this.props;
    if (this.state.open !== open) {
      this.setState({
        open: open,
      }, callback);
      const event = {
        open: open,
      };
      if (open) {
        onOpen(event);
      } else {
        onClose(event);
      }
    }
  },

  render() {
    const { prefixCls, placeholder, placement, align, disabled, transitionName, formatter, inputClassName } = this.props;
    const { open, value } = this.state;

    return (
      <Trigger
        prefixCls={`${prefixCls}-panel`}
        popup={this.getPanelElement()}
        popupAlign={align}
        builtinPlacements={placements}
        popupPlacement={placement}
        action={disabled ? [] : ['click']}
        destroyPopupOnHide
        popupTransitionName={transitionName}
        popupVisible={open}
        onPopupVisibleChange={this.onVisibleChange}
      >
        <span className={`${prefixCls}`}>
          <input className={inputClassName} ref="picker" type="text" placeholder={placeholder} readOnly
                 disabled={disabled} value={value && formatter.format(value)}/>
          <span className={`${prefixCls}-icon`}/>
        </span>
      </Trigger>
    );
  },
});

export default Picker;
