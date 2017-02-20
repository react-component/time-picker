webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _moment = __webpack_require__(180);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _rcTimePicker = __webpack_require__(181);
	
	var _rcTimePicker2 = _interopRequireDefault(_rcTimePicker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var showSecond = true; /* eslint no-console:0 */
	
	var str = showSecond ? 'HH:mm:ss' : 'HH:mm';
	
	var now = (0, _moment2.default)().hour(14).minute(30);
	
	function generateOptions(length, excludedOptions) {
	  var arr = [];
	  for (var value = 0; value < length; value++) {
	    if (excludedOptions.indexOf(value) < 0) {
	      arr.push(value);
	    }
	  }
	  return arr;
	}
	
	function onChange(value) {
	  console.log(value && value.format(str));
	}
	
	function disabledHours() {
	  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23];
	}
	
	function disabledMinutes(h) {
	  switch (h) {
	    case 9:
	      return generateOptions(60, [30]);
	    case 21:
	      return generateOptions(60, [0]);
	    default:
	      return generateOptions(60, [0, 30]);
	  }
	}
	
	function disabledSeconds(h, m) {
	  return [h + m % 60];
	}
	
	_reactDom2.default.render(_react2.default.createElement(_rcTimePicker2.default, {
	  showSecond: showSecond,
	  defaultValue: now,
	  className: 'xxx',
	  onChange: onChange,
	  disabledHours: disabledHours,
	  disabledMinutes: disabledMinutes,
	  disabledSeconds: disabledSeconds
	}), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=disabled.js.map