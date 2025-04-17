class PiData{
    /**
     * @type {string}
     */
    #name //privát változó

    /**
     * @type {number}
     */
    #number//privát változó

    /**
     * @type {number}
     */
    #century //privát változó

    get name(){//Getter definiálása
        return this.#name;//Visszatérünk a privát változóval
    }

    get number(){//Getter definiálása
        return this.#number//Visszatérünk a privát változóval
    }

    get century(){//Getter definiálása
        return this.#century;//Visszatérünk a privát változóval
    }

    /**
     * 
     * @param {string} name 
     * @param {number} number 
     * @param {number} century 
     */
    constructor(name, number, century){//Constructor három bemeneti paraméterrel
        this.#name = name; //értékadás
        this.#number = number;//értékadás
        this.#century = century;//értékadás
    }
}