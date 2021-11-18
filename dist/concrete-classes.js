"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
/**
 * This file uses concrete classes, and inversify automatically injects them into the constructor
 * without the need for annotations.
 */
let Katana = class Katana {
    hit() {
        return "cut!";
    }
};
Katana = __decorate([
    (0, inversify_1.injectable)()
], Katana);
let Shuriken = class Shuriken {
    throw() {
        return "hit!";
    }
};
Shuriken = __decorate([
    (0, inversify_1.injectable)()
], Shuriken);
let Ninja = class Ninja {
    constructor(katana, shuriken) {
        this._katana = katana;
        this._shuriken = shuriken;
    }
    fight() { return this._katana.hit(); }
    ;
    sneak() { return this._shuriken.throw(); }
    ;
};
Ninja = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [Katana, Shuriken])
], Ninja);
var container = new inversify_1.Container();
container.bind(Ninja).toSelf();
container.bind(Katana).toSelf();
container.bind(Shuriken).toSelf();
var ninja = container.get(Ninja);
console.log(ninja.fight());
console.log(ninja.sneak());
//# sourceMappingURL=concrete-classes.js.map