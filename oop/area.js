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
        super(nameOfTheClass); //szuper osztály konstruktora
        const table = document.createElement('table'); //table létrehozás
        this.div.appendChild(table); //table a divhez adása

        const thead = document.createElement('thead'); //thead létrehozás
        table.appendChild(thead); //thead a tablehez adása

        const tr = document.createElement('tr'); //tr létrehozás
        thead.appendChild(tr); //tr a theadhez adása

        const headerContent = ["Név", "Számjegyek száma", "Század"]; //header tartalom
        for(const content of headerContent){ //headerContent tömb bejárása
            const th = document.createElement('th'); //th létrehozás
            th.innerHTML = content; //th tartalom beállítása
            tr.appendChild(th); //th a trhez adása
        }
        const tbody = document.createElement('tbody'); //tbody létrehozás
        table.appendChild(tbody); //tbody a tablehez adása
    }
}