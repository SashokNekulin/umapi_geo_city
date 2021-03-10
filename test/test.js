const GEO = require('../src/index')

const set = new GEO()

set.loadCityList()

// console.log('CIRCLE', set.getListCircle(54.7073218, 20.5072458, 30))

// console.log('POLIGON', set.getListPoligon(54.7073218, 20.5072458, 54.0, 20.0))

// console.log('DISTANCE', set.distance(54.7073218, 20.5072458, 54.0, 20.0))