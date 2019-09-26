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
    /******/ 'examples/open': 0,
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
  /******/ /******/ deferredModules.push([4, 'common']); // run deferred modules when ready
  /******/ /******/ return checkDeferredModules();
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './examples/open.js':
      /*!**************************!*\
  !*** ./examples/open.js ***!
  \**************************/
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
        /* harmony import */ var rc_time_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! rc-time-picker */ './index.js',
        );
        /* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! moment */ './node_modules/moment/moment.js',
        );
        /* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __webpack_require__.n(
          moment__WEBPACK_IMPORTED_MODULE_4__,
        );
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
              ownKeys(source, true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(source).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }
          return target;
        }

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

        var iconStyle = {
          position: 'absolute',
          width: '24px',
          right: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        };
        var starPath =
          'M908.1 353.1l-253.9-36.9L540.7 86.1c-3' +
          '.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L3' +
          '69.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3-12.3 12' +
          '.7-12.1 32.9 0.6 45.3l183.7 179.1-43.4 252.9c-1.2 6.9' +
          '-0.1 14.1 3.2 20.3 8.2 15.6 27.6 21.7 43.2 13.4L512 7' +
          '54l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-' +
          '19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3' +
          ' 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1' +
          ' 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6' +
          ' 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z';
        var redoPath =
          'M758.2 839.1C851.8 765.9 912 651.9 912' +
          ' 523.9 912 303 733.5 124.3 512.6 124 291.4 123.7 112 ' +
          '302.8 112 523.9c0 125.2 57.5 236.9 147.6 310.2 3.5 2.' +
          '8 8.6 2.2 11.4-1.3l39.4-50.5c2.7-3.4 2.1-8.3-1.2-11.1' +
          '-8.1-6.6-15.9-13.7-23.4-21.2-29.4-29.4-52.5-63.6-68.6' +
          '-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-12' +
          '4.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.' +
          '5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 1' +
          '24.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52' +
          '.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.' +
          '4 85.1-25.1 124.5c-16.1 38.1-39.2 72.3-68.6 101.7-9.3' +
          ' 9.3-19.1 18-29.3 26L668.2 724c-4.1-5.3-12.5-3.5-14.1' +
          ' 3l-39.6 162.2c-1.2 5 2.6 9.9 7.7 9.9l167 0.8c6.7 0 1' +
          '0.5-7.7 6.3-12.9l-37.3-47.9z';

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
                open: false,
                useIcon: false,
              });

              _defineProperty(_assertThisInitialized(_this), 'getIcon', function(path) {
                var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                  'i',
                  {
                    style: _objectSpread(
                      {
                        fontSize: '12px',
                        fontStyle: 'normal',
                        color: '#aaa',
                        display: 'inline-block',
                        lineHeight: '1',
                        width: '20px',
                        transition: 'color 0.3s ease',
                      },
                      style,
                    ),
                  },
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    'svg',
                    {
                      viewBox: '0 0 1024 1024',
                      width: '1em',
                      height: '1em',
                      fill: 'currentColor',
                      style: {
                        verticalAlign: '-.125em',
                      },
                    },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('path', {
                      d: path,
                      'p-id': '5827',
                    }),
                  ),
                );
              });

              _defineProperty(_assertThisInitialized(_this), 'setOpen', function(_ref) {
                var open = _ref.open;

                _this.setState({
                  open: open,
                });
              });

              _defineProperty(_assertThisInitialized(_this), 'toggleOpen', function() {
                var open = _this.state.open;

                _this.setState({
                  open: !open,
                });
              });

              _defineProperty(_assertThisInitialized(_this), 'toggleIcon', function() {
                var useIcon = _this.state.useIcon;

                _this.setState({
                  useIcon: !useIcon,
                });
              });

              return _this;
            }

            _createClass(App, [
              {
                key: 'render',
                value: function render() {
                  var inputIcon = this.getIcon(starPath, iconStyle);
                  var _this$state = this.state,
                    useIcon = _this$state.useIcon,
                    open = _this$state.open;
                  var clearIcon = this.getIcon(
                    redoPath,
                    _objectSpread({}, iconStyle, {
                      right: 20,
                    }),
                  );
                  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                    'div',
                    null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                      'button',
                      {
                        onClick: this.toggleOpen,
                        type: 'button',
                      },
                      'Toggle open',
                    ),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                      'button',
                      {
                        onClick: this.toggleIcon,
                        type: 'button',
                      },
                      'Use Custom Icon',
                    ),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                      rc_time_picker__WEBPACK_IMPORTED_MODULE_3__['default'],
                      {
                        style: {
                          position: 'relative',
                        },
                        defaultValue: moment__WEBPACK_IMPORTED_MODULE_4___default()(
                          '01:02:04',
                          'HH:mm:ss',
                        ),
                        open: open,
                        onOpen: this.setOpen,
                        onClose: this.setOpen,
                        inputIcon: (useIcon && inputIcon) || undefined,
                        clearIcon: (useIcon && clearIcon) || undefined,
                        focusOnOpen: true,
                      },
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

    /***/ 4:
      /*!********************************!*\
  !*** multi ./examples/open.js ***!
  \********************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(/*! ./examples/open.js */ './examples/open.js');

        /***/
      },

    /******/
  },
);
//# sourceMappingURL=open.js.map
