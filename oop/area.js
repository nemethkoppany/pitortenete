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
        super(nameOfTheClass); //A superrel meghívjuk az Area construktorát
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

class Form extends Area{
    constructor(nameOfTheClass){ //construcor készítése aminek egy paramétere van
        super(nameOfTheClass); //A superrel meghívjuk az Area construktorát

        const form = document.createElement('form'); //A form létrehozás
        this.div.appendChild(form); //A form div-hez adása
        const elementsOfField = [{ //form elemek
            fieldid: "name", //Első elem id-je
            fieldLabel: "Név" //Első eleme labelje
        },
        {
            fieldid: "number", //Második elem id-je
            fieldLabel: "Számjegyek száma" //Második elem labelje
        }, { 
            fieldid: "century", //Harmadik elem id-je
            fieldLabel: "Század" //Harmadik elem labelje
        }];

        for(const element of elementsOfField){
            const field = divMaker('field'); //field létrehozás
            form.appendChild(field); //A field form-hoz adása
            
            const label = document.createElement('label'); //A label létrehozása
            label.innerHTML = element.fieldLabel; //A label tartalom beállítása
            label.htmlFor = element.fieldid; //A label htmlFor beállítása

            field.appendChild(label); //A label field-hez adása

            const input = document.createElement('input'); //Az input létrehozása
            input.id = element.fieldid; //Az input id beállítása

            field.appendChild(document.createElement("br")) //A br elem létrehozása és hozzáadása a fieldhez
            field.appendChild(input) //Az input hozzáadása a field-hez
        }

        const button = document.createElement("button");//Button létrehozása
        button.textContent = "Hozzáadás"; //Button tartalmának megadása
        form.appendChild(button); //Button formhoz adása
    }
}