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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
var TYPES = {
    Katana: Symbol.for("Katana"),
    Shuriken: Symbol.for("Shuriken"),
    Sabre: Symbol.for("Sabre"),
    Warrior: Symbol.for("Warrior"),
    Weapon: Symbol.for("Weapon")
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
    constructor(katana, shuriken) {
        this._katana = katana;
        this._shuriken = shuriken;
    }
    fight() { return `${this.constructor.name} ${this._katana.strike()}`; }
    ;
    sneak() { return `${this.constructor.name} ${this._shuriken.strike()}`; }
    ;
};
Ninja = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(TYPES.Weapon)),
    __param(0, (0, inversify_1.named)('asian')),
    __param(1, (0, inversify_1.inject)(TYPES.Weapon)),
    __param(1, (0, inversify_1.tagged)('throwable', true)),
    __metadata("design:paramtypes", [Katana,
        Shuriken])
], Ninja);
let Knight = class Knight {
    constructor(sabre) {
        this._sabre = sabre;
    }
    fight() { return `${this.constructor.name} ${this._sabre.strike()}`; }
    ;
    sneak() { return `${this.constructor.name} ${this._sabre.strike()}`; }
    ;
};
Knight = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(TYPES.Weapon)),
    __param(0, (0, inversify_1.named)('european')),
    __metadata("design:paramtypes", [Sabre])
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
//# sourceMappingURL=symbols.js.map