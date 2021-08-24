export default class Geo {
    geo: any;
    constructor();
    /**
     * Загрузить список городов России
     */
    loadCityList(): void;
    /**
     * Добавить обьект в текущий список объектов
     * @param {*} arg объект или масив объектов (обязательные свойства обьекта: lat - Широта, lng - Долгота)
     */
    addGeoList(arg: any): void;
    /**
     * Очистить текущий список объектов
     */
    clearGeoList(): void;
    /**
     * Получить весь текущий список объектов
     * @return {[]}  текущий список объектов
     */
    getGeoList(): any;
    /**
     * Получить список объектов в прямоугольнике, определяемом двумя координатами (аргументы рассматриваются как две диагональные вершины прямоугольника)
     *
     * @param {number} latOne Широта координаты вершины 1
     * @param {number} lngOne Долгота координаты вершины 1
     * @param {number} latTwo Широта координаты вершины 2
     * @param {number} lngTwo Долгота координаты вершины 2
     */
    getListPoligon(latOne: number, lngOne: number, latTwo: number, lngTwo: number): any;
    /**
     * Получить список обьектов в радиусе круга
     * @param {number} lat Широта координаты центра
     * @param {number} lng Долгота координаты центра
     * @param {number} radiusКm Радиус круга Км.
     */
    getListCircle(lat: number, lng: number, radiusКm: number): any;
    compare(field: any, order: any): (a: any, b: any) => any;
    deg2rad(deg: number): number;
    distance(lat1: number, lng1: number, lat2: number, lng2: number): number;
}
