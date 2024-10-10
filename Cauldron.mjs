import Potion from "./Potion.mjs";

export default class Cauldron {
    constructor (ingredients) {
        this.ingredients = ingredients;
    }

    createPotion(ingredient_name1, ingredient_name2) {
        const ingredient1 = this.ingredients.find(ingredient_name1);
        const ingredient2 = this.ingredients.find(ingredient_name2);

        const common_effects = ingredient1.findCommonEffects(ingredient2);

        if (common_effects.length === 0)
            return Potion.failed();

        if (this.isPotionOfSanity(ingredient1, ingredient2)) {
            return Potion.sanity();
        } else {
            return Potion.with(
                common_effects[0],
                Math.floor(ingredient1.weight + ingredient2.weight),
                Math.floor(ingredient1.value + ingredient2.value)
            );
        }
    }

    isPotionOfSanity(i1, i2) {
        return (i1.name === "Nightshade" && i2.name ===         "Ectoplasm") ||

        i2.name === "Nightshade" && i1.name === "Ectoplasm" ? true : false;
    }

}