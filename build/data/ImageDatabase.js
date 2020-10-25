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
exports.ImageDatabase = void 0;
var BaseDatabase_1 = require("./BaseDatabase");
var Image_1 = require("../model/Image");
var ImageDatabase = (function (_super) {
    __extends(ImageDatabase, _super);
    function ImageDatabase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageDatabase.prototype.createImage = function (id, subtitle, author, date, file, tags) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.getConnection()
                                .insert({
                                id: id,
                                subtitle: subtitle,
                                author: author,
                                date: date,
                                file: file,
                                tags: tags
                            })
                                .into(ImageDatabase.TABLE_NAME)];
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
    ImageDatabase.prototype.getImageById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection().raw("\n      SELECT i.id, i.subtitle, i.author, i.date, i.file, i.tags, u.id as user_id\n      FROM " + ImageDatabase.TABLE_NAME + " i\n      JOIN " + ImageDatabase.TABLE_USERS + " u\n      ON i.author = u.nickname\n      WHERE i.id = \"" + id + "\"\n    ")];
                    case 1:
                        result = _a.sent();
                        return [2, Image_1.Image.toImageModel(result[0])];
                }
            });
        });
    };
    ImageDatabase.prototype.getImagesFromUser = function (author) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection()
                            .select("*")
                            .from(ImageDatabase.TABLE_NAME)
                            .where({ author: author })];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    ImageDatabase.prototype.getAllImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection()
                            .select("*")
                            .from(ImageDatabase.TABLE_NAME)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    ImageDatabase.prototype.deleteImageById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection()
                            .del()
                            .from(ImageDatabase.TABLE_NAME)
                            .where({ id: id })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ImageDatabase.prototype.addImageInCollection = function (id, image_id, collection_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConnection()
                            .insert({
                            id: id,
                            image_id: image_id,
                            collection_id: collection_id
                        })
                            .into(ImageDatabase.TABLE_COLLECTIONS_RELATIONSHIPS)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ImageDatabase.prototype.searchPost = function (searchData) {
        return __awaiter(this, void 0, void 0, function () {
            var resultsPerPage, offset, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultsPerPage = 5;
                        offset = resultsPerPage * (searchData.page - 1);
                        return [4, this.getConnection().raw("\n      SELECT * FROM " + ImageDatabase.TABLE_NAME + " i\n      WHERE i.subtitle LIKE \"%" + searchData.subtitle.toLocaleLowerCase() + "%\"\n      OR i.tags LIKE \"%" + searchData.tag.toLocaleLowerCase() + "%\"\n      ORDER BY i." + searchData.orderBy + " " + searchData.orderType + "\n      LIMIT " + resultsPerPage + "\n      OFFSET " + offset + "\n    ")];
                    case 1:
                        result = _a.sent();
                        return [2, result[0]];
                }
            });
        });
    };
    ImageDatabase.TABLE_NAME = "image_management_images";
    ImageDatabase.TABLE_USERS = "image_management_users";
    ImageDatabase.TABLE_COLLECTIONS = "image_management_collections";
    ImageDatabase.TABLE_COLLECTIONS_RELATIONSHIPS = "image_management_collections_relationships";
    return ImageDatabase;
}(BaseDatabase_1.BaseDatabase));
exports.ImageDatabase = ImageDatabase;
//# sourceMappingURL=ImageDatabase.js.map