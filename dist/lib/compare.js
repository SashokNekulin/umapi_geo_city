"use strict";
function compare(field, order) {
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
}
module.exports = compare;
