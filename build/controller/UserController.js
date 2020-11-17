"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var UserBusiness_1 = require("../business/UserBusiness");
var BaseDatabase_1 = require("../data/BaseDatabase");
var UserDatabase_1 = require("../data/UserDatabase");
var IdGenerator_1 = require("../services/IdGenerator");
var HashManager_1 = require("../services/HashManager");
var Authenticator_1 = require("../services/Authenticator");
var UserController = (function () {
    function UserController() {
        var _this = this;
        this.searchUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, name_1, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = req.headers.authorization;
                        name_1 = req.query.name;
                        return [4, UserController.userBusiness.searchUser(token, name_1)];
                    case 1:
                        result = _a.sent();
                        res.status(200).send(result);
                        return [3, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(400).send(err_1.message);
                        return [3, 3];
                    case 3: return [4, BaseDatabase_1.BaseDatabase.destroyConnection()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        }); };
        this.followUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, followingId, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = req.headers.authorization;
                        followingId = req.params.id;
                        return [4, UserController.userBusiness.followUser(token, followingId)];
                    case 1:
                        _a.sent();
                        res.status(200).send({ message: "You're now following this user." });
                        return [3, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(400).send(err_2.message);
                        return [3, 3];
                    case 3: return [4, BaseDatabase_1.BaseDatabase.destroyConnection()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        }); };
        this.unfollowUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, followingId, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = req.headers.authorization;
                        followingId = req.params.id;
                        return [4, UserController.userBusiness.unfollowUser(token, followingId)];
                    case 1:
                        _a.sent();
                        res.status(200).send({ message: "You're not following this user anymore." });
                        return [3, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.status(400).send(err_3.message);
                        return [3, 3];
                    case 3: return [4, BaseDatabase_1.BaseDatabase.destroyConnection()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        }); };
        this.getUserFeed = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = req.headers.authorization;
                        return [4, UserController.userBusiness.getUserFeed(token)];
                    case 1:
                        result = _a.sent();
                        res.status(200).send(result);
                        return [3, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(400).send(err_4.message);
                        return [3, 3];
                    case 3: return [4, BaseDatabase_1.BaseDatabase.destroyConnection()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        }); };
    }
    UserController.prototype.signup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var input, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        input = {
                            name: req.body.name,
                            email: req.body.email,
                            nickname: req.body.nickname,
                            password: req.body.password,
                        };
                        return [4, UserController.userBusiness.createUser(input)];
                    case 1:
                        token = _a.sent();
                        res.status(200).send({ token: token });
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(400).send({ error: error_1.message });
                        return [3, 3];
                    case 3: return [4, BaseDatabase_1.BaseDatabase.destroyConnection()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var loginData, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        loginData = {
                            email: req.body.email,
                            password: req.body.password
                        };
                        return [4, UserController.userBusiness.getUserByEmail(loginData)];
                    case 1:
                        token = _a.sent();
                        res.status(200).send({ token: token });
                        return [3, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(400).send({ error: error_2.message });
                        return [3, 3];
                    case 3: return [4, BaseDatabase_1.BaseDatabase.destroyConnection()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UserController.prototype.getUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, id, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = req.headers.authorization;
                        id = req.params.id;
                        return [4, UserController.userBusiness.getUserById(token, id)];
                    case 1:
                        user = _a.sent();
                        res.status(200).send({ user: user });
                        return [3, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(400).send({ error: error_3.message });
                        return [3, 3];
                    case 3: return [4, BaseDatabase_1.BaseDatabase.destroyConnection()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UserController.prototype.getProfile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = req.headers.authorization;
                        return [4, UserController.userBusiness.getProfile(token)];
                    case 1:
                        user = _a.sent();
                        res.status(200).send({ user: user });
                        return [3, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.status(400).send({ error: error_4.message });
                        return [3, 3];
                    case 3: return [4, BaseDatabase_1.BaseDatabase.destroyConnection()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = req.headers.authorization;
                        return [4, UserController.userBusiness.deleteUser(token)];
                    case 1:
                        _a.sent();
                        res.status(200).send({ message: "User deleted successfully" });
                        return [3, 3];
                    case 2:
                        error_5 = _a.sent();
                        res.status(400).send({ error: error_5.message });
                        return [3, 3];
                    case 3: return [4, BaseDatabase_1.BaseDatabase.destroyConnection()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UserController.userBusiness = new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase, new IdGenerator_1.IdGenerator, new HashManager_1.HashManager, new Authenticator_1.Authenticator);
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map