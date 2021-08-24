export = RBTree;
declare function RBTree(): void;
declare class RBTree {
    root: any;
    insert(arg1: any, arg2: any): void;
    _insert(key: any, value: any): void;
    find(start: any, end: any): any[];
    forEach(callback: any): void;
    dump(silent: any): string;
}
