export default class Potion {
    constructor (name, value, weight, time) {
        this.name = name;
        this.value = value;
        this.weight = weight;
        this.time = time;
    }
    
    static with(effect, weight, value) {
        const type = effect.type === 'beneficial' ? "Potion" : "Poison";
        const potion_name = `${type} of ${effect.name}`;
        const time = 10;
        return new Potion(potion_name, value, weight, time);
    }

    static failed() {
        return new FailedPotion();
    }

    static sanity() {
        return new PotionOfSanity();
    }

    applyEffects(character) {
        let healthChange = 0;
        let magickChange = 0;
        let staminaChange = 0;
        let effectMessage = '';

        if (this.name === "Failed potion") {
            effectMessage = `cannot drink.`;
            console.log(`Failed Potion. ${character.fullName} ${effectMessage}`);
            return;
        }

        // Check if potion is a health, magick, or stamina potion
        if (this.name.includes("Health")) {
            healthChange = this.value;
            effectMessage = `gains ${this.value} points of health`;
        } else if (this.name.includes("Magicka")) {
            magickChange = this.value;
            effectMessage = `gains ${this.value} points of magick`;
        } else if (this.name.includes("Stamina")) {
            staminaChange = this.value;
            effectMessage = `gains ${this.value} points of stamina`;
        } else if (this.name === "Potion of Sanity") {
            healthChange = this.value;
            magickChange = this.value;
            staminaChange = this.value;
            effectMessage = `gains ${this.value} points of health, magick & stamina`;
        } else {
            healthChange = 1;
            magickChange = 1;
            staminaChange = 1;
            effectMessage = `gains 1 point of health, magick & stamina`;
        }

        // Handle poisons
        if (this.name.includes("Poison")) {
            if (this.name.includes("Health")) {
                healthChange = -this.value;
                effectMessage = `loses ${this.value} points of health`;
            } else if (this.name.includes("Magicka")) {
                magickChange = -this.value;
                effectMessage = `loses ${this.value} points of magick`;
            } else if (this.name.includes("Stamina")) {
                staminaChange = -this.value;
                effectMessage = `loses ${this.value} points of stamina`;
            }
        }

        // Apply the effects to the character's attributes
        character.health += healthChange;
        character.magick += magickChange;
        character.stamina += staminaChange;

        // Print the effects of drinking the potion
        console.log(`${character.fullName} drinks ${this.name} and ${effectMessage}`);
        console.log(`Health: ${Math.floor(character.health)}`);
        console.log(`Magick: ${Math.floor(character.magick)}`);
        console.log(`Stamina: ${Math.floor(character.stamina)}`);
        console.log('------------------------------');
    }
}
    
    class FailedPotion extends Potion {
        constructor() {
            super("Failed potion", 0, 0, 0);
        }
    }
    
    class PotionOfSanity extends Potion {
        constructor() {
            super("Potion of Sanity", 1000, 1, 50);
        }
    }

