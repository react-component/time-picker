webpackJsonp([5],{

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_time_picker_assets_index_less__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_time_picker_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rc_time_picker_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_time_picker__ = __webpack_require__(22);
/* eslint no-console:0 */










var showSecond = true;
var str = showSecond ? 'HH:mm:ss' : 'HH:mm';

var now = __WEBPACK_IMPORTED_MODULE_3_moment___default()().hour(14).minute(30);

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

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_rc_time_picker__["a" /* default */], {
  showSecond: showSecond,
  defaultValue: now,
  className: 'xxx',
  onChange: onChange,
  disabledHours: disabledHours,
  disabledMinutes: disabledMinutes,
  disabledSeconds: disabledSeconds
}), document.getElementById('__react-content'));

/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(144);


/***/ })

},[326]);
//# sourceMappingURL=disabled.js.map