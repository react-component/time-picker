'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Combobox = require('./Combobox');

var _Combobox2 = _interopRequireDefault(_Combobox);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function noop() {}

function generateOptions(length, disabledOptions, hideDisabledOptions) {
  var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  var arr = [];
  for (var value = 0; value < length; value += step) {
    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
      arr.push(value);
    }
  }
  return arr;
}

var Panel = function (_Component) {
  (0, _inherits3['default'])(Panel, _Component);

  function Panel(props) {
    (0, _classCallCheck3['default'])(this, Panel);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

    _this.onChange = function (newValue) {
      _this.setState({ value: newValue });
      _this.props.onChange(newValue);
    };

    _this.onCurrentSelectPanelChange = function (currentSelectPanel) {
      _this.setState({ currentSelectPanel: currentSelectPanel });
    };

    _this.state = {
      value: props.value,
      selectionRange: []
    };
    return _this;
  }

  (0, _createClass3['default'])(Panel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value;
      if (value) {
        this.setState({
          value: value
        });
      }
    }
  }, {
    key: 'close',


    // https://github.com/ant-design/ant-design/issues/5829
    value: function close() {
      this.props.onEsc();
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          prefixCls = _props.prefixCls,
          className = _props.className,
          placeholder = _props.placeholder,
          disabledHours = _props.disabledHours,
          disabledMinutes = _props.disabledMinutes,
          disabledSeconds = _props.disabledSeconds,
          hideDisabledOptions = _props.hideDisabledOptions,
          allowEmpty = _props.allowEmpty,
          showHour = _props.showHour,
          showMinute = _props.showMinute,
          showSecond = _props.showSecond,
          format = _props.format,
          defaultOpenValue = _props.defaultOpenValue,
          clearText = _props.clearText,
          onEsc = _props.onEsc,
          onTab = _props.onTab,
          addon = _props.addon,
          use12Hours = _props.use12Hours,
          onClear = _props.onClear,
          focusOnOpen = _props.focusOnOpen,
          onKeyDown = _props.onKeyDown,
          hourStep = _props.hourStep,
          minuteStep = _props.minuteStep,
          secondStep = _props.secondStep;
      var _state = this.state,
          value = _state.value,
          currentSelectPanel = _state.currentSelectPanel;

      var disabledHourOptions = disabledHours();
      var disabledMinuteOptions = disabledMinutes(value ? value.hour() : null);
      var disabledSecondOptions = disabledSeconds(value ? value.hour() : null, value ? value.minute() : null);
      var hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions, hourStep);
      var minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions, minuteStep);
      var secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions, secondStep);

      return _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-inner', true), (0, _defineProperty3['default'])(_classNames, className, !!className), _classNames)) },
        _react2['default'].createElement(_Header2['default'], {
          clearText: clearText,
          prefixCls: prefixCls,
          defaultOpenValue: defaultOpenValue,
          value: value,
          currentSelectPanel: currentSelectPanel,
          onEsc: onEsc,
          onTab: onTab,
          format: format,
          placeholder: placeholder,
          hourOptions: hourOptions,
          minuteOptions: minuteOptions,
          secondOptions: secondOptions,
          disabledHours: disabledHours,
          disabledMinutes: disabledMinutes,
          disabledSeconds: disabledSeconds,
          onChange: this.onChange,
          onClear: onClear,
          allowEmpty: allowEmpty,
          focusOnOpen: focusOnOpen,
          onKeyDown: onKeyDown
        }),
        _react2['default'].createElement(_Combobox2['default'], {
          prefixCls: prefixCls,
          value: value,
          defaultOpenValue: defaultOpenValue,
          format: format,
          onChange: this.onChange,
          showHour: showHour,
          showMinute: showMinute,
          showSecond: showSecond,
          hourOptions: hourOptions,
          minuteOptions: minuteOptions,
          secondOptions: secondOptions,
          disabledHours: disabledHours,
          disabledMinutes: disabledMinutes,
          disabledSeconds: disabledSeconds,
          onCurrentSelectPanelChange: this.onCurrentSelectPanelChange,
          use12Hours: use12Hours
        }),
        addon(this)
      );
    }
  }]);
  return Panel;
}(_react.Component);

Panel.propTypes = {
  clearText: _propTypes2['default'].string,
  prefixCls: _propTypes2['default'].string,
  className: _propTypes2['default'].string,
  defaultOpenValue: _propTypes2['default'].object,
  value: _propTypes2['default'].object,
  placeholder: _propTypes2['default'].string,
  format: _propTypes2['default'].string,
  disabledHours: _propTypes2['default'].func,
  disabledMinutes: _propTypes2['default'].func,
  disabledSeconds: _propTypes2['default'].func,
  hideDisabledOptions: _propTypes2['default'].bool,
  onChange: _propTypes2['default'].func,
  onEsc: _propTypes2['default'].func,
  onTab: _propTypes2['default'].func,
  allowEmpty: _propTypes2['default'].bool,
  showHour: _propTypes2['default'].bool,
  showMinute: _propTypes2['default'].bool,
  showSecond: _propTypes2['default'].bool,
  onClear: _propTypes2['default'].func,
  use12Hours: _propTypes2['default'].bool,
  hourStep: _propTypes2['default'].number,
  minuteStep: _propTypes2['default'].number,
  secondStep: _propTypes2['default'].number,
  addon: _propTypes2['default'].func,
  focusOnOpen: _propTypes2['default'].bool,
  onKeyDown: _propTypes2['default'].func
};
Panel.defaultProps = {
  prefixCls: 'rc-time-picker-panel',
  onChange: noop,
  onClear: noop,
  disabledHours: noop,
  disabledMinutes: noop,
  disabledSeconds: noop,
  defaultOpenValue: (0, _moment2['default'])(),
  use12Hours: false,
  addon: noop,
  onKeyDown: noop
};
exports['default'] = Panel;
module.exports = exports['default'];