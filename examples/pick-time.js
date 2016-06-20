webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(218);


/***/ },

/***/ 218:
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
	
	var showSecond = true;
	var str = showSecond ? 'HH:mm:ss' : 'HH:mm';
	
	var formatter = new _gregorianCalendarFormat2['default'](str);
	
	var now = new _gregorianCalendar2['default'](_rcTimePickerSrcLocaleZh_CN2['default'].calendar);
	now.setTime(Date.now());
	
	function onChange(value) {
	  console.log(value && formatter.format(value));
	}
	
	_reactDom2['default'].render(_react2['default'].createElement(_rcTimePicker2['default'], { formatter: formatter, locale: _rcTimePickerSrcLocaleZh_CN2['default'],
	  style: { width: 100 },
	  showSecond: showSecond,
	  defaultValue: now,
	  className: 'xxx',
	  onChange: onChange }), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=pick-time.js.map