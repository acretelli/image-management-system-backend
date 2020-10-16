"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
var Collection = (function () {
    function Collection(id, title, subtitle, image) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.image = image;
    }
    Collection.prototype.getId = function () {
        return this.id;
    };
    Collection.prototype.getTitle = function () {
        return this.title;
    };
    Collection.prototype.getSubtitle = function () {
        return this.subtitle;
    };
    Collection.prototype.getImage = function () {
        return this.image;
    };
    Collection.prototype.setId = function () {
        return this.id;
    };
    Collection.prototype.setTitle = function () {
        return this.title;
    };
    Collection.prototype.setSubtitle = function () {
        return this.subtitle;
    };
    Collection.prototype.setImage = function () {
        return this.image;
    };
    Collection.toCollectionModel = function (collection) {
        return new Collection(collection.id, collection.title, collection.subtitle, collection.image);
    };
    return Collection;
}());
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map