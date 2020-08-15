'use strict'

//CONSTRUCTOR
function Usuario(loginUsuario, passwordUsuario, preguntaSeguridad, respuestaSeguridad, estado, rol) {
    this.loginUsuario = loginUsuario || null;
    this.passwordUsuario = passwordUsuario || null;
    this.preguntaSeguridad = preguntaSeguridad || null;
    this.respuestaSeguridad = respuestaSeguridad || null;
    this.estado = estado || null;
    this.rol = rol || null;
}

Usuario.prototype.getLoginUsuario = function () {
    return this.loginUsuario;
}

Usuario.prototype.setLoginUsuario = function (loginUsuario) {
    this.loginUsuario = loginUsuario;
}

Usuario.prototype.getPasswordUsuario = function () {
    return this.passwordUsuario;
}

Usuario.prototype.setPasswordUsuario = function (passwordUsuario) {
    this.passwordUsuario = passwordUsuario;
}

Usuario.prototype.getPreguntaSeguridad = function () {
    return this.preguntaSeguridad;
}

Usuario.prototype.setPreguntaSeguridad = function (preguntaSeguridad) {
    this.preguntaSeguridad = preguntaSeguridad;
}

Usuario.prototype.getRespuestaSeguridad = function () {
    return this.respuestaSeguridad;
}

Usuario.prototype.setRespuestaSeguridad = function (respuestaSeguridad) {
    this.respuestaSeguridad = respuestaSeguridad;
}
Usuario.prototype.getEstado = function () {
    return this.estado;
}

Usuario.prototype.setEstado = function (estado) {
    this.estado = estado;
}

Usuario.prototype.getRol = function () {
    return this.rol;
}

Usuario.prototype.setRol = function (XX) {
    this.rol = rol;
}


Usuario.prototype.getUsuario = function () {
    return {
        loginUsuario: this.getLoginUsuario(),
        passwordUsuario: this.getPasswordUsuario(),
        preguntaSeguridad: this.getPreguntaSeguridad(),
        respuestaSeguridad: this.getRespuestaSeguridad(),
        estado: this.getEstado(),
        rol: this.getRol()
    };
}

// EXPORT THE PARAMETER
module.exports = Usuario;