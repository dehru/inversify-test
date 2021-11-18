import 'reflect-metadata';
import { Container, injectable, inject } from "inversify";

/**
 * This file uses concrete classes, and inversify automatically injects them into the constructor
 * without the need for annotations.
 */

@injectable()
class Katana {
    public hit() {
        return "cut!";
    }
}

@injectable()
class Shuriken {
    public throw() {
        return "hit!";
    }
}

interface Warrior {
    fight(): void;
    sneak(): void;
}

@injectable()
class Ninja {

    private _katana: Katana;
    private _shuriken: Shuriken;

    public constructor(katana: Katana, shuriken: Shuriken) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight() { return this._katana.hit(); };
    public sneak() { return this._shuriken.throw(); };

}

var container = new Container();
container.bind<Ninja>(Ninja).toSelf();
container.bind<Katana>(Katana).toSelf();
container.bind<Shuriken>(Shuriken).toSelf();

var ninja = container.get<Ninja>(Ninja);
console.log(ninja.fight());
console.log(ninja.sneak());