import CityList = require('./lib/data.min.json')
const GeoTree = require('./lib/geo-tree')

export default class Geo {
    geo
    constructor() {
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
    addGeoList(arg:any) {
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
    getListPoligon(latOne:number, lngOne:number, latTwo:number, lngTwo:number) {
        const data =  this.geo.find({ lat: latOne, lng: lngOne }, { lat: latTwo, lng: lngTwo })
        return data
    }
    /**
     * Получить список обьектов в радиусе круга
     * @param {number} lat Широта координаты центра
     * @param {number} lng Долгота координаты центра
     * @param {number} radiusКm Радиус круга Км.
     */
     getListCircle(lat:number, lng:number, radiusКm:number) {
        const data =  this.geo.find({ lat, lng }, radiusКm, 'km')
        data.forEach((element:any) => {
            element.distance = this.distance(lat, lng, element.lat, element.lng)
        })
        data.sort(this.compare('distance', null))
        return data
    }

    compare(field: any, order: any) {
        let len = arguments.length;
        if (len === 0) {
            return (a: any, b: any) => (a < b && -1) || (a > b && 1) || 0;
        }
        if (len === 1) {
            switch (typeof field) {
                case 'number':
                    return field < 0 ?
                        ((a: any, b: any) => (a < b && 1) || (a > b && -1) || 0) :
                        ((a: any, b: any) => (a < b && -1) || (a > b && 1) || 0);
                case 'string':
                    return (a: any, b: any) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0;
            }
        }
        if (len === 2 && typeof order === 'number') {
            return order < 0 ?
                ((a: any, b: any) => (a[field] < b[field] && 1) || (a[field] > b[field] && -1) || 0) :
                ((a: any, b: any) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0);
        }
        let fields: any, orders: any;
        if (typeof field === 'object') {
            fields = Object.getOwnPropertyNames(field);
            orders = fields.map((key: any) => field[key]);
            len = fields.length;
        } else {
            fields = new Array(len);
            orders = new Array(len);
            for (let i = len; i--;) {
                fields[i] = arguments[i];
                orders[i] = 1;
            }
        }
        return (a: any, b: any) => {
            for (let i = 0; i < len; i++) {
                if (a[fields[i]] < b[fields[i]]) return orders[i];
                if (a[fields[i]] > b[fields[i]]) return -orders[i];
            }
            return 0;
        };
    }

    deg2rad(deg: number) {
        return deg * Math.PI / 180
    }

    distance(lat1: number, lng1: number, lat2: number, lng2: number) {
        Array.prototype.slice.call(arguments).forEach(function (arg) {
            if (arg.constructor != Number) {
                throw new Error("Distance() accepts only Numbers")
            }
        })
        if (arguments.length != 4) {
            throw new Error("Please provide two pairs of latlng coordinates")
        }
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dlng = this.deg2rad(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dlng / 2) * Math.sin(dlng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return Number(parseFloat(String(d)).toFixed(3))
    }


}