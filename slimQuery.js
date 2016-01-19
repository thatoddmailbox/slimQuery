window.slimQuery = {
	noConflictFlag: false,
	eventMap: {
		click: "click",
		ready: "DOMContentLoaded"
	}
};

function sqElem(selector) {
	if (selector !== document) {
		this.dom = document.querySelectorAll(selector);
	} else {
		this.dom = [document];
	}
	return this;
}

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
		this.addEventListener(window.slimQuery.eventMap[event], function(e) {
			callback.call(e);
		});
	});
};

sqElem.prototype.ready = function(callback) {
	return this.on("ready", callback);
};

sqElem.prototype.click = function(callback) {
	return this.on("click", callback);
};

window.slimQuery.each = function(items, callback) {
	for (var i = 0; i < items.length; i++) {
		callback.call(items[i], i);
	}
};

window.slimQuery.noConflict = function() {
	window.slimQuery.noConflictFlag = true;
};

window.sQ = sqElem.prototype.init;
if (!window.slimQuery.noConflictFlag) {
	window.$ = window.sQ;
	window.jQuery = window.sQ;
}
