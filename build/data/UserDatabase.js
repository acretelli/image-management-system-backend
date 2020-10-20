"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.UserDatabase = void 0;
var BaseDatabase_1 = require("./BaseDatabase");
var User_1 = require("../model/User");
var ImageDatabase_1 = require("./ImageDatabase");
var UserDatabase = (function (_super) {
    __extends(UserDatabase, _super);
    function UserDatabase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserDatabase.prototype.createUser = function (id, name, email, nickname, password) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.getConnection()
                                .insert({
                                id: id,
                                name: name,
                                email: email,
                                nickname: nickname,
                                password: password
                            })
                                .into(UserDatabase.TABLE_NAME)];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1.sqlMessage || error_1.message);
                    case 3: return [2];
                }
            });
        });
    };
    UserDatabase.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection()
                            .select("*")
                            .from(UserDatabase.TABLE_NAME)
                            .where({ email: email })];
                    case 1:
                        result = _a.sent();
                        return [2, User_1.User.toUserModel(result[0])];
                }
            });
        });
    };
    UserDatabase.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, user, imageDatabase, images, profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection().raw("\n      SELECT *\n      FROM " + UserDatabase.TABLE_NAME + " u\n      WHERE u.id = \"" + id + "\"\n    ")];
                    case 1:
                        result = _a.sent();
                        user = result[0][0];
                        imageDatabase = new ImageDatabase_1.ImageDatabase();
                        return [4, imageDatabase.getImagesFromUser(user.nickname)];
                    case 2:
                        images = _a.sent();
                        profile = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            nickname: user.nickname,
                            images: images,
                        };
                        return [2, profile];
                }
            });
        });
    };
    UserDatabase.prototype.getProfile = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, user, imageDatabase, images, profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection().raw("\n      SELECT *\n      FROM " + UserDatabase.TABLE_NAME + " u\n      WHERE u.id = \"" + id + "\"\n    ")];
                    case 1:
                        result = _a.sent();
                        user = result[0][0];
                        imageDatabase = new ImageDatabase_1.ImageDatabase();
                        return [4, imageDatabase.getImagesFromUser(user.nickname)];
                    case 2:
                        images = _a.sent();
                        profile = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            nickname: user.nickname,
                            images: images,
                        };
                        return [2, profile];
                }
            });
        });
    };
    UserDatabase.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection()
                            .del()
                            .from(UserDatabase.TABLE_NAME)
                            .where({ id: id })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UserDatabase.prototype.searchUser = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var result, user, imageDatabase, images, profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection().raw("\n      SELECT *\n      FROM " + UserDatabase.TABLE_NAME + " u\n      WHERE u.name LIKE \"%" + name + "%\"\n    ")];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        user = result[0][0];
                        imageDatabase = new ImageDatabase_1.ImageDatabase();
                        return [4, imageDatabase.getImagesFromUser(user.nickname)];
                    case 2:
                        images = _a.sent();
                        profile = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            nickname: user.nickname,
                            images: images,
                        };
                        return [2, profile];
                }
            });
        });
    };
    UserDatabase.prototype.followUser = function (id, user_id, following_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection()
                            .insert({
                            id: id,
                            user_id: user_id,
                            following_id: following_id
                        })
                            .into(UserDatabase.TABLE_FOLLOW)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UserDatabase.prototype.checkIfFollows = function (user_id, following_id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection().raw("\n      SELECT *\n      FROM " + UserDatabase.TABLE_FOLLOW + " f\n      WHERE f.user_id = \"" + user_id + "\" \n      AND f.following_id = \"" + following_id + "\"  \n    ")];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2, true];
                        }
                        else {
                            return [2, false];
                        }
                        return [2];
                }
            });
        });
    };
    UserDatabase.prototype.getUserFeed = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, relation, following, imageDatabase, images;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection().raw("\n      SELECT *\n      FROM " + UserDatabase.TABLE_FOLLOW + " f\n      WHERE f.user_id = \"" + user_id + "\" \n    ")];
                    case 1:
                        result = _a.sent();
                        relation = result[0][0];
                        return [4, this.getUserById(relation.following_id)];
                    case 2:
                        following = _a.sent();
                        console.log(following.nickname);
                        imageDatabase = new ImageDatabase_1.ImageDatabase();
                        return [4, imageDatabase.getImagesFromUser(following.nickname)];
                    case 3:
                        images = _a.sent();
                        return [2, images];
                }
            });
        });
    };
    UserDatabase.TABLE_NAME = "image_management_users";
    UserDatabase.TABLE_FOLLOW = "image_management_users_following";
    return UserDatabase;
}(BaseDatabase_1.BaseDatabase));
exports.UserDatabase = UserDatabase;
//# sourceMappingURL=UserDatabase.js.map