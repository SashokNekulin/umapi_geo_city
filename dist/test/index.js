"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
var set = new index_1.default();
set.loadCityList();
//Поиск ближайших объектов в радиусе 30 км. от заданных координат
console.log('CIRCLE', set.getListCircle(54.707, 20.507, 30));
// Получить список объектов в прямоугольнике, определяемом двумя координатами
console.log('POLIGON', set.getListPoligon(54.707, 20.507, 54.001, 20.001));
//Получить расстояние в Км. между двумя точками на карте
console.log('DISTANCE', set.distance(54.707, 20.507, 54.001, 20.001));
