webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(269);


/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTimePicker = __webpack_require__(181);
	
	var _rcTimePicker2 = _interopRequireDefault(_rcTimePicker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint no-console:0 */
	
	var App = _react2.default.createClass({
	  displayName: 'App',
	  getInitialState: function getInitialState() {
	    return {
	      open: false
	    };
	  },
	  setOpen: function setOpen(_ref) {
	    var open = _ref.open;
	
	    this.setState({ open: open });
	  },
	  toggleOpen: function toggleOpen() {
	    this.setState({
	      open: !this.state.open
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'button',
	        { onClick: this.toggleOpen },
	        'Toggle open'
	      ),
	      _react2.default.createElement(_rcTimePicker2.default, { open: this.state.open, onOpen: this.setOpen, onClose: this.setOpen })
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=open.js.map