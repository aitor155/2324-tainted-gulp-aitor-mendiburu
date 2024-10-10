import Effect from "./Effect.mjs"

export default class Ingredient {

    constructor(name, effects, image, value, weight) {
        this.name = name;
        this.effects = effects;
        this.image = image;
        this.value = value;
        this.weight = weight;
    }

    static from({name, effects, image, value, weight}) {
        return new Ingredient(
            name,
            effects.map(effect => Effect.from(effect)),
            image,
            value,
            weight
        );
    }

    hasName(name) {
        return this.name === name;
    }

    findCommonEffects(otherIngredient) {
        return this.effects.filter(effect => otherIngredient.hasEffect(effect));
    }

    hasEffect(effect) {
        return this.effects.some(candidate => effect.name === candidate.name);
    }
}