class PiData{
    /**
     * @type {string}
     */
    #name // Privát változó a név tárolására

    /**
     * @type {number}
     */
    #number// Privát változó a számjegyek számának tárolására

    /**
     * @type {number}
     */
    #century // Privát változó az évszázad tárolására

    /**
     * @return {string}
     */
    get name(){// Getter a név lekéréséhez
        return this.#name;// Visszaadja a privát #name változó értékét
    }

    /**
     * @returns {Number}
     */
    get number(){// Getter a számjegyek száma lekéréséhez
        return this.#number// Visszaadja a privát #number változó értékét
    }

    /**
     * @returns {string}
     */
    get century(){// Getter az évszázad lekéréséhez
        return this.#century;// Visszaadja a privát #century változó értékét
    }

    /**
     * 
     * @param {string} name 
     * @param {number} number 
     * @param {number} century 
     */
    constructor(name, number, century){//Constructor három bemeneti paraméterrel
        this.#name = name; //értékadás
        this.#number = Number(number);//értékadás
        this.#century = Number(century);//értékadás
    }
}