window.slimQuery = {
	noConflictFlag: false
};

function sqElem(selector) {
	this.dom = document.querySelectorAll(selector);
}

sqElem.prototype.text = function(newValue) {
	if (newValue == undefined) {
		return this.dom.innerText;
	}
	this.dom.innerText = newValue;
	return this;
};

sqElem.prototype.html = function(newValue) {
	if (newValue == undefined) {
		return this.dom.innerHTML;
	}
	this.dom.innerHTML = newValue;
	return this;
};

window.slimQuery.init = function() {

};

window.slimQuery.noConflict = function() {
	window.slimQuery.noConflictFlag = true;
};

window.sQ = window.slimQuery.init;
if (!window.slimQuery.noConflictFlag) {
	window.$ = window.sQ;
	window.jQuery = window.sQ;
}
