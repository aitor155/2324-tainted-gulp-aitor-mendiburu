import { getDataIngredients, getDataPlayer } from "./service.mjs";
import Cauldron from "./Cauldron.mjs"
import Ingredients from "./Ingredients.mjs";
import PotionBag from "./PotionBag.mjs";
import Character from "./Character.mjs";

const execute = async () => {
    try
    {
        const dataIngredients = await getDataIngredients();

        //console.log(dataIngredients);

        const dataPlayer = await getDataPlayer();

        //get the ingrdients objects from data
        const ingredients = Ingredients.load(dataIngredients);

        //console.log(ingredients.ingredients[0]);


        const cauldron = new Cauldron(ingredients); //get cauldron with all th ingredients


        const bagsIngredients = PotionBag.load(dataPlayer); //get array of bags with their ingredients


        //Create potions from the specific bag ingredients (red bag this time)

        const bagsWithPotions = [];

        for (let i = 0; i < bagsIngredients.length; ++i){

            bagsWithPotions.push(PotionBag.createPotionsSpecificBag(bagsIngredients[i].name, bagsIngredients[i].ingredients, cauldron))
        }

        const randomBag = getRandomBag(bagsWithPotions);

        showPotions(randomBag);

        ///get all potions of all bags altogether
        const allPotionsRandomBag = getAllPotionsRandomBag(randomBag);

        /////create character joseph
        const joseph = Character.from(dataPlayer, allPotionsRandomBag);

        showCharacter(joseph);

        joseph.drinkEmAll();

    }
    catch (error){
        console.error("Error in execute:", error.message);
    }

};

execute();


function showPotions(potionBag) { 

    console.log(potionBag.name);
        potionBag.potions.forEach(potion => {
            const {name, value, weight, time} = potion;
    
            console.log(" ");
            console.log("--------------------");
            console.log(`${name}`);
            console.log(`value: ${Math.floor(value)}`);    
            console.log(`weight: ${Math.floor(weight)}`); 
            console.log(`time: ${Math.floor(time)}`);   
        })
    
}

function getRandomBag(bagsWithPotions) {
    let randomIndex = Math.floor(Math.random() * bagsWithPotions.length);

    let randomBag = bagsWithPotions[randomIndex];

    return randomBag;
}

function getAllPotionsRandomBag(randomBag) {

    const allPotions = [];

        for (let j = 0; j < randomBag.potions.length; ++j) {
            allPotions.push(randomBag.potions[j]);
        }

    return allPotions;
}

function showCharacter(character) {
    console.log(" ");
    console.log(" ");
    console.log(`${character.fullName}`);
    console.log('--------------------------------');
    console.log(`Health: ${character.health}`);
    console.log(`Magick: ${character.magick}`);
    console.log(`Stamina: ${character.stamina}`);

    for (let i = 0; i < character.potions.length; ++i) {
        console.log(`Potion ${i + 1}: ${character.potions[i].name}`);
    }
    
}