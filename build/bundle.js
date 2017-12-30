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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var pause = __webpack_require__(12)
  , util = __webpack_require__(13)
  , Strategy = __webpack_require__(2);


/**
 * `SessionStrategy` constructor.
 *
 * @api public
 */
function SessionStrategy(options, deserializeUser) {
  if (typeof options == 'function') {
    deserializeUser = options;
    options = undefined;
  }
  options = options || {};
  
  Strategy.call(this);
  this.name = 'session';
  this._deserializeUser = deserializeUser;
}

/**
 * Inherit from `Strategy`.
 */
util.inherits(SessionStrategy, Strategy);

/**
 * Authenticate request based on the current session state.
 *
 * The session authentication strategy uses the session to restore any login
 * state across requests.  If a login session has been established, `req.user`
 * will be populated with the current user.
 *
 * This strategy is registered automatically by Passport.
 *
 * @param {Object} req
 * @param {Object} options
 * @api protected
 */
SessionStrategy.prototype.authenticate = function(req, options) {
  if (!req._passport) { return this.error(new Error('passport.initialize() middleware not in use')); }
  options = options || {};

  var self = this, 
      su;
  if (req._passport.session) {
    su = req._passport.session.user;
  }

  if (su || su === 0) {
    // NOTE: Stream pausing is desirable in the case where later middleware is
    //       listening for events emitted from request.  For discussion on the
    //       matter, refer to: https://github.com/jaredhanson/passport/pull/106
    
    var paused = options.pauseStream ? pause(req) : null;
    this._deserializeUser(su, req, function(err, user) {
      if (err) { return self.error(err); }
      if (!user) {
        delete req._passport.session.user;
      } else {
        // TODO: Remove instance access
        var property = req._passport.instance._userProperty || 'user';
        req[property] = user;
      }
      self.pass();
      if (paused) {
        paused.resume();
      }
    });
  } else {
    self.pass();
  }
};


/**
 * Expose `SessionStrategy`.
 */
module.exports = SessionStrategy;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var Strategy = __webpack_require__(14);


/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var initialize = __webpack_require__(16)
  , authenticate = __webpack_require__(17);
  
/**
 * Framework support for Connect/Express.
 *
 * This module provides support for using Passport with Express.  It exposes
 * middleware that conform to the `fn(req, res, next)` signature and extends
 * Node's built-in HTTP request object with useful authentication-related
 * functions.
 *
 * @return {Object}
 * @api protected
 */
exports = module.exports = function() {
  
  // HTTP extensions.
  exports.__monkeypatchNode();
  
  return {
    initialize: initialize,
    authenticate: authenticate
  };
};

