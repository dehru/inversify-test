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
 * This file tests out direct property injection as well as inSingletonScope()
 */
var TYPES = {
    Katana: "Katana",
    Shuriken: "Shuriken",
    Sabre: "Sabre",
    Warrior: "Warrior",
    Weapon: "Weapon"
};
let throwable = (0, inversify_1.tagged)("throwable", true);
let notThrowable = (0, inversify_1.tagged)("notThrowable", false);
let Katana = class Katana {
    constructor() {
        this.count = 0;
    }
    strike() {
        this.count++;
        return this.hit();
    }
    hit() {
        return `cut ${this.count}!`;
    }
};
Katana = __decorate([
    (0, inversify_1.injectable)()
], Katana);
let Shuriken = class Shuriken {
    constructor() {
        this.count = 0;
    }
    strike() {
        this.count++;
        return this.throw();
    }
    throw() {
        return `hit ${this.count}!`;
    }
};
Shuriken = __decorate([
    (0, inversify_1.injectable)()
], Shuriken);
let Sabre = class Sabre {
    constructor() {
        this.count = 0;
    }
    strike() {
        this.count++;
        return this.slice();
    }
    slice() {
        return `slice ${this.count}!`;
    }
};
Sabre = __decorate([
    (0, inversify_1.injectable)()
], Sabre);
let Ninja = class Ninja {
    fight() { return `${this.constructor.name} ${this._katana.strike()}`; }
    ;
    sneak() { return `${this.constructor.name} ${this._shuriken.strike()}`; }
    ;
};
__decorate([
    (0, inversify_1.inject)(TYPES.Weapon),
    (0, inversify_1.named)('asian'),
    __metadata("design:type", Katana)
], Ninja.prototype, "_katana", void 0);
__decorate([
    (0, inversify_1.inject)(TYPES.Weapon),
    (0, inversify_1.tagged)('throwable', true),
    __metadata("design:type", Shuriken)
], Ninja.prototype, "_shuriken", void 0);
Ninja = __decorate([
    (0, inversify_1.injectable)()
], Ninja);
let Knight = class Knight {
    fight() { return `${this.constructor.name} ${this._sabre.strike()}`; }
    ;
    sneak() { return `${this.constructor.name} ${this._sabre.strike()}`; }
    ;
};
__decorate([
    (0, inversify_1.inject)(TYPES.Weapon),
    (0, inversify_1.named)('european'),
    __metadata("design:type", Sabre)
], Knight.prototype, "_sabre", void 0);
Knight = __decorate([
    (0, inversify_1.injectable)()
], Knight);
var container = new inversify_1.Container();
container.bind(TYPES.Warrior).to(Ninja).when(() => {
    return process.env.IN_EUROPE === 'false';
});
container.bind(TYPES.Warrior).to(Knight).when(() => {
    return process.env.IN_EUROPE === 'true';
});
container.bind(TYPES.Weapon).to(Katana).inRequestScope().whenTargetNamed('asian');
container.bind(TYPES.Weapon).to(Sabre).inSingletonScope().whenTargetNamed('european');
container.bind(TYPES.Weapon).to(Shuriken).whenTargetTagged('throwable', true);
console.log(container.isBound(TYPES.Warrior));
process.env.IN_EUROPE = 'false';
var ninja1 = container.get(TYPES.Warrior);
var ninja2 = container.get(TYPES.Warrior);
process.env.IN_EUROPE = 'true';
var knight1 = container.get(TYPES.Warrior);
var knight2 = container.get(TYPES.Warrior);
console.log(ninja1.fight());
console.log(ninja1.sneak());
console.log(knight1.fight());
console.log(knight1.sneak());
console.log(ninja2.fight());
console.log(ninja2.sneak());
console.log(knight2.fight());
console.log(knight2.sneak());
//# sourceMappingURL=property-injection.js.map