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
}