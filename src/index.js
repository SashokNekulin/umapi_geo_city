const GeoTree = require('./geo-tree')
const CityList = require('../lib/data.min.json')
const distance = require('./geo-dist')
const compare = require('./compare')

module.exports = class GEO {

    constructor() {
        this.distance = distance
        this.geo = new GeoTree();
    }

    /**
     * Загрузить список городов России
     */
    loadCityList() {
        this.geo.insert(CityList)
    }
    /**
     * Добавить обьект в текущий список объектов
     * @param {*} arg объект или масив объектов (обязательные свойства обьекта: lat - Широта, lng - Долгота)
     */
    addGeoList(arg) {
        this.geo.insert(arg)
    }
    /**
     * Очистить текущий список объектов
     */
    clearGeoList(){
        this.geo = new GeoTree();
    }

    /**
     * Получить весь текущий список объектов
     * @return {[]}  текущий список объектов
     */
    getGeoList() {
        return this.geo.find()
    }

    /**
     * Получить список объектов в прямоугольнике, определяемом двумя координатами (аргументы рассматриваются как две диагональные вершины прямоугольника)
     *
     * @param {number} latOne Широта координаты вершины 1
     * @param {number} lngOne Долгота координаты вершины 1
     * @param {number} latTwo Широта координаты вершины 2
     * @param {number} lngTwo Долгота координаты вершины 2
     */
    getListPoligon(latOne, lngOne, latTwo, lngTwo) {
        const data =  this.geo.find({ lat: latOne, lng: lngOne }, { lat: latTwo, lng: lngTwo })
        return data
    }

    /**
     * Получить список обьектов в радиусе круга
     * @param {number} lat Широта координаты центра
     * @param {number} lng Долгота координаты центра
     * @param {number} radiusКm Радиус круга Км.
     */
    getListCircle(lat, lng, radiusКm) {
        const data =  this.geo.find({ lat, lng }, radiusКm, 'km')
        data.forEach(element => {
            element.distance = distance(lat, lng, element.lat, element.lng)
        })
        data.sort(compare('distance'))
        return data
    }

}