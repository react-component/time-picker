webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(219);


/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	/* eslint no-console:0 */
	
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(160);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _gregorianCalendar = __webpack_require__(161);
	
	var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);
	
	var _gregorianCalendarFormat = __webpack_require__(165);
	
	var _gregorianCalendarFormat2 = _interopRequireDefault(_gregorianCalendarFormat);
	
	var _rcTimePicker = __webpack_require__(168);
	
	var _rcTimePicker2 = _interopRequireDefault(_rcTimePicker);
	
	var _rcTimePickerSrcLocaleZh_CN = __webpack_require__(214);
	
	var _rcTimePickerSrcLocaleZh_CN2 = _interopRequireDefault(_rcTimePickerSrcLocaleZh_CN);
	
	var formatter = new _gregorianCalendarFormat2['default']('HH:mm:ss');
	
	var now = new _gregorianCalendar2['default'](_rcTimePickerSrcLocaleZh_CN2['default'].calendar);
	now.setTime(Date.now());
	
	var App = _react2['default'].createClass({
	  displayName: 'App',
	
	  getInitialState: function getInitialState() {
	    return {
	      value: now
	    };
	  },
	  handleValueChange: function handleValueChange(value) {
	    console.log(value && formatter.format(value));
	    this.setState({ value: value });
	  },
	  clear: function clear() {
	    this.setState({
	      value: undefined
	    });
	  },
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(_rcTimePicker2['default'], { formatter: formatter, locale: _rcTimePickerSrcLocaleZh_CN2['default'],
	        defaultValue: now }),
	      _react2['default'].createElement(_rcTimePicker2['default'], { formatter: formatter, locale: _rcTimePickerSrcLocaleZh_CN2['default'],
	        value: this.state.value,
	        onChange: this.handleValueChange }),
	      _react2['default'].createElement(
	        'button',
	        { onClick: this.clear },
	        'clear'
	      )
	    );
	  }
	});
	
	_reactDom2['default'].render(_react2['default'].createElement(App, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=value-and-defaultValue.js.map