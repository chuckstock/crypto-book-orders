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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("firebase");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _cookieSession = __webpack_require__(5);

var _cookieSession2 = _interopRequireDefault(_cookieSession);

var _passport = __webpack_require__(6);

var _passport2 = _interopRequireDefault(_passport);

var _bodyParser = __webpack_require__(7);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _firebase = __webpack_require__(1);

var _firebase2 = _interopRequireDefault(_firebase);

var _keys = __webpack_require__(8);

var _keys2 = _interopRequireDefault(_keys);

var _api = __webpack_require__(11);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_firebase2.default.initializeApp(_keys2.default.firebase);
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use((0, _cookieSession2.default)({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [_keys2.default.cookieKey]
}));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
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
/* 5 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(9);
} else {
  module.exports = __webpack_require__(10);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  cookieKey: process.env.COOKIE_KEY
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  cookieKey: 'af8fj2ofaf832lfhaf0982lfbasf381lknsafb812nasdkfjnasf891123ncv',
  firebase: {
    apiKey: 'AIzaSyCTUfIsb__NUtdGgDbJyW32gFOMbwmwfPQ',
    authDomain: 'block-talk-34002.firebaseapp.com',
    databaseURL: 'https://block-talk-34002.firebaseio.com',
    projectId: 'block-talk-34002',
    storageBucket: '',
    messagingSenderId: '905203476450'
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _auth = __webpack_require__(12);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/auth', _auth2.default);

exports.default = router;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _firebase = __webpack_require__(1);

var firebase = _interopRequireWildcard(_firebase);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.post('/signup', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.prev = 1;
            _context.next = 4;
            return firebase.auth().createUserWithEmailAndPassword(email, password);

          case 4:
            response = _context.sent;


            res.send(response);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](1);

            res.send(_context.t0);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = router;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ]);