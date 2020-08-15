'use strict'

//CONSTRUCTOR
function User(id, email, name, password) {
    this.id  = id  || null;
    this.email  = email  || null;
    this.name = name || null;
    this.password  = password  || null;
}

User.prototype.getId = function() {
    return this.id;
}

User.prototype.setId = function(id) {
    this.id = id;
}

User.prototype.getEmail = function() {
    return this.email;
}

User.prototype.setEmail = function(email) {
    this.email = email;
}

User.prototype.getName = function() {
    return this.name;
}

User.prototype.setName = function(name) {
    this.name = name;
}

User.prototype.getPassword = function() {
    return this.password;
}

User.prototype.setPassword = function(password) {
    this.password = password;
}

User.prototype.getUser = function() {
    return {id: this.getId(), email: this.getEmail(), name: this.getName(), password: this.getPassword()};
}

// EXPORT THE PARAMETER
module.exports = User;