
import Geo from "../index";

const set = new Geo()

set.loadCityList()

//Поиск ближайших объектов в радиусе 30 км. от заданных координат
console.log('CIRCLE', set.getListCircle(54.707, 20.507, 30))

// Получить список объектов в прямоугольнике, определяемом двумя координатами
console.log('POLIGON', set.getListPoligon(54.707, 20.507, 54.001, 20.001))

//Получить расстояние в Км. между двумя точками на карте
console.log('DISTANCE', set.distance(54.707, 20.507, 54.001, 20.001))