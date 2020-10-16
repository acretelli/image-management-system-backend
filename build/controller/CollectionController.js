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
exports.CollectionController = void 0;
var CollectionBusiness_1 = require("../business/CollectionBusiness");
var BaseDatabase_1 = require("../data/BaseDatabase");
var CollectionDatabase_1 = require("../data/CollectionDatabase");
var Authenticator_1 = require("../services/Authenticator");
var IdGenerator_1 = require("../services/IdGenerator");
var CollectionController = (function () {
    function CollectionController() {
    }
    CollectionController.prototype.createCollection = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, input, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = req.headers.authorization;
                        input = {
                            title: req.body.title,
                            subtitle: req.body.subtitle,
                            image: req.body.image
                        };
                        return [4, CollectionController.collectionBusiness.createCollection(token, input)];
                    case 1:
                        _a.sent();
                        res.status(200).send({ message: "Collection created successfully" });
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
    CollectionController.prototype.getCollectionById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, id, collection, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = req.headers.authorization;
                        id = req.params.collectionId;
                        return [4, CollectionController.collectionBusiness.getCollectionById(token, id)];
                    case 1:
                        collection = _a.sent();
                        res.status(200).send({ collection: collection });
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
    CollectionController.prototype.getAllCollections = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, collections, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = req.headers.authorization;
                        return [4, CollectionController.collectionBusiness.getAllCollections(token)];
                    case 1:
                        collections = _a.sent();
                        res.status(200).send({ collections: collections });
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
    CollectionController.prototype.deleteCollection = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, id, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = req.headers.authorization;
                        id = req.params.collectionId;
                        return [4, CollectionController.collectionBusiness.deleteCollection(token, id)];
                    case 1:
                        _a.sent();
                        res.status(200).send({ message: "Collection deleted successfully" });
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
    CollectionController.collectionBusiness = new CollectionBusiness_1.CollectionBusiness(new CollectionDatabase_1.CollectionDatabase, new IdGenerator_1.IdGenerator, new Authenticator_1.Authenticator);
    return CollectionController;
}());
exports.CollectionController = CollectionController;
//# sourceMappingURL=CollectionController.js.map