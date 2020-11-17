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
exports.ImageBusiness = void 0;
var InvalidParameterError_1 = require("../error/InvalidParameterError");
var UnauthorizedError_1 = require("../error/UnauthorizedError");
var UserDatabase_1 = require("../data/UserDatabase");
var CollectionDatabase_1 = require("../data/CollectionDatabase");
var ImageBusiness = (function () {
    function ImageBusiness(imageDatabase, idGenerator, authenticator) {
        this.imageDatabase = imageDatabase;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
    }
    ImageBusiness.prototype.createImage = function (token, image) {
        return __awaiter(this, void 0, void 0, function () {
            var id, accessToken, userDatabase, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!image.subtitle || !image.date || !image.file || !image.tags) {
                            throw new InvalidParameterError_1.InvalidParameterError("Missing input.");
                        }
                        id = this.idGenerator.generate();
                        accessToken = this.authenticator.getData(token);
                        userDatabase = new UserDatabase_1.UserDatabase();
                        return [4, userDatabase.getProfile(accessToken.id)];
                    case 1:
                        user = _a.sent();
                        if (!accessToken) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        return [4, this.imageDatabase.createImage(id, image.subtitle, user.nickname, image.date, image.file, image.tags)];
                    case 2:
                        _a.sent();
                        return [2, accessToken];
                }
            });
        });
    };
    ImageBusiness.prototype.getImageById = function (token, id) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, imageFromDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accessToken = this.authenticator.getData(token);
                        if (!accessToken) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        return [4, this.imageDatabase.getImageById(id)];
                    case 1:
                        imageFromDB = _a.sent();
                        return [2, imageFromDB];
                }
            });
        });
    };
    ImageBusiness.prototype.getAllImages = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, imageFromDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accessToken = this.authenticator.getData(token);
                        if (!accessToken) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        return [4, this.imageDatabase.getAllImages()];
                    case 1:
                        imageFromDB = _a.sent();
                        return [2, imageFromDB];
                }
            });
        });
    };
    ImageBusiness.prototype.addImageInCollection = function (token, imageId, collectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var id, accessToken, alreadyFollow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!imageId || !collectionId) {
                            throw new InvalidParameterError_1.InvalidParameterError("Missing input.");
                        }
                        id = this.idGenerator.generate();
                        accessToken = this.authenticator.getData(token);
                        if (!accessToken) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        return [4, this.imageDatabase.checkIfInCollection(collectionId, imageId)];
                    case 1:
                        alreadyFollow = _a.sent();
                        if (alreadyFollow) {
                            throw new UnauthorizedError_1.UnauthorizedError("This image is already in this collection.");
                        }
                        return [4, this.imageDatabase.addImageInCollection(id, imageId, collectionId)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ImageBusiness.prototype.deleteImageFromCollection = function (token, imageId, collectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var id, accessToken, alreadyFollow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!imageId || !collectionId) {
                            throw new InvalidParameterError_1.InvalidParameterError("Missing input.");
                        }
                        id = this.idGenerator.generate();
                        accessToken = this.authenticator.getData(token);
                        if (!accessToken) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        return [4, this.imageDatabase.checkIfInCollection(collectionId, imageId)];
                    case 1:
                        alreadyFollow = _a.sent();
                        if (!alreadyFollow) {
                            throw new UnauthorizedError_1.UnauthorizedError("This image is not in the collection.");
                        }
                        return [4, this.imageDatabase.deleteImageFromCollection(imageId, collectionId)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ImageBusiness.prototype.searchImage = function (searchData) {
        return __awaiter(this, void 0, void 0, function () {
            var validOrderByValues, validOrderTypeValues, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validOrderByValues = ["date", "subtitle"];
                        validOrderTypeValues = ["ASC", "DESC"];
                        if (!validOrderByValues.includes(searchData.orderBy)) {
                            throw new Error("Insert a valid order. It can be 'date' or 'subtitle'.");
                        }
                        if (!validOrderTypeValues.includes(searchData.orderType)) {
                            throw new Error("Insert a valid order. It can be 'ASC' or 'DESC'.");
                        }
                        if (searchData.page < 0) {
                            throw new Error("The page should be bigger than 0.");
                        }
                        return [4, this.imageDatabase.searchPost(searchData)];
                    case 1:
                        result = _a.sent();
                        if (!result.length) {
                            throw new Error("No image was found. Go take some pictures");
                        }
                        return [2, result];
                }
            });
        });
    };
    ImageBusiness.prototype.deleteImage = function (token, id) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, userDatabase, user, image, collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accessToken = this.authenticator.getData(token);
                        if (!accessToken) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        userDatabase = new UserDatabase_1.UserDatabase();
                        return [4, userDatabase.getProfile(accessToken.id)];
                    case 1:
                        user = _a.sent();
                        return [4, this.imageDatabase.getImageById(id)];
                    case 2:
                        image = _a.sent();
                        if (user.nickname !== image.author) {
                            throw new UnauthorizedError_1.UnauthorizedError("You don't have permission to do that.");
                        }
                        collection = new CollectionDatabase_1.CollectionDatabase();
                        return [4, collection.deleteImageFromCollections(id)];
                    case 3:
                        _a.sent();
                        return [4, this.imageDatabase.deleteImageById(id)];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return ImageBusiness;
}());
exports.ImageBusiness = ImageBusiness;
//# sourceMappingURL=ImageBusiness.js.map