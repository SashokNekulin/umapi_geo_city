# umapi_geo_city
======

Nodejs модуль для работы с GEO данными, поиск по координатам ближайшего города России, cписок городов России, поск городов в задоном радиусе или квадрате.

## Установка
```
npm install umapi_geo_city
```

## Использование

Подключение:
```js
var GEO = require('umapi_geo_city')

var set = new GEO()

set.loadCityList()
// Поиск ближайших объектов в радиусе 30 км. от заданных координат
console.log('CIRCLE', set.getListCircle(54.7073218, 20.5072458, 30))
// Получить список объектов в прямоугольнике, определяемом двумя координатами
// (аргументы рассматриваются как две диагональные вершины прямоугольника)
console.log('POLIGON', set.getListPoligon(54.7073218, 20.5072458, 54.000, 20.000))
// Получить расстояние между двумя точками в Км.
console.log('DISTANCE', set.distance(54.7073218, 20.5072458, 54.000, 20.000))

```

## Загрузить в текущий список обьектов города России:

```js
set.loadCityList()
```

## Получить текущий список объектов:

```js
console.log(set.getGeoList())
```

## Очистить текущий список объектов:

```js
set.clearGeoList()
```


### Отправка SMS:


## Автор

[Alexandr Nikulin](https://github.com/SashokNekulin/), e-mail: [nekulin@mail.ru](mailto:nekulin@mail.ru)