exports.__monkeypatchNode = function() {
  var http = __webpack_require__(4);
  var IncomingMessageExt = __webpack_require__(5);
  
  http.IncomingMessage.prototype.login =
  http.IncomingMessage.prototype.logIn = IncomingMessageExt.logIn;
  http.IncomingMessage.prototype.logout =
  http.IncomingMessage.prototype.logOut = IncomingMessageExt.logOut;
  http.IncomingMessage.prototype.isAuthenticated = IncomingMessageExt.isAuthenticated;
  http.IncomingMessage.prototype.isUnauthenticated = IncomingMessageExt.isUnauthenticated;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Module dependencies.
 */
//var http = require('http')
//  , req = http.IncomingMessage.prototype;


var req = exports = module.exports = {};

/**
 * Initiate a login session for `user`.
 *
 * Options:
 *   - `session`  Save login state in session, defaults to _true_
 *
 * Examples:
 *
 *     req.logIn(user, { session: false });
 *
 *     req.logIn(user, function(err) {
 *       if (err) { throw err; }
 *       // session saved
 *     });
 *
 * @param {User} user
 * @param {Object} options
 * @param {Function} done
 * @api public
 */
req.login =
req.logIn = function(user, options, done) {
  if (typeof options == 'function') {
    done = options;
    options = {};
  }
  options = options || {};
  
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  var session = (options.session === undefined) ? true : options.session;
  
  this[property] = user;
  if (session) {
    if (!this._passport) { throw new Error('passport.initialize() middleware not in use'); }
    if (typeof done != 'function') { throw new Error('req#login requires a callback function'); }
    
    var self = this;
    this._passport.instance._sm.logIn(this, user, function(err) {
      if (err) { self[property] = null; return done(err); }
      done();
    });
  } else {
    done && done();
  }
};

/**
 * Terminate an existing login session.
 *
 * @api public
 */
req.logout =
req.logOut = function() {
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  
  this[property] = null;
  if (this._passport) {
    this._passport.instance._sm.logOut(this);
  }
};

/**
 * Test if request is authenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isAuthenticated = function() {
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  
  return (this[property]) ? true : false;
};

/**
 * Test if request is unauthenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isUnauthenticated = function() {
  return !this.isAuthenticated();
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
module.exports = __webpack_require__(8);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _cookieSession = __webpack_require__(9);

var _cookieSession2 = _interopRequireDefault(_cookieSession);

var _passport = __webpack_require__(10);

var _passport2 = _interopRequireDefault(_passport);

var _bodyParser = __webpack_require__(19);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _keys = __webpack_require__(20);

var _keys2 = _interopRequireDefault(_keys);

var _api = __webpack_require__(23);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

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
  var path = __webpack_require__(27);
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

var PORT = process.env.PORT || 5000;
app.listen(PORT);
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var Passport = __webpack_require__(11)
  , SessionStrategy = __webpack_require__(1);


/**
 * Export default singleton.
 *
 * @api public
 */
exports = module.exports = new Passport();

/**
 * Expose constructors.
 */
exports.Passport =
exports.Authenticator = Passport;
exports.Strategy = __webpack_require__(2);

/**
 * Expose strategies.
 */
exports.strategies = {};
exports.strategies.SessionStrategy = SessionStrategy;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var SessionStrategy = __webpack_require__(1)
  , SessionManager = __webpack_require__(15);


/**
 * `Authenticator` constructor.
 *
 * @api public
 */
function Authenticator() {
  this._key = 'passport';
  this._strategies = {};
  this._serializers = [];
  this._deserializers = [];
  this._infoTransformers = [];
  this._framework = null;
  this._userProperty = 'user';
  
  this.init();
}

/**
 * Initialize authenticator.
 *
 * @api protected
 */
Authenticator.prototype.init = function() {
  this.framework(__webpack_require__(3)());
  this.use(new SessionStrategy(this.deserializeUser.bind(this)));
  this._sm = new SessionManager({ key: this._key }, this.serializeUser.bind(this));
};

/**
 * Utilize the given `strategy` with optional `name`, overridding the strategy's
 * default name.
 *
 * Examples:
 *
 *     passport.use(new TwitterStrategy(...));
 *
 *     passport.use('api', new http.BasicStrategy(...));
 *
 * @param {String|Strategy} name
 * @param {Strategy} strategy
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.use = function(name, strategy) {
  if (!strategy) {
    strategy = name;
    name = strategy.name;
  }
  if (!name) { throw new Error('Authentication strategies must have a name'); }
  
  this._strategies[name] = strategy;
  return this;
};

/**
 * Un-utilize the `strategy` with given `name`.
 *
 * In typical applications, the necessary authentication strategies are static,
 * configured once and always available.  As such, there is often no need to
 * invoke this function.
 *
 * However, in certain situations, applications may need dynamically configure
 * and de-configure authentication strategies.  The `use()`/`unuse()`
 * combination satisfies these scenarios.
 *
 * Examples:
 *
 *     passport.unuse('legacy-api');
 *
 * @param {String} name
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.unuse = function(name) {
  delete this._strategies[name];
  return this;
};

/**
 * Setup Passport to be used under framework.
 *
 * By default, Passport exposes middleware that operate using Connect-style
 * middleware using a `fn(req, res, next)` signature.  Other popular frameworks
 * have different expectations, and this function allows Passport to be adapted
 * to operate within such environments.
 *
 * If you are using a Connect-compatible framework, including Express, there is
 * no need to invoke this function.
 *
 * Examples:
 *
 *     passport.framework(require('hapi-passport')());
 *
 * @param {Object} name
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.framework = function(fw) {
  this._framework = fw;
  return this;
};

/**
 * Passport's primary initialization middleware.
 *
 * This middleware must be in use by the Connect/Express application for
 * Passport to operate.
 *
 * Options:
 *   - `userProperty`  Property to set on `req` upon login, defaults to _user_
 *
 * Examples:
 *
 *     app.use(passport.initialize());
 *
 *     app.use(passport.initialize({ userProperty: 'currentUser' }));
 *
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.initialize = function(options) {
  options = options || {};
  this._userProperty = options.userProperty || 'user';
  
  return this._framework.initialize(this, options);
};

/**
 * Middleware that will authenticate a request using the given `strategy` name,
 * with optional `options` and `callback`.
 *
 * Examples:
 *
 *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })(req, res);
 *
 *     passport.authenticate('local', function(err, user) {
 *       if (!user) { return res.redirect('/login'); }
 *       res.end('Authenticated!');
 *     })(req, res);
 *
 *     passport.authenticate('basic', { session: false })(req, res);
 *
 *     app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
 *       // request will be redirected to Twitter
 *     });
 *     app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res) {
 *       res.json(req.user);
 *     });
 *
 * @param {String} strategy
 * @param {Object} options
 * @param {Function} callback
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.authenticate = function(strategy, options, callback) {
  return this._framework.authenticate(this, strategy, options, callback);
};

/**
 * Middleware that will authorize a third-party account using the given
 * `strategy` name, with optional `options`.
 *
 * If authorization is successful, the result provided by the strategy's verify
 * callback will be assigned to `req.account`.  The existing login session and
 * `req.user` will be unaffected.
 *
 * This function is particularly useful when connecting third-party accounts
 * to the local account of a user that is currently authenticated.
 *
 * Examples:
 *
 *    passport.authorize('twitter-authz', { failureRedirect: '/account' });
 *
 * @param {String} strategy
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.authorize = function(strategy, options, callback) {
  options = options || {};
  options.assignProperty = 'account';
  
  var fn = this._framework.authorize || this._framework.authenticate;
  return fn(this, strategy, options, callback);
};

/**
 * Middleware that will restore login state from a session.
 *
 * Web applications typically use sessions to maintain login state between
 * requests.  For example, a user will authenticate by entering credentials into
 * a form which is submitted to the server.  If the credentials are valid, a
 * login session is established by setting a cookie containing a session
 * identifier in the user's web browser.  The web browser will send this cookie
 * in subsequent requests to the server, allowing a session to be maintained.
 *
 * If sessions are being utilized, and a login session has been established,
 * this middleware will populate `req.user` with the current user.
 *
 * Note that sessions are not strictly required for Passport to operate.
 * However, as a general rule, most web applications will make use of sessions.
 * An exception to this rule would be an API server, which expects each HTTP
 * request to provide credentials in an Authorization header.
 *
 * Examples:
 *
 *     app.use(connect.cookieParser());
 *     app.use(connect.session({ secret: 'keyboard cat' }));
 *     app.use(passport.initialize());
 *     app.use(passport.session());
 *
 * Options:
 *   - `pauseStream`      Pause the request stream before deserializing the user
 *                        object from the session.  Defaults to _false_.  Should
 *                        be set to true in cases where middleware consuming the
 *                        request body is configured after passport and the
 *                        deserializeUser method is asynchronous.
 *
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.session = function(options) {
  return this.authenticate('session', options);
};

// TODO: Make session manager pluggable
/*
Authenticator.prototype.sessionManager = function(mgr) {
  this._sm = mgr;
  return this;
}
*/

/**
 * Registers a function used to serialize user objects into the session.
 *
 * Examples:
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 *
 * @api public
 */
Authenticator.prototype.serializeUser = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._serializers.push(fn);
  }
  
  // private implementation that traverses the chain of serializers, attempting
  // to serialize a user
  var user = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._serializers;
  (function pass(i, err, obj) {
    // serializers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or serialized object was obtained, done
    if (err || obj || obj === 0) { return done(err, obj); }
    
    var layer = stack[i];
    if (!layer) {
      return done(new Error('Failed to serialize user into session'));
    }
    
    
    function serialized(e, o) {
      pass(i + 1, e, o);
    }
    
    try {
      var arity = layer.length;
      if (arity == 3) {
        layer(req, user, serialized);
      } else {
        layer(user, serialized);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Registers a function used to deserialize user objects out of the session.
 *
 * Examples:
 *
 *     passport.deserializeUser(function(id, done) {
 *       User.findById(id, function (err, user) {
 *         done(err, user);
 *       });
 *     });
 *
 * @api public
 */
Authenticator.prototype.deserializeUser = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._deserializers.push(fn);
  }
  
  // private implementation that traverses the chain of deserializers,
  // attempting to deserialize a user
  var obj = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._deserializers;
  (function pass(i, err, user) {
    // deserializers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or deserialized user was obtained, done
    if (err || user) { return done(err, user); }
    // a valid user existed when establishing the session, but that user has
    // since been removed
    if (user === null || user === false) { return done(null, false); }
    
    var layer = stack[i];
    if (!layer) {
      return done(new Error('Failed to deserialize user out of session'));
    }
    
    
    function deserialized(e, u) {
      pass(i + 1, e, u);
    }
    
    try {
      var arity = layer.length;
      if (arity == 3) {
        layer(req, obj, deserialized);
      } else {
        layer(obj, deserialized);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Registers a function used to transform auth info.
 *
 * In some circumstances authorization details are contained in authentication
 * credentials or loaded as part of verification.
 *
 * For example, when using bearer tokens for API authentication, the tokens may
 * encode (either directly or indirectly in a database), details such as scope
 * of access or the client to which the token was issued.
 *
 * Such authorization details should be enforced separately from authentication.
 * Because Passport deals only with the latter, this is the responsiblity of
 * middleware or routes further along the chain.  However, it is not optimal to
 * decode the same data or execute the same database query later.  To avoid
 * this, Passport accepts optional `info` along with the authenticated `user`
 * in a strategy's `success()` action.  This info is set at `req.authInfo`,
 * where said later middlware or routes can access it.
 *
 * Optionally, applications can register transforms to proccess this info,
 * which take effect prior to `req.authInfo` being set.  This is useful, for
 * example, when the info contains a client ID.  The transform can load the
 * client from the database and include the instance in the transformed info,
 * allowing the full set of client properties to be convieniently accessed.
 *
 * If no transforms are registered, `info` supplied by the strategy will be left
 * unmodified.
 *
 * Examples:
 *
 *     passport.transformAuthInfo(function(info, done) {
 *       Client.findById(info.clientID, function (err, client) {
 *         info.client = client;
 *         done(err, info);
 *       });
 *     });
 *
 * @api public
 */
Authenticator.prototype.transformAuthInfo = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._infoTransformers.push(fn);
  }
  
  // private implementation that traverses the chain of transformers,
  // attempting to transform auth info
  var info = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._infoTransformers;
  (function pass(i, err, tinfo) {
    // transformers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or transformed info was obtained, done
    if (err || tinfo) { return done(err, tinfo); }
    
    var layer = stack[i];
    if (!layer) {
      // if no transformers are registered (or they all pass), the default
      // behavior is to use the un-transformed info as-is
      return done(null, info);
    }
    
    
    function transformed(e, t) {
      pass(i + 1, e, t);
    }
    
    try {
      var arity = layer.length;
      if (arity == 1) {
        // sync
        var t = layer(info);
        transformed(null, t);
      } else if (arity == 3) {
        layer(req, info, transformed);
      } else {
        layer(info, transformed);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Return strategy with given `name`. 
 *
 * @param {String} name
 * @return {Strategy}
 * @api private
 */
Authenticator.prototype._strategy = function(name) {
  return this._strategies[name];
};


/**
 * Expose `Authenticator`.
 */
module.exports = Authenticator;


/***/ }),
/* 12 */
/***/ (function(module, exports) {


module.exports = function(obj){
  var onData
    , onEnd
    , events = [];

  // buffer data
  obj.on('data', onData = function(data, encoding){
    events.push(['data', data, encoding]);
  });

  // buffer end
  obj.on('end', onEnd = function(data, encoding){
    events.push(['end', data, encoding]);
  });

  return {
    end: function(){
      obj.removeListener('data', onData);
      obj.removeListener('end', onEnd);
    },
    resume: function(){
      this.end();
      for (var i = 0, len = events.length; i < len; ++i) {
        obj.emit.apply(obj, events[i]);
      }
    }
  };
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Creates an instance of `Strategy`.
 *
 * @constructor
 * @api public
 */
function Strategy() {
}

/**
 * Authenticate request.
 *
 * This function must be overridden by subclasses.  In abstract form, it always
 * throws an exception.
 *
 * @param {Object} req The request to authenticate.
 * @param {Object} [options] Strategy-specific options.
 * @api public
 */
Strategy.prototype.authenticate = function(req, options) {
  throw new Error('Strategy#authenticate must be overridden by subclass');
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

function SessionManager(options, serializeUser) {
  if (typeof options == 'function') {
    serializeUser = options;
    options = undefined;
  }
  options = options || {};
  
  this._key = options.key || 'passport';
  this._serializeUser = serializeUser;
}

SessionManager.prototype.logIn = function(req, user, cb) {
  var self = this;
  this._serializeUser(user, req, function(err, obj) {
    if (err) {
      return cb(err);
    }
    if (!req._passport.session) {
      req._passport.session = {};
    }
    req._passport.session.user = obj;
    if (!req.session) {
      req.session = {};
    }
    req.session[self._key] = req._passport.session;
    cb();
  });
}

SessionManager.prototype.logOut = function(req, cb) {
  if (req._passport && req._passport.session) {
    delete req._passport.session.user;
  }
  cb && cb();
}


module.exports = SessionManager;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/**
 * Passport initialization.
 *
 * Intializes Passport for incoming requests, allowing authentication strategies
 * to be applied.
 *
 * If sessions are being utilized, applications must set up Passport with
 * functions to serialize a user into and out of a session.  For example, a
 * common pattern is to serialize just the user ID into the session (due to the
 * fact that it is desirable to store the minimum amount of data in a session).
 * When a subsequent request arrives for the session, the full User object can
 * be loaded from the database by ID.
 *
 * Note that additional middleware is required to persist login state, so we
 * must use the `connect.session()` middleware _before_ `passport.initialize()`.
 *
 * If sessions are being used, this middleware must be in use by the
 * Connect/Express application for Passport to operate.  If the application is
 * entirely stateless (not using sessions), this middleware is not necessary,
 * but its use will not have any adverse impact.
 *
 * Examples:
 *
 *     app.use(connect.cookieParser());
 *     app.use(connect.session({ secret: 'keyboard cat' }));
 *     app.use(passport.initialize());
 *     app.use(passport.session());
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 *
 *     passport.deserializeUser(function(id, done) {
 *       User.findById(id, function (err, user) {
 *         done(err, user);
 *       });
 *     });
 *
 * @return {Function}
 * @api public
 */
module.exports = function initialize(passport) {
  
  return function initialize(req, res, next) {
    req._passport = {};
    req._passport.instance = passport;

    if (req.session && req.session[passport._key]) {
      // load data from existing session
      req._passport.session = req.session[passport._key];
    }

    next();
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var http = __webpack_require__(4)
  , IncomingMessageExt = __webpack_require__(5)
  , AuthenticationError = __webpack_require__(18);


/**
 * Authenticates requests.
 *
 * Applies the `name`ed strategy (or strategies) to the incoming request, in
 * order to authenticate the request.  If authentication is successful, the user
 * will be logged in and populated at `req.user` and a session will be
 * established by default.  If authentication fails, an unauthorized response
 * will be sent.
 *
 * Options:
 *   - `session`          Save login state in session, defaults to _true_
 *   - `successRedirect`  After successful login, redirect to given URL
 *   - `successMessage`   True to store success message in
 *                        req.session.messages, or a string to use as override
 *                        message for success.
 *   - `successFlash`     True to flash success messages or a string to use as a flash
 *                        message for success (overrides any from the strategy itself).
 *   - `failureRedirect`  After failed login, redirect to given URL
 *   - `failureMessage`   True to store failure message in
 *                        req.session.messages, or a string to use as override
 *                        message for failure.
 *   - `failureFlash`     True to flash failure messages or a string to use as a flash
 *                        message for failures (overrides any from the strategy itself).
 *   - `assignProperty`   Assign the object provided by the verify callback to given property
 *
 * An optional `callback` can be supplied to allow the application to override
 * the default manner in which authentication attempts are handled.  The
 * callback has the following signature, where `user` will be set to the
 * authenticated user on a successful authentication attempt, or `false`
 * otherwise.  An optional `info` argument will be passed, containing additional
 * details provided by the strategy's verify callback - this could be information about
 * a successful authentication or a challenge message for a failed authentication.
 * An optional `status` argument will be passed when authentication fails - this could
 * be a HTTP response code for a remote authentication failure or similar.
 *
 *     app.get('/protected', function(req, res, next) {
 *       passport.authenticate('local', function(err, user, info, status) {
 *         if (err) { return next(err) }
 *         if (!user) { return res.redirect('/signin') }
 *         res.redirect('/account');
 *       })(req, res, next);
 *     });
 *
 * Note that if a callback is supplied, it becomes the application's
 * responsibility to log-in the user, establish a session, and otherwise perform
 * the desired operations.
 *
 * Examples:
 *
 *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });
 *
 *     passport.authenticate('basic', { session: false });
 *
 *     passport.authenticate('twitter');
 *
 * @param {String|Array} name
 * @param {Object} options
 * @param {Function} callback
 * @return {Function}
 * @api public
 */
module.exports = function authenticate(passport, name, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  
  var multi = true;
  
  // Cast `name` to an array, allowing authentication to pass through a chain of
  // strategies.  The first strategy to succeed, redirect, or error will halt
  // the chain.  Authentication failures will proceed through each strategy in
  // series, ultimately failing if all strategies fail.
  //
  // This is typically used on API endpoints to allow clients to authenticate
  // using their preferred choice of Basic, Digest, token-based schemes, etc.
  // It is not feasible to construct a chain of multiple strategies that involve
  // redirection (for example both Facebook and Twitter), since the first one to
  // redirect will halt the chain.
  if (!Array.isArray(name)) {
    name = [ name ];
    multi = false;
  }
  
  return function authenticate(req, res, next) {
    if (http.IncomingMessage.prototype.logIn
        && http.IncomingMessage.prototype.logIn !== IncomingMessageExt.logIn) {
      __webpack_require__(3).__monkeypatchNode();
    }
    
    
    // accumulator for failures from each strategy in the chain
    var failures = [];
    
    function allFailed() {
      if (callback) {
        if (!multi) {
          return callback(null, false, failures[0].challenge, failures[0].status);
        } else {
          var challenges = failures.map(function(f) { return f.challenge; });
          var statuses = failures.map(function(f) { return f.status; });
          return callback(null, false, challenges, statuses);
        }
      }
      
      // Strategies are ordered by priority.  For the purpose of flashing a
      // message, the first failure will be displayed.
      var failure = failures[0] || {}
        , challenge = failure.challenge || {}
        , msg;
    
      if (options.failureFlash) {
        var flash = options.failureFlash;
        if (typeof flash == 'string') {
          flash = { type: 'error', message: flash };
        }
        flash.type = flash.type || 'error';
      
        var type = flash.type || challenge.type || 'error';
        msg = flash.message || challenge.message || challenge;
        if (typeof msg == 'string') {
          req.flash(type, msg);
        }
      }
      if (options.failureMessage) {
        msg = options.failureMessage;
        if (typeof msg == 'boolean') {
          msg = challenge.message || challenge;
        }
        if (typeof msg == 'string') {
          req.session.messages = req.session.messages || [];
          req.session.messages.push(msg);
        }
      }
      if (options.failureRedirect) {
        return res.redirect(options.failureRedirect);
      }
    
      // When failure handling is not delegated to the application, the default
      // is to respond with 401 Unauthorized.  Note that the WWW-Authenticate
      // header will be set according to the strategies in use (see
      // actions#fail).  If multiple strategies failed, each of their challenges
      // will be included in the response.
      var rchallenge = []
        , rstatus, status;
      
      for (var j = 0, len = failures.length; j < len; j++) {
        failure = failures[j];
        challenge = failure.challenge;
        status = failure.status;
          
        rstatus = rstatus || status;
        if (typeof challenge == 'string') {
          rchallenge.push(challenge);
        }
      }
    
      res.statusCode = rstatus || 401;
      if (res.statusCode == 401 && rchallenge.length) {
        res.setHeader('WWW-Authenticate', rchallenge);
      }
      if (options.failWithError) {
        return next(new AuthenticationError(http.STATUS_CODES[res.statusCode], rstatus));
      }
      res.end(http.STATUS_CODES[res.statusCode]);
    }
    
    (function attempt(i) {
      var layer = name[i];
      // If no more strategies exist in the chain, authentication has failed.
      if (!layer) { return allFailed(); }
    
      // Get the strategy, which will be used as prototype from which to create
      // a new instance.  Action functions will then be bound to the strategy
      // within the context of the HTTP request/response pair.
      var prototype = passport._strategy(layer);
      if (!prototype) { return next(new Error('Unknown authentication strategy "' + layer + '"')); }
    
      var strategy = Object.create(prototype);
      
      
      // ----- BEGIN STRATEGY AUGMENTATION -----
      // Augment the new strategy instance with action functions.  These action
      // functions are bound via closure the the request/response pair.  The end
      // goal of the strategy is to invoke *one* of these action methods, in
      // order to indicate successful or failed authentication, redirect to a
      // third-party identity provider, etc.
      
      /**
       * Authenticate `user`, with optional `info`.
       *
       * Strategies should call this function to successfully authenticate a
       * user.  `user` should be an object supplied by the application after it
       * has been given an opportunity to verify credentials.  `info` is an
       * optional argument containing additional user information.  This is
       * useful for third-party authentication strategies to pass profile
       * details.
       *
       * @param {Object} user
       * @param {Object} info
       * @api public
       */
      strategy.success = function(user, info) {
        if (callback) {
          return callback(null, user, info);
        }
      
        info = info || {};
        var msg;
      
        if (options.successFlash) {
          var flash = options.successFlash;
          if (typeof flash == 'string') {
            flash = { type: 'success', message: flash };
          }
          flash.type = flash.type || 'success';
        
          var type = flash.type || info.type || 'success';
          msg = flash.message || info.message || info;
          if (typeof msg == 'string') {
            req.flash(type, msg);
          }
        }
        if (options.successMessage) {
          msg = options.successMessage;
          if (typeof msg == 'boolean') {
            msg = info.message || info;
          }
          if (typeof msg == 'string') {
            req.session.messages = req.session.messages || [];
            req.session.messages.push(msg);
          }
        }
        if (options.assignProperty) {
          req[options.assignProperty] = user;
          return next();
        }
      
        req.logIn(user, options, function(err) {
          if (err) { return next(err); }
          
          function complete() {
            if (options.successReturnToOrRedirect) {
              var url = options.successReturnToOrRedirect;
              if (req.session && req.session.returnTo) {
                url = req.session.returnTo;
                delete req.session.returnTo;
              }
              return res.redirect(url);
            }
            if (options.successRedirect) {
              return res.redirect(options.successRedirect);
            }
            next();
          }
          
          if (options.authInfo !== false) {
            passport.transformAuthInfo(info, req, function(err, tinfo) {
              if (err) { return next(err); }
              req.authInfo = tinfo;
              complete();
            });
          } else {
            complete();
          }
        });
      };
      
      /**
       * Fail authentication, with optional `challenge` and `status`, defaulting
       * to 401.
       *
       * Strategies should call this function to fail an authentication attempt.
       *
       * @param {String} challenge
       * @param {Number} status
       * @api public
       */
      strategy.fail = function(challenge, status) {
        if (typeof challenge == 'number') {
          status = challenge;
          challenge = undefined;
        }
        
        // push this failure into the accumulator and attempt authentication
        // using the next strategy
        failures.push({ challenge: challenge, status: status });
        attempt(i + 1);
      };
      
      /**
       * Redirect to `url` with optional `status`, defaulting to 302.
       *
       * Strategies should call this function to redirect the user (via their
       * user agent) to a third-party website for authentication.
       *
       * @param {String} url
       * @param {Number} status
       * @api public
       */
      strategy.redirect = function(url, status) {
        // NOTE: Do not use `res.redirect` from Express, because it can't decide
        //       what it wants.
        //
        //       Express 2.x: res.redirect(url, status)
        //       Express 3.x: res.redirect(status, url) -OR- res.redirect(url, status)
        //         - as of 3.14.0, deprecated warnings are issued if res.redirect(url, status)
        //           is used
        //       Express 4.x: res.redirect(status, url)
        //         - all versions (as of 4.8.7) continue to accept res.redirect(url, status)
        //           but issue deprecated versions
        
        res.statusCode = status || 302;
        res.setHeader('Location', url);
        res.setHeader('Content-Length', '0');
        res.end();
      };
      
      /**
       * Pass without making a success or fail decision.
       *
       * Under most circumstances, Strategies should not need to call this
       * function.  It exists primarily to allow previous authentication state
       * to be restored, for example from an HTTP session.
       *
       * @api public
       */
      strategy.pass = function() {
        next();
      };
      
      /**
       * Internal error while performing authentication.
       *
       * Strategies should call this function when an internal error occurs
       * during the process of performing authentication; for example, if the
       * user directory is not available.
       *
       * @param {Error} err
       * @api public
       */
      strategy.error = function(err) {
        if (callback) {
          return callback(err);
        }
        
        next(err);
      };
      
      // ----- END STRATEGY AUGMENTATION -----
    
      strategy.authenticate(req, options);
    })(0); // attempt
  };
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * `AuthenticationError` error.
 *
 * @constructor
 * @api private
 */
function AuthenticationError(message, status) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'AuthenticationError';
  this.message = message;
  this.status = status || 401;
}

// Inherit from `Error`.
AuthenticationError.prototype.__proto__ = Error.prototype;


// Expose constructor.
module.exports = AuthenticationError;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(21);
} else {
  module.exports = __webpack_require__(22);
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  cookieKey: process.env.COOKIE_KEY
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  cookieKey: 'af8fj2ofaf832lfhaf0982lfbasf381lknsafb812nasdkfjnasf891123ncv'
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _exchanges = __webpack_require__(24);

var _exchanges2 = _interopRequireDefault(_exchanges);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/exchanges', _exchanges2.default);

exports.default = router;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = __webpack_require__(25);

var _lodash2 = _interopRequireDefault(_lodash);

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _ccxt = __webpack_require__(26);

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


            res.send(_extends({
              symbols: getCommonExchangeSymbols([poloniex.symbols, bittrex.symbols])
            }, createCombinedOBData((_createCombinedOBData = {}, _defineProperty(_createCombinedOBData, poloniex.id, poloOB), _defineProperty(_createCombinedOBData, bittrex.id, bittrexOB), _createCombinedOBData))));
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
/* 25 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("ccxt");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ]);