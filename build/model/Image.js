"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
var Image = (function () {
    function Image(id, subtitle, author, date, file, tags) {
        this.id = id;
        this.subtitle = subtitle;
        this.author = author;
        this.date = date;
        this.file = file;
        this.tags = tags;
    }
    Image.prototype.getId = function () {
        return this.id;
    };
    Image.prototype.getSubtitle = function () {
        return this.subtitle;
    };
    Image.prototype.getAuthor = function () {
        return this.author;
    };
    Image.prototype.getDate = function () {
        return this.date;
    };
    Image.prototype.getFile = function () {
        return this.file;
    };
    Image.prototype.getTags = function () {
        return this.tags;
    };
    Image.prototype.setId = function () {
        return this.id;
    };
    Image.prototype.setSubtitle = function () {
        return this.subtitle;
    };
    Image.prototype.setAuthor = function () {
        return this.author;
    };
    Image.prototype.setDate = function () {
        return this.date;
    };
    Image.prototype.setFile = function () {
        return this.file;
    };
    Image.prototype.setTags = function () {
        return this.tags;
    };
    Image.toImageModel = function (image) {
        return new Image(image.id, image.subtitle, image.author, image.date, image.file, image.tags);
    };
    return Image;
}());
exports.Image = Image;
//# sourceMappingURL=Image.js.map