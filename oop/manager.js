/**
 * @callback addPiCallback
 * @param {PiData} PiData
 * @returns {void}
 * 
 * @callback tableRendererCallback
 * @param {PiData[]} PiTomb
 * @returns {void}
 */



class Manager{
    /**
     * @type {PiData[]}
     */
    #tomb // Privát tömb, amely a PiData objektumokat tárolja

    /**
     * @type {addPiCallback}
     */
    #addPiCallback// Privát változó, az új elem hozzáadásakor meghívandó callback


    /**
     * @type {tableRendererCallback}
     */
    #tableRendererCallback //Privát változó, a táblázat újra rendereléséért felelős callback

    /**
     * @property {PiData[]} tomb
     */
    constructor(){//paraméter nélküli constructor
        this.#tomb = [] //Inicializáljuk a privát tömböt üres tömbbel
    }

    /**
     * 
     * @param {function (PiData):void} {
         
     */
    setaddPiCallback(callback){//Függvény a callbackhez
        this.#addPiCallback = callback; //Az addPiCallback értéke a callback
    }

    /**
     * 
     * @param {function(PiData[]):void} callback 
     */
    setTableRendererCallback(callback){//Setter függvény a tableRendererCallback-hez
        this.#tableRendererCallback = callback;//A privát változó értéke a bemeneti paraméter
    }
    
    /**
     * 
     * @param {PiData} pi
     */
    addElement(pi){//Egy metódus létrehozása az elemek hozzáadására
        this.#tomb.push(pi);//A privát tombhöz hozzáadunk egy új elemet
        this.#addPiCallback(pi);//Meghívjuk az addPiCallback-et az új elemmel
    }

    /**
     * 
     * @param {function (PiData):boolean} callback 
     */
    filter(callback){//Filter metódus egy bemeneti paraméterrel
        const result = [];//Készítünk egy tömböt
        for(const pi of this.#tomb){//Végimegyünk a privát tömbön
            if(callback(pi)){//Ha a callback függvény igazat ad vissza
            result.push(pi)//A tömbhöz hozzáadjuk az új elemet
            } 
        }
        this.#tableRendererCallback(result);//Meghívja a táblázat újra rendereléséért felelős függvényt
    }

    /**
     * 
     * @returns {string[]}
     */
    downloadableString(){// A tárolt adatok letöltéséhez szükséges stringet ad vissza
        const result = ["name, number, century"];//Egy tömb amiben benne vamnak a különböző rublikák
        for(const pi of this.#tomb){// Végigmegyünk a privát tömbön
            result.push(`${pi.name};${Number(pi.number)};${Number(pi.century)}`);// A tömbhöz hozzáadjuk az új sorokat
        }
        return result.join("\n"); //A tömböt soronként összefűzzük egy szöveggé
    }
}