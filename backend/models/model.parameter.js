'use strict'

//CONSTRUCTOR
function Parameter(name, value) {
    this.name = name || null;
    this.value  = value  || null;
}

Parameter.prototype.getName = function() {
    return this.name;
}

Parameter.prototype.setName = function(name) {
    this.name = name;
}

Parameter.prototype.getValue = function() {
    return this.value;
}

Parameter.prototype.setValue = function(value) {
    this.value = value;
}

Parameter.prototype.getParameter = function() {
    return {name: this.getName(), value: this.getValue()};
}

// EXPORT THE PARAMETER
module.exports = Parameter;