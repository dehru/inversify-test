import 'reflect-metadata';
import { Container, injectable, inject, tagged, named } from "inversify";
import { createPropertyAccessChain } from 'typescript';

var TYPES = {
    Katana: Symbol.for("Katana"),
    Shuriken: Symbol.for("Shuriken"),
    Sabre: Symbol.for("Sabre"),
    Warrior: Symbol.for("Warrior"),
    Weapon: Symbol.for("Weapon")
};

let throwable = tagged("throwable", true);
let notThrowable = tagged("notThrowable", false);

interface Weapon {
    count: number;
    strike(): void;
}

@injectable()
class Katana implements Weapon {
    count = 0;
    public strike() {
        this.count++;
        return this.hit();
    }
    public hit() {
        return `cut ${this.count}!`;
    }
}

@injectable()
class Shuriken implements Weapon {
    count = 0;
    public strike() {
        this.count++;
        return this.throw();
    }
    public throw() {
        return `hit ${this.count}!`;
    }
}

@injectable()
class Sabre implements Weapon {
    count = 0;
    public strike() {
        this.count++;
        return this.slice();
    }
    public slice() {
        return `slice ${this.count}!`
    }
}

interface Warrior {
    fight(): void;
    sneak(): void;
}

@injectable()
class Ninja implements Warrior {

    private _katana: Katana;
    private _shuriken: Shuriken;

    public constructor(
            @inject(TYPES.Weapon)
            @named('asian')
            katana: Katana,
            @inject(TYPES.Weapon)
            @tagged('throwable', true)
            shuriken: Shuriken) {
                this._katana = katana;
                this._shuriken = shuriken;
    }

    public fight() { return `${this.constructor.name} ${this._katana.strike()}`; };
    public sneak() { return `${this.constructor.name} ${this._shuriken.strike()}`; };

}

@injectable()
class Knight implements Warrior {

    private _sabre: Sabre

    public constructor(@inject(TYPES.Weapon) @named('european') sabre: Sabre) {
        this._sabre = sabre;
    }

    public fight() { return `${this.constructor.name} ${this._sabre.strike()}`; };
    public sneak() { return `${this.constructor.name} ${this._sabre.strike()}`; };

}

var container = new Container();
container.bind<Warrior>(TYPES.Warrior).to(Ninja).when(() => {
    return process.env.IN_EUROPE === 'false';
});
container.bind<Warrior>(TYPES.Warrior).to(Knight).when(() => {
    return process.env.IN_EUROPE === 'true';
});
container.bind<Weapon>(TYPES.Weapon).to(Katana).inRequestScope().whenTargetNamed('asian');
container.bind<Weapon>(TYPES.Weapon).to(Sabre).inSingletonScope().whenTargetNamed('european');
container.bind<Shuriken>(TYPES.Weapon).to(Shuriken).whenTargetTagged('throwable', true);
console.log(container.isBound(TYPES.Warrior));

process.env.IN_EUROPE = 'false';
var ninja1 = container.get<Ninja>(TYPES.Warrior);
var ninja2 = container.get<Ninja>(TYPES.Warrior);
process.env.IN_EUROPE = 'true';
var knight1 = container.get<Knight>(TYPES.Warrior);
var knight2 = container.get<Knight>(TYPES.Warrior);
console.log(ninja1.fight());
console.log(ninja1.sneak());
console.log(knight1.fight());
console.log(knight1.sneak());
console.log(ninja2.fight());
console.log(ninja2.sneak());
console.log(knight2.fight());
console.log(knight2.sneak());