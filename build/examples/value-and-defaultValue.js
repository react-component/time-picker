/******/ (function(modules) {
  // webpackBootstrap
  /******/ // install a JSONP callback for chunk loading
  /******/ function webpackJsonpCallback(data) {
    /******/ var chunkIds = data[0];
    /******/ var moreModules = data[1];
    /******/ var executeModules = data[2]; // add "moreModules" to the modules object, // then flag all "chunkIds" as loaded and fire callback
    /******/
    /******/ /******/ /******/ var moduleId,
      chunkId,
      i = 0,
      resolves = [];
    /******/ for (; i < chunkIds.length; i++) {
      /******/ chunkId = chunkIds[i];
      /******/ if (
        Object.prototype.hasOwnProperty.call(installedChunks, chunkId) &&
        installedChunks[chunkId]
      ) {
        /******/ resolves.push(installedChunks[chunkId][0]);
        /******/
      }
      /******/ installedChunks[chunkId] = 0;
      /******/
    }
    /******/ for (moduleId in moreModules) {
      /******/ if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        /******/ modules[moduleId] = moreModules[moduleId];
        /******/
      }
      /******/
    }
    /******/ if (parentJsonpFunction) parentJsonpFunction(data);
    /******/
    /******/ while (resolves.length) {
      /******/ resolves.shift()();
      /******/
    } // add entry modules from loaded chunk to deferred list
    /******/
    /******/ /******/ deferredModules.push.apply(deferredModules, executeModules || []); // run deferred modules when all chunks ready
    /******/
    /******/ /******/ return checkDeferredModules();
    /******/
  }
  /******/ function checkDeferredModules() {
    /******/ var result;
    /******/ for (var i = 0; i < deferredModules.length; i++) {
      /******/ var deferredModule = deferredModules[i];
      /******/ var fulfilled = true;
      /******/ for (var j = 1; j < deferredModule.length; j++) {
        /******/ var depId = deferredModule[j];
        /******/ if (installedChunks[depId] !== 0) fulfilled = false;
        /******/
      }
      /******/ if (fulfilled) {
        /******/ deferredModules.splice(i--, 1);
        /******/ result = __webpack_require__((__webpack_require__.s = deferredModule[0]));
        /******/
      }
      /******/
    }
    /******/
    /******/ return result;
    /******/
  } // The module cache
  /******/
  /******/ /******/ var installedModules = {}; // object to store loaded and loading chunks // undefined = chunk not loaded, null = chunk preloaded/prefetched // Promise = chunk loading, 0 = chunk loaded
  /******/
  /******/ /******/ /******/ /******/ var installedChunks = {
    /******/ 'examples/value-and-defaultValue': 0,
    /******/
  };
  /******/
  /******/ var deferredModules = []; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__,
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode,
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key),
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '';
  /******/
  /******/ var jsonpArray = (window['webpackJsonp'] = window['webpackJsonp'] || []);
  /******/ var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  /******/ jsonpArray.push = webpackJsonpCallback;
  /******/ jsonpArray = jsonpArray.slice();
  /******/ for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  /******/ var parentJsonpFunction = oldJsonpFunction; // add entry module to deferred list
  /******/
  /******/
  /******/ /******/ deferredModules.push([7, 'common']); // run deferred modules when ready
  /******/ /******/ return checkDeferredModules();
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './examples/value-and-defaultValue.js':
      /*!********************************************!*\
  !*** ./examples/value-and-defaultValue.js ***!
  \********************************************/
      /*! no exports provided */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var rc_time_picker_assets_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! rc-time-picker/assets/index.less */ './assets/index.less',
        );
        /* harmony import */ var rc_time_picker_assets_index_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          rc_time_picker_assets_index_less__WEBPACK_IMPORTED_MODULE_0__,
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! react */ './node_modules/react/index.js',
        );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
          react__WEBPACK_IMPORTED_MODULE_1__,
        );
        /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! react-dom */ './node_modules/react-dom/index.js',
        );
        /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
          react_dom__WEBPACK_IMPORTED_MODULE_2__,
        );
        /* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! moment */ './node_modules/moment/moment.js',
        );
        /* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(
          moment__WEBPACK_IMPORTED_MODULE_3__,
        );
        /* harmony import */ var rc_time_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! rc-time-picker */ './index.js',
        );
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (typeof call === 'object' || typeof call === 'function')) {
            return call;
          }
          return _assertThisInitialized(self);
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function _getPrototypeOf(o) {
                return o.__proto__ || Object.getPrototypeOf(o);
              };
          return _getPrototypeOf(o);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }
          return self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function');
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: { value: subClass, writable: true, configurable: true },
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf =
            Object.setPrototypeOf ||
            function _setPrototypeOf(o, p) {
              o.__proto__ = p;
              return o;
            };
          return _setPrototypeOf(o, p);
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true,
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }

        /* eslint no-console:0 */

        var App =
          /*#__PURE__*/
          (function(_React$Component) {
            _inherits(App, _React$Component);

            function App() {
              var _getPrototypeOf2;

              var _this;

              _classCallCheck(this, App);

              for (
                var _len = arguments.length, args = new Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                args[_key] = arguments[_key];
              }

              _this = _possibleConstructorReturn(
                this,
                (_getPrototypeOf2 = _getPrototypeOf(App)).call.apply(
                  _getPrototypeOf2,
                  [this].concat(args),
                ),
              );

              _defineProperty(_assertThisInitialized(_this), 'state', {
                value: moment__WEBPACK_IMPORTED_MODULE_3___default()(),
              });

              _defineProperty(_assertThisInitialized(_this), 'handleValueChange', function(value) {
                console.log(value && value.format('HH:mm:ss'));

                _this.setState({
                  value: value,
                });
              });

              _defineProperty(_assertThisInitialized(_this), 'clear', function() {
                _this.setState({
                  value: undefined,
                });
              });

              return _this;
            }

            _createClass(App, [
              {
                key: 'render',
                value: function render() {
                  var value = this.state.value;
                  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    'div',
                    null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                      rc_time_picker__WEBPACK_IMPORTED_MODULE_4__['default'],
                      {
                        defaultValue: value,
                        onChange: this.handleValueChange,
                      },
                    ),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                      rc_time_picker__WEBPACK_IMPORTED_MODULE_4__['default'],
                      {
                        value: value,
                        onChange: this.handleValueChange,
                      },
                    ),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                      'button',
                      {
                        onClick: this.clear,
                        type: 'button',
                      },
                      'clear',
                    ),
                  );
                },
              },
            ]);

            return App;
          })(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

        react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render(
          react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(App, null),
          document.getElementById('__react-content'),
        );

        /***/
      },

    /***/ 7:
      /*!**************************************************!*\
  !*** multi ./examples/value-and-defaultValue.js ***!
  \**************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
          /*! ./examples/value-and-defaultValue.js */ './examples/value-and-defaultValue.js',
        );

        /***/
      },

    /******/
  },
);
//# sourceMappingURL=value-and-defaultValue.js.map
