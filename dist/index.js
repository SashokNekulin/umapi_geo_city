"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CityList = require("./lib/data.min.json");
var GeoTree = require('./lib/geo-tree');
var Geo = /** @class */ (function () {
    function Geo() {
        this.geo = new GeoTree();
    }
    /**
     * Загрузить список городов России
     */
    Geo.prototype.loadCityList = function () {
        this.geo.insert(CityList);
    };
    /**
     * Добавить обьект в текущий список объектов
     * @param {*} arg объект или масив объектов (обязательные свойства обьекта: lat - Широта, lng - Долгота)
     */
    Geo.prototype.addGeoList = function (arg) {
        this.geo.insert(arg);
    };
    /**
     * Очистить текущий список объектов
     */
    Geo.prototype.clearGeoList = function () {
        this.geo = new GeoTree();
    };
    /**
     * Получить весь текущий список объектов
     * @return {[]}  текущий список объектов
     */
    Geo.prototype.getGeoList = function () {
        return this.geo.find();
    };
    /**
     * Получить список объектов в прямоугольнике, определяемом двумя координатами (аргументы рассматриваются как две диагональные вершины прямоугольника)
     *
     * @param {number} latOne Широта координаты вершины 1
     * @param {number} lngOne Долгота координаты вершины 1
     * @param {number} latTwo Широта координаты вершины 2
     * @param {number} lngTwo Долгота координаты вершины 2
     */
    Geo.prototype.getListPoligon = function (latOne, lngOne, latTwo, lngTwo) {
        var data = this.geo.find({ lat: latOne, lng: lngOne }, { lat: latTwo, lng: lngTwo });
        return data;
    };
    /**
     * Получить список обьектов в радиусе круга
     * @param {number} lat Широта координаты центра
     * @param {number} lng Долгота координаты центра
     * @param {number} radiusКm Радиус круга Км.
     */
    Geo.prototype.getListCircle = function (lat, lng, radiusКm) {
        var _this = this;
        var data = this.geo.find({ lat: lat, lng: lng }, radiusКm, 'km');
        data.forEach(function (element) {
            element.distance = _this.distance(lat, lng, element.lat, element.lng);
        });
        data.sort(this.compare('distance', null));
        return data;
    };
    Geo.prototype.compare = function (field, order) {
        var len = arguments.length;
        if (len === 0) {
            return function (a, b) { return (a < b && -1) || (a > b && 1) || 0; };
        }
        if (len === 1) {
            switch (typeof field) {
                case 'number':
                    return field < 0 ?
                        (function (a, b) { return (a < b && 1) || (a > b && -1) || 0; }) :
                        (function (a, b) { return (a < b && -1) || (a > b && 1) || 0; });
                case 'string':
                    return function (a, b) { return (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0; };
            }
        }
        if (len === 2 && typeof order === 'number') {
            return order < 0 ?
                (function (a, b) { return (a[field] < b[field] && 1) || (a[field] > b[field] && -1) || 0; }) :
                (function (a, b) { return (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0; });
        }
        var fields, orders;
        if (typeof field === 'object') {
            fields = Object.getOwnPropertyNames(field);
            orders = fields.map(function (key) { return field[key]; });
            len = fields.length;
        }
        else {
            fields = new Array(len);
            orders = new Array(len);
            for (var i = len; i--;) {
                fields[i] = arguments[i];
                orders[i] = 1;
            }
        }
        return function (a, b) {
            for (var i = 0; i < len; i++) {
                if (a[fields[i]] < b[fields[i]])
                    return orders[i];
                if (a[fields[i]] > b[fields[i]])
                    return -orders[i];
            }
            return 0;
        };
    };
    Geo.prototype.deg2rad = function (deg) {
        return deg * Math.PI / 180;
    };
    Geo.prototype.distance = function (lat1, lng1, lat2, lng2) {
        Array.prototype.slice.call(arguments).forEach(function (arg) {
            if (arg.constructor != Number) {
                throw new Error("Distance() accepts only Numbers");
            }
        });
        if (arguments.length != 4) {
            throw new Error("Please provide two pairs of latlng coordinates");
        }
        var R = 6371;
        var dLat = this.deg2rad(lat2 - lat1);
        var dlng = this.deg2rad(lng2 - lng1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dlng / 2) * Math.sin(dlng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return Number(parseFloat(String(d)).toFixed(3));
    };
    return Geo;
}());
exports.default = Geo;
