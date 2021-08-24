"use strict";
/**
 * Преобразует Градус в радианы
 * @param  {Number} deg в градусах
 * @return {Numer}     в радианах
 *
 * @private
 */
function deg2rad(deg) {
    return deg * Math.PI / 180;
}
/**
 * Вычисляет расстояние между двумя точками в Км.
 * @param  {Number} lat1 Широта координаты 1
 * @param  {Number} lng1 Долгота координаты 1
 * @param  {Number} lat2 Широта координаты 2
 * @param  {Number} lng2 Долгота координаты 2
 * @return {Number}      Растояние в Км.
 */
function distance(lat1, lng1, lat2, lng2) {
    Array.prototype.slice.call(arguments).forEach(function (arg) {
        if (arg.constructor != Number) {
            throw new Error("Distance() accepts only Numbers");
        }
    });
    if (arguments.length != 4) {
        throw new Error("Please provide two pairs of latlng coordinates");
    }
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dlng = deg2rad(lng2 - lng1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dlng / 2) * Math.sin(dlng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Number(parseFloat(d).toFixed(3));
}
module.exports = distance;
