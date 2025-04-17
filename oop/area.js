class Area{

    /**
     * @type {HTMLDivElement}
     */
    #div //privát változó

    get div(){ //getter, amivel elérjük a div-et
        return this.#div; //visszaadja a div-et
    }

    /**
     * 
     * @param {string} nameOfTheClass 
     */
    constructor(nameOfTheClass){ //constructor, amiben van a className
        let divContainer = document.querySelector('.containeroop'); //container kiválasztása
        if(!divContainer){ //ha nincs container, akkor létrehoz egyet
            divContainer = document.createElement('div'); //container létrehozás
            divContainer.className = 'containeroop'; //className beállítása
            document.body.appendChild(divContainer); //container a body-hoz adása
        }

        this.#div = document.createElement('div'); //div létrehozás
        this.#div.className = nameOfTheClass; //className beállítása
        divContainer.appendChild(this.#div); //div a containerhez adása
    }
}

class Table extends Area{
    constructor(nameOfTheClass){
        super(nameOfTheClass); //A superrel meghívjuk az Areay construktorát
        const table = document.createElement('table'); //table létrehozás
        this.div.appendChild(table); //A table div-hez adása

        const thead = document.createElement('thead'); //thead létrehozás
        table.appendChild(thead); //A thead  table-höz adása

        const tr = document.createElement('tr'); //tr létrehozás
        thead.appendChild(tr); //A tr thead-hez adása

        const headerContent = ["Név", "Számjegyek száma", "Század"]; //A header tartalma
        for(const content of headerContent){ //A headerContent tömb bejárása
            const th = document.createElement('th'); //A th létrehozása
            th.innerHTML = content; //A th tartalom beállítása
            tr.appendChild(th); //A th tr-hez adása
        }
        const tbody = document.createElement('tbody'); //A tbody létrehozás
        table.appendChild(tbody); //A tbody table-höz adása
    }
}