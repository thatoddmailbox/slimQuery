var slimQuery = function(selector) {
	return sqElem.prototype.init(selector);
};

slimQuery.data = {};
slimQuery.event = {
	special: {}
};
slimQuery.eventMap = {
	click: "click",
	ready: "DOMContentLoaded"
};
slimQuery.support = {};

slimQuery.Event = function(src, props) {
	if (!(this instanceof slimQuery.Event)) {
		return new slimQuery.Event( src, props );
	}
	if (props) {
		slimQuery.extend(this, props);
	}
	this.src = src;
};

slimQuery.Event.prototype.isDefaultPrevented = function() {
	return (this.defaultPrevented||false);
};

slimQuery.Event.prototype.preventDefault = function() {
	this.defaultPrevented = true;
};

function sqElem(selector) {
	if (typeof selector === "function") {
		// apparently this is a thing
		$(document).ready(selector);
	} else if (selector instanceof HTMLElement) {
		this[0] = selector;
		this.length++;
	} else if (selector instanceof Array) {
		this.addArray(selector);
	} else if (selector instanceof NodeList) {
		this.addArray(slimQuery.nodeListToArray(selector));
	} else if (selector !== document && selector !== window) {
		this.addArray(document.querySelectorAll(selector));
	} else {
		this[0] = selector;
		this.length++;
	}
	return this;
}

sqElem.prototype = sqElem.fn = slimQuery.fn = {
	jquery: "1.11.3", // this is for compatibility,
	length: 0,
	noConflictFlag: false,
	slimquery: "0.1"
};

sqElem.prototype.init = function(selector) {
	return new sqElem(selector);
};

sqElem.prototype.addArray = function(array) {
	var obj = this;
	var lenStart = this.length;
	slimQuery.each(array, function(i) {
		obj[lenStart + i] = this;
		obj.length++;
	});
	return this;
};

sqElem.prototype.addClass = function(newClass) {
	slimQuery.eachElem(this, function() {
		var curClass = $(this).attr("class");
		if (curClass === undefined) {
			curClass = "";
		}
		curClass = curClass + " " + newClass;
		$(this).attr("class", curClass);
	});
	return this;
};

sqElem.prototype.attr = function(propertyName, value) {
	if (value === undefined) {
		return (this[0].getAttribute(propertyName)||undefined);
	}
	slimQuery.eachElem(this, function() {
		this.setAttribute(propertyName, value);
	});
	return this;
};

sqElem.prototype.append = function(thing) {
	var elem;
	if (thing instanceof HTMLElement) {
		elem = [ thing ];
	} else if (thing instanceof sqElem) {
		elem = thing;
	} else {
		elem = $(thing);
	}
	slimQuery.eachElem(this, function() {
		var to = this;
		slimQuery.each(elem, function() {
			to.appendChild(this);
		});
	});
	return this;
};

sqElem.prototype.appendTo = function(thing) {
	thing.append(this);
	return this;
};

sqElem.prototype.css = function(propertyName, value) {
	if (value === undefined) {
		return window.getComputedStyle(this[0], propertyName);
	}
	slimQuery.eachElem(this, function() {
		this.setAttribute("style", (this.getAttribute("style")||"") + propertyName + ":" + value + ";");
	});
	return this;
};

sqElem.prototype.data = function(propertyName, value) {
	if (value === undefined) {
		if (this.attr("data-sq-private-id") === undefined) {
			return undefined;
		}
		return slimQuery.data[this.attr("data-sq-private-id")];
	}
	var id = $(this[0]).attr("data-sq-private-id");
	if (id === undefined) {
		id = slimQuery.uniqueId();
		$(this[0]).attr("data-sq-private-id", id);
		slimQuery.data[id] = {};
	}
	slimQuery.data[id][propertyName] = value;
	return this;
};

sqElem.prototype.each = function(callback) {
	return slimQuery.eachElem(this, callback);
};

sqElem.prototype.find = function(selector) {
	return slimQuery.find(selector, this);
};

sqElem.prototype.splice = function() {
	/*return this..splice.apply(this.dom, arguments);*/
	return false; // TODO: implement splice. This is just a stub to get it to show up as an array.
};

sqElem.prototype.text = function(newValue) {
	if (newValue === undefined) {
		return this[0].innerText;
	}
	slimQuery.eachElem(this, function() {
		this.innerText = newValue;
	});
	return this;
};

sqElem.prototype.hasClass = function(newValue) {
	return (this.attr("class").indexOf(newValue) > -1); // TODO: make this better
};

sqElem.prototype.html = function(newValue) {
	if (newValue === undefined) {
		return this[0].innerHTML;
	}
	slimQuery.eachElem(this, function() {
		this.innerHTML = newValue;
	});
	return this;
};

sqElem.prototype.on = function(event, callback) {
	slimQuery.eachElem(this, function() {
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

sqElem.prototype.trigger = function(event) {
	// TODO: better event system
	// it will stay stubbed until there is one
	return this;
};

slimQuery.each = function(items, callback) {
	for (var i = 0; i < items.length; i++) {
		callback.call(items[i], i);
	}
};

slimQuery.eachElem = function(items, callback) {
	return slimQuery.each(items, function(i) {
		if (typeof i === "number") {
			callback.call(this, i);
		}
	});
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

slimQuery.find = function(search, start) {
	if (start === undefined) {
		start = $("html");
	}
	return $(start[0].querySelectorAll(search));
};

slimQuery.noConflict = function() {
	slimQuery.noConflictFlag = true;
};

slimQuery.nodeListToArray = function() {
    var a = [];

    for (var i = 0, len = this.length; i < len; i++) {
        a[i] = this[i];
    }

    return a;
}

slimQuery.proxy = function(fn, context) {
	var newFunc  = function() {
		return fn.apply( context || this, arguments);
	};
	return newFunc;
};

slimQuery.uniqueId = function() {
	return "slimQuery-" + Math.random().toString(36).substr(2, 10) + Math.random().toString(36).substr(2, 10);
};

window.sQ = window.slimQuery;
if (!slimQuery.noConflictFlag) {
	window.$ = window.sQ;
	window.jQuery = window.sQ;
}
