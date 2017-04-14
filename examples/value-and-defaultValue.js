webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(322);


/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(188);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(189);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(258);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
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
	
	var App = function (_React$Component) {
	  (0, _inherits3.default)(App, _React$Component);
	
	  function App() {
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, App);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
	      value: (0, _moment2.default)()
	    }, _this.handleValueChange = function (value) {
	      console.log(value && value.format('HH:mm:ss'));
	      _this.setState({ value: value });
	    }, _this.clear = function () {
	      _this.setState({
	        value: undefined
	      });
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  App.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_rcTimePicker2.default, {
	        defaultValue: this.state.value,
	        onChange: this.handleValueChange
	      }),
	      _react2.default.createElement(_rcTimePicker2.default, {
	        value: this.state.value,
	        onChange: this.handleValueChange
	      }),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.clear },
	        'clear'
	      )
	    );
	  };
	
	  return App;
	}(_react2.default.Component); /* eslint no-console:0 */
	
	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=value-and-defaultValue.js.map