var slimQuery = function(selector) {
	return sqElem.prototype.init(selector);
};

slimQuery.event = {
	special: {}
};
slimQuery.eventMap = {
	click: "click",
	ready: "DOMContentLoaded"
};
slimQuery.support = {};

function sqElem(selector) {
	if (typeof selector === "function") {
		// apparently this is a thing
		$(document).ready(selector);
	} else if (selector !== document && selector !== window) {
		this.dom = document.querySelectorAll(selector);
	} else {
		this.dom = [selector];
	}
	return this;
}

sqElem.prototype = sqElem.fn = slimQuery.fn = {
	jquery: "1.11.3", // this is for compatibility
	noConflictFlag: false,
	slimquery: "0.1"
};

sqElem.prototype.init = function(selector) {
	return new sqElem(selector);
}

sqElem.prototype.css = function(propertyName, value) {
	if (value === undefined) {
		return window.getComputedStyle(propertyName);
	}
	window.slimQuery.each(this.dom, function() {
		this.setAttribute("style", (this.getAttribute("style")||"") + propertyName + ":" + value + ";");
	});
	return this;
};

sqElem.prototype.text = function(newValue) {
	if (newValue === undefined) {
		return this.dom[0].innerText;
	}
	window.slimQuery.each(this.dom, function() {
		this.innerText = newValue;
	});
	return this;
};

sqElem.prototype.html = function(newValue) {
	if (newValue === undefined) {
		return this.dom[0].innerHTML;
	}
	window.slimQuery.each(this.dom, function() {
		this.innerHTML = newValue;
	});
	return this;
};

sqElem.prototype.on = function(event, callback) {
	window.slimQuery.each(this.dom, function() {
		this.addEventListener(slimQuery.eventMap[event], function(e) {
			callback.call(e);
		});
	});
	return this;
};

sqElem.prototype.ready = function(callback) {
	return this.on("ready", callback);
};

sqElem.prototype.click = function(callback) {
	return this.on("click", callback);
};

slimQuery.each = function(items, callback) {
	for (var i = 0; i < items.length; i++) {
		callback.call(items[i], i);
	}
};

slimQuery.extend = function() {
	// based off of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
	var retVal = Object(arguments[0]);
	for (var i = 1; i < arguments.length; i++) { // yes, start at one
		var src = arguments[i];
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				retVal[key] = src[key];
			}
		}
	}
	return retVal;
};

slimQuery.noConflict = function() {
	window.slimQuery.noConflictFlag = true;
};

window.sQ = window.slimQuery;
if (!slimQuery.noConflictFlag) {
	window.$ = window.sQ;
	window.jQuery = window.sQ;
}
