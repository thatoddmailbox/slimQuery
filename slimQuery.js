window.slimQuery = {
	noConflictFlag: false
};

function sqElem(selector) {
	if (selector !== document) {
		this.dom = document.querySelectorAll(selector);
	} else {
		this.dom = document;
	}
	return this;
}

sqElem.prototype.init = function(selector) {
	return new sqElem(selector);
}

sqElem.prototype.text = function(newValue) {
	if (newValue == undefined) {
		return this.dom[0].innerText;
	}
	window.slimQuery.each(this.dom, function() {
		this.innerText = newValue;
	});
	return this;
};

sqElem.prototype.html = function(newValue) {
	if (newValue == undefined) {
		return this.dom[0].innerHTML;
	}
	window.slimQuery.each(this.dom, function() {
		this.innerHTML = newValue;
	});
	return this;
};

sqElem.prototype.ready = function(callback) {
	//this.dom.events
	this.dom.addEventListener("DOMContentLoaded", function() {

	});
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
