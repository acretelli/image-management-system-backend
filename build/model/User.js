"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = (function () {
    function User(id, name, email, nickname, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    User.prototype.getNickname = function () {
        return this.nickname;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.setId = function (id) {
        this.id = id;
    };
    User.prototype.setName = function (name) {
        this.name = name;
    };
    User.prototype.setEmail = function (email) {
        this.email = email;
    };
    User.prototype.setNickname = function () {
        return this.nickname;
    };
    User.prototype.setPassword = function (password) {
        this.password = password;
    };
    User.toUserModel = function (user) {
        return new User(user.id, user.name, user.email, user.nickname, user.password);
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map