const GEO = require('../src/index')

const set = new GEO()

set.loadCityList()



const
    // Широта координаты первой вершины
    latOne = 54.707,
    // Долгота координаты первой вершины
    lngOne = 20.507,
    // Широта координаты второй вершины
    latTwo =  54.001,
    // Долгота координаты второй вершины
    lngTwo =  20.001
console.log(set.getListPoligon(latOne, lngOne, latTwo, lngTwo))