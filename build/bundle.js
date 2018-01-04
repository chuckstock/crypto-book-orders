/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(5);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _keys = __webpack_require__(6);

var _keys2 = _interopRequireDefault(_keys);

var _api = __webpack_require__(9);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use('/api', _api2.default);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(_express2.default.static('client/build'));

  // Express will serve index.html if it doesn't recognize route
  var path = __webpack_require__(13);
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

var PORT = process.env.PORT || 5000;
app.listen(PORT);
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(7);
} else {
  module.exports = __webpack_require__(8);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _exchanges = __webpack_require__(10);

var _exchanges2 = _interopRequireDefault(_exchanges);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/exchanges', _exchanges2.default);

exports.default = router;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(11);

var _lodash2 = _interopRequireDefault(_lodash);

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _ccxt = __webpack_require__(12);

var _ccxt2 = _interopRequireDefault(_ccxt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var orderBooks = [];

var router = _express2.default.Router();

router.get('/order_books/:pairFirst/:pairSecond', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$params, pairFirst, pairSecond, pair, _createCombinedOBData, poloniex, bittrex, poloOB, bittrexOB;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$params = req.params, pairFirst = _req$params.pairFirst, pairSecond = _req$params.pairSecond;
            pair = pairFirst + '/' + pairSecond;
            _context.prev = 2;
            poloniex = new _ccxt2.default.poloniex();
            bittrex = new _ccxt2.default.bittrex();
            _context.next = 7;
            return poloniex.loadMarkets();

          case 7:
            _context.next = 9;
            return bittrex.loadMarkets();

          case 9:
            _context.next = 11;
            return poloniex.fetchOrderBook(pair);

          case 11:
            poloOB = _context.sent;
            _context.next = 14;
            return bittrex.fetchOrderBook(pair);

          case 14:
            bittrexOB = _context.sent;


            res.send(createCombinedOBData((_createCombinedOBData = {}, _defineProperty(_createCombinedOBData, poloniex.id, poloOB), _defineProperty(_createCombinedOBData, bittrex.id, bittrexOB), _createCombinedOBData)));
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context['catch'](2);

            res.send(_context.t0);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 18]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

router.get('/exchange_symbols', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var poloniex, bittrex;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            poloniex = new _ccxt2.default.poloniex();
            bittrex = new _ccxt2.default.bittrex();
            _context2.next = 5;
            return poloniex.loadMarkets();

          case 5:
            _context2.next = 7;
            return bittrex.loadMarkets();

          case 7:

            res.send(getCommonExchangeSymbols([poloniex.symbols, bittrex.symbols]));
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](0);

            res.send(_context2.t0);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 10]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// Only show symbols that are available on both exchanges
function getCommonExchangeSymbols(exchangeSymbols) {
  return exchangeSymbols[0].filter(function (x) {
    return exchangeSymbols.every(function (y) {
      if (y.indexOf(x) != -1) {
        y[y.indexOf(x)] = Infinity;
        return true;
      }
      return false;
    });
  });
}

function createCombinedOBData(data) {
  var results = { asks: {}, bids: {} };
  Object.keys(data).forEach(function (exchange) {
    Object.keys(results).forEach(function (orderType) {
      var priceAndVolume = data[exchange][orderType];

      priceAndVolume.forEach(function (data) {
        var price = data[0];
        var volume = data[1];

        // If the price exists, add the exchange to the price
        if (results[orderType][price]) {
          results[orderType][price].exchanges.push(exchange);
          results[orderType][price].volume += volume;
        } else {
          results[orderType][price] = { volume: volume, exchanges: [exchange] };
        }
      });
    });
  });

  return results;
}

exports.default = router;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("ccxt");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ]);