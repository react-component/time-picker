import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Trigger from 'rc-trigger';
import {createChainedFunction} from 'rc-util';
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
    panel: PropTypes.element,
    children: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.object,
    open: PropTypes.bool,
    align: PropTypes.object,
    placement: PropTypes.any,
    transitionName: PropTypes.string,
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
    const { open, value } = this.props;
    return { open, value };
  },

  componentWillMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
  },

  componentWillReceiveProps(nextProps) {
    const { value, open } = nextProps;
    if (value !== undefined) {
      this.setState({value});
    }
    if (open !== undefined) {
      this.setState({open});
    }
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false);
  },

  onPanelChange(value) {
    const props = this.props;
    this.setState({
      value: value,
    });
    props.onChange(value);
  },

  onPanelClear() {
    this.setOpen(false, this.focus);
  },

  onVisibleChange(open) {
    this.setOpen(open, () => {
      if (open) {
        ReactDOM.findDOMNode(this.panelInstance).focus();
      }
    });
  },

  getPanelElement() {
    const panel = this.props.panel;
    const extraProps = {
      ref: this.savePanelRef,
      defaultValue: this.state.value || panel.props.defaultValue,
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

  handleDocumentClick(event) {
    // hide popup when click outside
    if (this.state.open && ReactDOM.findDOMNode(this.panelInstance).contains(event.target)) {
      return;
    }
    this.setState({
      open: false,
    });
  },

  focus() {
    if (!this.state.open) {
      ReactDOM.findDOMNode(this).focus();
    }
  },

  render() {
    const state = this.state;
    const props = this.props;
    const { prefixCls, placement, align, disabled, transitionName, children } = props;
    return (
      <Trigger
        prefixCls={prefixCls}
        popup={this.getPanelElement()}
        popupAlign={align}
        builtinPlacements={placements}
        popupPlacement={placement}
        action={disabled ? [] : ['click']}
        destroyPopupOnHide
        popupTransitionName={transitionName}
        popupVisible={state.open}
        onPopupVisibleChange={this.onVisibleChange}
      >
        <span className={`${prefixCls}-picker`}>
          {children(state, props)}
        </span>
      </Trigger>
    );
  },
});

export default Picker;
