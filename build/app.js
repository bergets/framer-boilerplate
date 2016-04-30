/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var APIURL, InputModule, app, avatar, bg, device, getData, input, layerA;
	
	device = new Framer.DeviceView();
	
	InputModule = __webpack_require__(1);
	
	device.setupContext();
	
	device.deviceType = "google-nexus-6p";
	
	device.contentScale = 4;
	
	APIURL = 'https://api.github.com/users/';
	
	app = Framer.Importer.load('app.framer/imported/app@1x');
	
	bg = new BackgroundLayer({
	  backgroundColor: "grey"
	});
	
	input = new InputModule.Input({
	  setup: false,
	  virtualKeyboard: true,
	  text: "Bergets",
	  placeholder: "Username",
	  placeholderColor: "#000",
	  backgroundColor: "#eee",
	  type: "text",
	  y: 8,
	  x: 8,
	  width: device.screen.width / 4 - 35,
	  height: 25,
	  goButton: false
	});
	
	input.on("keyup", function() {
	  var name;
	  name = this.value;
	  return getData(name);
	});
	
	layerA = new Layer({
	  y: 300,
	  x: 8,
	  width: device.screen.width / 4 - 16,
	  html: 'Public repos: ' + '<br> 5' + '<br> Followers: ' + '0' + '<br> Following: ' + '0',
	  backgroundColor: "none",
	  style: {
	    "font-size": "22px",
	    "text-align": "center",
	    "padding": "16px",
	    "color": "#333"
	  }
	});
	
	avatar = new Layer({
	  image: 'https://avatars.githubusercontent.com/u/4188549?v=3',
	  midX: device.screen.width / 2 / 4,
	  y: 80
	});
	
	getData = function(username) {
	  var GETDATA, jsondata;
	  GETDATA = APIURL + username;
	  jsondata = JSON.parse(Utils.domLoadDataSync(GETDATA));
	  layerA.html = 'Public repos: ' + jsondata.public_repos + '<br> Followers: ' + jsondata.followers + '<br> Following: ' + jsondata.following;
	  return avatar.image = jsondata.avatar_url;
	};
	
	app.heart.states.add({
	  pressed: {
	    y: 550
	  }
	});
	
	app.heartBg.states.add({
	  pressed: {
	    opacity: 1,
	    y: -3
	  },
	  notpressed: {
	    opacity: 0
	  }
	});
	
	app.heart.states.animationOptions = {
	  curve: "spring(100, 10, 0)"
	};
	
	app.heartBg.states.animationOptions = {
	  curve: "spring(100, 10, 0)"
	};
	
	app.heartBg.opacity = 0;
	
	app.heart.on(Events.Tap, function(event, layer) {
	  app.heartBg.states["switch"]("pressed");
	  app.heart.states["switch"]("pressed");
	  return Utils.delay(0.5, function() {
	    app.heartBg.states["switch"]("default");
	    return app.heart.states["switch"]("default");
	  });
	});
	
	app.heartBg.on(Event.Tap, function() {
	  return app.heartBg.state["switch"]("notpressed");
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	exports.keyboardLayer = new Layer({
	  x: 0,
	  y: Screen.height,
	  width: 750,
	  height: 432,
	  image: "modules/keyboard.png"
	});
	
	exports.keyboardLayer.states.add({
	  "shown": {
	    y: Screen.height - exports.keyboardLayer.height
	  }
	});
	
	exports.keyboardLayer.states.animationOptions = {
	  curve: "spring(500,50,15)"
	};
	
	exports.Input = (function(superClass) {
	  extend(Input, superClass);
	
	  Input.define("style", {
	    get: function() {
	      return this.input.style;
	    },
	    set: function(value) {
	      return _.extend(this.input.style, value);
	    }
	  });
	
	  Input.define("value", {
	    get: function() {
	      return this.input.value;
	    },
	    set: function(value) {
	      return this.input.value = value;
	    }
	  });
	
	  function Input(options) {
	    if (options == null) {
	      options = {};
	    }
	    if (options.setup == null) {
	      options.setup = false;
	    }
	    if (options.width == null) {
	      options.width = Screen.width;
	    }
	    if (options.clip == null) {
	      options.clip = false;
	    }
	    if (options.height == null) {
	      options.height = 60;
	    }
	    if (options.backgroundColor == null) {
	      options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "transparent";
	    }
	    if (options.fontSize == null) {
	      options.fontSize = 30;
	    }
	    if (options.lineHeight == null) {
	      options.lineHeight = 30;
	    }
	    if (options.padding == null) {
	      options.padding = 10;
	    }
	    if (options.text == null) {
	      options.text = "";
	    }
	    if (options.placeholder == null) {
	      options.placeholder = "";
	    }
	    if (options.virtualKeyboard == null) {
	      options.virtualKeyboard = Utils.isMobile() ? false : true;
	    }
	    if (options.type == null) {
	      options.type = "text";
	    }
	    if (options.goButton == null) {
	      options.goButton = false;
	    }
	    Input.__super__.constructor.call(this, options);
	    if (options.placeholderColor != null) {
	      this.placeholderColor = options.placeholderColor;
	    }
	    this.input = document.createElement("input");
	    this.input.id = "input-" + (_.now());
	    this.input.style.cssText = "font-size: " + options.fontSize + "px; line-height: " + options.lineHeight + "px; padding: " + options.padding + "px; width: " + options.width + "px; height: " + options.height + "px; border: none; outline-width: 0; background-image: url(about:blank); background-color: " + options.backgroundColor + ";";
	    this.input.value = options.text;
	    this.input.type = options.type;
	    this.input.placeholder = options.placeholder;
	    this.form = document.createElement("form");
	    if (options.goButton) {
	      this.form.action = "#";
	      this.form.addEventListener("submit", function(event) {
	        return event.preventDefault();
	      });
	    }
	    this.form.appendChild(this.input);
	    this._element.appendChild(this.form);
	    this.backgroundColor = "transparent";
	    if (this.placeholderColor) {
	      this.updatePlaceholderColor(options.placeholderColor);
	    }
	    if (!Utils.isMobile() || options.virtualKeyboard) {
	      this.input.addEventListener("focus", function() {
	        exports.keyboardLayer.bringToFront();
	        return exports.keyboardLayer.states.next();
	      });
	      this.input.addEventListener("blur", function() {
	        return exports.keyboardLayer.states["switch"]("default");
	      });
	    }
	  }
	
	  Input.prototype.updatePlaceholderColor = function(color) {
	    var css;
	    this.placeholderColor = color;
	    if (this.pageStyle != null) {
	      document.head.removeChild(this.pageStyle);
	    }
	    this.pageStyle = document.createElement("style");
	    this.pageStyle.type = "text/css";
	    css = "#" + this.input.id + "::-webkit-input-placeholder { color: " + this.placeholderColor + "; }";
	    this.pageStyle.appendChild(document.createTextNode(css));
	    return document.head.appendChild(this.pageStyle);
	  };
	
	  Input.prototype.focus = function() {
	    return this.input.focus();
	  };
	
	  return Input;
	
	})(Layer);


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map