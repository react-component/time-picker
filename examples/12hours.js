webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(38);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _moment = __webpack_require__(184);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _rcTimePicker = __webpack_require__(185);
	
	var _rcTimePicker2 = _interopRequireDefault(_rcTimePicker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var format = 'h:mm a'; /* eslint no-console:0 */
	
	var now = (0, _moment2.default)().hour(0).minute(0);
	
	function onChange(value) {
	  console.log(value && value.format(format));
	}
	
	_reactDom2.default.render(_react2.default.createElement(_rcTimePicker2.default, {
	  showSecond: false,
	  defaultValue: now,
	  className: 'xxx',
	  onChange: onChange,
	  format: format,
	  use12Hours: true
	}), document.getElementById('__react-content'));

/***/ })
]);
//# sourceMappingURL=12hours.js.map