class Manager{
    /**
     * @type {Array}
     */
    #tomb //Privát változó

    /**
     * @type {addPiCallback}
     */
    #addPiCallback //Privát változó

    /**
     * @property {{name: string, number: number, century: number}[]} tomb
     */
    constructor(){//paraméter nélküli constructor
        this.#tomb = [] //deklaráljuk a tömböt
    }

    /**
     * 
     * @param {function (PiData):void} {
        
     }} callback 
     */
    setaddPiCallback(callback){//Függvény a callbackhez
        this.#addPiCallback = callback; //Az addPiCallback értéke a callback
    }

    
    /**
     * 
     * @param {PiData} pi
     */
    addElement(pi){//Egy metódus létrehozása
        this.#tomb.push(pi);//A privát tombhöz hozzáadunk egy új elemet
        this.#addPiCallback(pi);//A privát változó értékét meghívjuk
    }

    /**
     * 
     * @returns {string}
     */
    downloadableString(){
        const result = ["name, number, century"];//Egy tömb amiben benne vamnak a különböző rublikák
        for(const pi of this.#tomb){// Végigmegyünk a forradalom tömbön
            result.push(`${pi.name};${pi.number};${pi.century}`);// A tömbhöz hozzáadjuk az új sorokat
        }
        return result.join("\n"); // A tömböt egy stringgé alakítjuk
    }
}