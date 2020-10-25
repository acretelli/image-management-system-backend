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
exports.UserBusiness = void 0;
var InvalidParameterError_1 = require("../error/InvalidParameterError");
var UnauthorizedError_1 = require("../error/UnauthorizedError");
var UserBusiness = (function () {
    function UserBusiness(userDatabase, idGenerator, hashManager, authenticator) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
    }
    UserBusiness.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var id, hashPassword, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user.name || !user.email || !user.nickname || !user.password) {
                            throw new InvalidParameterError_1.InvalidParameterError("Missing input");
                        }
                        id = this.idGenerator.generate();
                        return [4, this.hashManager.hash(user.password)];
                    case 1:
                        hashPassword = _a.sent();
                        return [4, this.userDatabase.createUser(id, user.name, user.email, user.nickname, hashPassword)];
                    case 2:
                        _a.sent();
                        accessToken = this.authenticator.generateToken({ id: id });
                        return [2, accessToken];
                }
            });
        });
    };
    UserBusiness.prototype.getUserByEmail = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userFromDB, hashCompare, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user.email || !user.password) {
                            throw new InvalidParameterError_1.InvalidParameterError("Missing input.");
                        }
                        return [4, this.userDatabase.getUserByEmail(user.email)];
                    case 1:
                        userFromDB = _a.sent();
                        if (!userFromDB) {
                            throw new InvalidParameterError_1.InvalidParameterError("User not found.");
                        }
                        return [4, this.hashManager.compare(user.password, userFromDB.password)];
                    case 2:
                        hashCompare = _a.sent();
                        if (!userFromDB.id || !hashCompare) {
                            throw new InvalidParameterError_1.InvalidParameterError("User or password incorrect.");
                        }
                        accessToken = this.authenticator.generateToken({ id: userFromDB.id });
                        return [2, accessToken];
                }
            });
        });
    };
    UserBusiness.prototype.getUserById = function (token, id) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, userFromDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accessToken = this.authenticator.getData(token);
                        if (!accessToken) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        return [4, this.userDatabase.getUserById(id)];
                    case 1:
                        userFromDB = _a.sent();
                        return [2, userFromDB];
                }
            });
        });
    };
    UserBusiness.prototype.getProfile = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, userFromDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        accessToken = this.authenticator.getData(token).id;
                        if (!accessToken) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        return [4, this.userDatabase.getProfile(accessToken)];
                    case 1:
                        userFromDB = _a.sent();
                        return [2, userFromDB];
                }
            });
        });
    };
    UserBusiness.prototype.deleteUser = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        accessToken = this.authenticator.getData(token).id;
                        if (!accessToken) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        return [4, this.userDatabase.deleteUser(accessToken)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UserBusiness.prototype.searchUser = function (token, name) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        if (!name) {
                            throw new InvalidParameterError_1.InvalidParameterError("Missing input.");
                        }
                        return [4, this.userDatabase.searchUser(name)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    UserBusiness.prototype.followUser = function (token, following_id) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, alreadyFollow, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        if (!following_id) {
                            throw new InvalidParameterError_1.InvalidParameterError("Missing input.");
                        }
                        accessToken = this.authenticator.getData(token).id;
                        if (!accessToken) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        return [4, this.userDatabase.checkIfFollows(accessToken, following_id)];
                    case 1:
                        alreadyFollow = _a.sent();
                        if (alreadyFollow) {
                            throw new UnauthorizedError_1.UnauthorizedError("You already follow this user.");
                        }
                        id = this.idGenerator.generate();
                        return [4, this.userDatabase.followUser(id, accessToken, following_id)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UserBusiness.prototype.unfollowUser = function (token, following_id) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, alreadyFollow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        if (!following_id) {
                            throw new InvalidParameterError_1.InvalidParameterError("Missing input.");
                        }
                        accessToken = this.authenticator.getData(token).id;
                        if (!accessToken) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        return [4, this.userDatabase.checkIfFollows(accessToken, following_id)];
                    case 1:
                        alreadyFollow = _a.sent();
                        if (!alreadyFollow) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't follow this user.");
                        }
                        return [4, this.userDatabase.unfollowUser(following_id)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UserBusiness.prototype.getUserFeed = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        accessToken = this.authenticator.getData(token).id;
                        return [4, this.userDatabase.getUserFeed(accessToken)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    return UserBusiness;
}());
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map