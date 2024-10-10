export default class PotionBag {   //creadora de pociones desde ingredientes de each bags
    constructor (name, potions) {
        this.potions = potions;
        this.name = name;
    }

    static load (data) {

        const player = data.players[0]; //only there is one player

        const specificBags = [
            { name: 'Red Bag', ingredients: player.pouch_red},
            { name: 'Green Bag', ingredients: player.pouch_green},
            { name: 'Yellow Bag', ingredients: player.pouch_yellow},
            { name: 'Aged Bag', ingredients: player.pouch_aged},
        ]
        
        return specificBags;
    }

    static createPotionsSpecificBag(name, ingredientsNameArray, cauldron) { //return PotionBAg //dame array ingredeints name of specific bag


        const specificBagIngredients = [];
        const potionsFromSpecificBag = [];
        let ingredient_1;
        let ingredient_2;
        let potion;

        //cauldrons.ingredients (all the ingredients)
        //ingredients es array the name of ingredients

        //let ingredientOfSpecificBag array of objects:
        for (let i = 0; i < ingredientsNameArray.length; ++i) {
            for (let j = 0; j < cauldron.ingredients.ingredients.length; ++j) {
                if (ingredientsNameArray[i] === cauldron.ingredients.ingredients[j].name) {specificBagIngredients.push(cauldron.ingredients.ingredients[j]);}
            }
            }


        //hacer todas las combinaciones posibles
        for (let i = 0; i < specificBagIngredients.length; ++i) {
            for (let j = i + 1; j < specificBagIngredients.length; ++j) //combinación SOLO Una por pareja
                {
                    ingredient_1 = specificBagIngredients[i];
                    ingredient_2 = specificBagIngredients[j];

                    potion = cauldron.createPotion(ingredient_1.name, ingredient_2.name);

                    potionsFromSpecificBag.push(potion)
                } 
        }
        
        
        return new PotionBag (name, potionsFromSpecificBag);

    }

}
