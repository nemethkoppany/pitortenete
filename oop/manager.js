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
     * @type {{name: string, number: number, century: number}[]}
     */
    #tableRendererCallback //Privát változó

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
     * @param {function} callback 
     */
    setTableRendererCallback(callback){//Egy setter létrehozása a privát változóhoz
        this.#tableRendererCallback = callback;//A privát változó értéke a bemeneti paraméter
    }
    
    /**
     * 
     * @param {PiData} pi
     */
    addElement(pi){//Egy metódus létrehozása
        this.#tomb.push(pi);//A privát tombhöz hozzáadunk egy új elemet
        this.#addPiCallback(pi);//A privát változó értékét meghívjuk
    }

    filter(callback){//Filter metódus egy bemeneti paraméterrel
        const result = [];//Készytünk egy tömböt
        for(const pi of this.#tomb){//Végimegyünk a privát tömbön
            if(callback(pi)){//Ha a callback függvény igazat ad vissza
            result.push(pi)//A tömbhöz hozzáadjuk az új elemet
            } 
        }
        this.#tableRendererCallback(result);//Meghívja a táblázat újra rendereléséért felelős függvényt
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