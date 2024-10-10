export default class Character {
    constructor (fullName, health, magick, stamina, potions) {
        this.fullName = fullName;
        this.health = health;
        this.magick = magick;
        this.stamina = stamina;
        this.potions = potions;
    }

    static from(playerData, potions) {

        const fullName = `${playerData.players[0].name} the ${playerData.players[0].class}`;

        return new Character(fullName, playerData.players[0].health, playerData.players[0].magick, playerData.players[0].stamina, potions);
    }


    drinkEmAll() {

        console.log(`Health: ${Math.floor(this.health)}`);
        console.log(`Magick: ${Math.floor(this.magick)}`);
        console.log(`Stamina: ${Math.floor(this.stamina)}`);
        console.log('------------------------------');

        for (let i = 0; i < this.potions.length; i++) {
            const potion = this.potions[i];
        
            if (this.health <= 0 || this.magick <= 0 || this.stamina <= 0) {
                console.log(`${this.fullName} can no longer drink. Game over.`);
                break;
            }
        
            // Apply potion effects
            potion.applyEffects(this);
        
            // Check game end conditions
            if (this.health <= 0) {
                console.log(`${this.fullName} has died`);
                break;
            }
            if (this.magick <= 0) {
                console.log(`${this.fullName} has lost all magic`);
                break;
            }
            if (this.stamina <= 0) {
                console.log(`${this.fullName} is completely exhausted and cannot move more.`);
                break;
            }
            if (potion.name === "Potion of Sanity") {
                console.log(`${this.fullName} has found the Potion of Sanity. His mind is healed. Well done!!`);
                break;
            }
        }
    }
    


}