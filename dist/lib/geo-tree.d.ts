export = GeoTree;
declare function GeoTree(): void;
declare class GeoTree {
    tree: RBTree;
    insert(arg1: any, arg2: any, arg3: any): void;
    find(arg1: any, arg2: any, arg3: any, ...args: any[]): any[];
    forEach(callback: any): void;
    dump(silent: any): string;
}
import RBTree = require("./red-black");
