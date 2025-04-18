class Area{

    /**
     * @type {HTMLDivElement}
     */
    #div //privát változó

    /**
     * @type {Manager}
     */
    #manager //Privát változó

    get div(){ //getter, amivel elérjük a div-et
        return this.#div; //visszaadja a div-et
    }

    get manager(){//manager getter
        return this.#manager; //Visszatér a managerrel
    }

    /**
     * 
     * @param {string} nameOfTheClass 
     */
    constructor(nameOfTheClass, manager){ //constructor, amiben van a className és a manager
        this.#manager = manager//értéket adunk a managernek
        const container = this.#getContainerDiv(); //Meghívjuk a függvényt
        this.#div = document.createElement("div");//Készítünk egy divet
        this.#div.className = nameOfTheClass;//Megadjuk a class-t
        container.appendChild(this.#div)//Hozzárakjuk a div-et a containerhez
    }

    #getContainerDiv(){ //Új privát függvény
        let divContainer = document.querySelector('.containeroop'); //container kiválasztása
        if(!divContainer){ //ha nincs container, akkor létrehoz egyet
            divContainer = document.createElement('div'); //container létrehozás
            divContainer.className = 'containeroop'; //className beállítása
            document.body.appendChild(divContainer); //container a body-hoz adása
        }
        return divContainer; //Visszatérünk a divContainerrel
    }
}

class Table extends Area{
    constructor(nameOfTheClass, manager){ //A Table construktora
        super(nameOfTheClass, manager); //A superrel meghívjuk az Area construktorát
        const tbody = this.#tableCreation(); //Függvény meghívása
        this.manager.setaddPiCallback((pi)=>{ //callback-es függvény
            const tr = document.createElement("tr") //HTML elem létzrehozása
            tbody.appendChild(tr);//Hozzáadjuk az egyel fölötti réteghez
        
            const nametd = document.createElement("td");//HTML elem létzrehozása
            nametd.textContent = pi.name; //Értékadás
            tr.appendChild(nametd);//Hozzáadjuk az egyel fölötti réteghez
        
            const szamjegytd = document.createElement("td");//HTML elem létzrehozása
            szamjegytd.textContent = pi.number; //Értékadás
            tr.appendChild(szamjegytd);//Hozzáadjuk az egyel fölötti réteghez
        
            const szazadtd = document.createElement("td");//HTML elem létzrehozása
            szazadtd.textContent = pi.century; //Értékadás
            tr.appendChild(szazadtd);//Hozzáadjuk az egyel fölötti réteghez
        })
    }

    #tableCreation(){//Privát függvény
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
        return tbody; //Visszatérünk a tbody-val
    }
}

class Form extends Area{

    /**
     * @type {{fieldid: string, fieldLabel:string}[]}
     */
    #arrayForFormField //Privát változó

    constructor(nameOfTheClass,elementsOfField,manager){ //construcor készítése aminek egy paramétere van
        super(nameOfTheClass, manager); //A superrel meghívjuk az Area construktorát

        this.#arrayForFormField = []; //Készítünk egy tömböt

        const form = document.createElement('form'); //A form létrehozás
        this.div.appendChild(form); //A form div-hez adása
       

        for(const element of elementsOfField){ //Végigmegyünk a field elemein
           const formField = new FormField(element.fieldid, element.fieldLabel); //Példányosítjuk a FormField-et
           this.#arrayForFormField.push(formField); //Feltöltjük a tömbbe
           form.appendChild(formField.getDiv()); //Belerakjuk a formba a formfield-re meghívott getDiv metódust
        }

        const button = document.createElement("button");//Button létrehozása
        button.textContent = "Hozzáadás"; //Button tartalmának megadása
        form.appendChild(button); //Button formhoz adása
        form.addEventListener("submit", (e)=>{//Eseménykezelő a submitra
            e.preventDefault(); //Megakadályozzuk az alapétrelmezett lefutást
            const inputFieldContents = e.target.querySelectorAll("input")//Megkeressük az inputokat
            const contentObject = {}; //Objektum létrehozása
            for(const inputField of inputFieldContents){//Végigmegyünk az inputokon
                contentObject[inputField.id] = inputField.value;//A contentObject értékének az id-je legyen egynelő az input értékével
            }
            const pi_elem = new PiData(contentObject.name, contentObject.number, contentObject.century); //A Pi példányosítása
            this.manager.addElement(pi_elem);//Metódus meghívása
        })
    }
}

class FormField{
    /**
     * @type {string}
     */
    #id //privát változó

    /**
     * @type {HTMLElement}
     */
    #inputElement//privát változó

     /**
     * @type {HTMLElement}
     */
    #labelElement//privát változó

     /**
     * @type {HTMLElement}
     */
    #errorElement//privát változó

    get id(){ //getter definiálása
        return this.#id;//Visszatérünk a privát változóval
    }

    get value(){//getter definiálása
        return this.#inputElement.value; //Térjünk vissza a privát változó értékével
    }

    set error(value){//setter definiálása
        this.#errorElement.textContent = value; //Az elem-be legyen a value írva
    }

    constructor(id, labelText){//constructor két bemeneti paraméterrel
        this.#id = id //Értékadás
        this.#labelElement = document.createElement("label")//Készítünk egy labelt
        this.#labelElement.htmlFor = id; //id megadása
        this.#labelElement.textContent = labelText; //A kiírt szöveg

        this.#inputElement = document.createElement("input");//Készítünk egy inputot
        this.#inputElement.id = id; //id megadása
        
        this.#errorElement = document.createElement("span"); //Span készytése
        this.#errorElement.className = "error"; //Class megadása
    }

    getDiv(){//getDiv metódus
        const div = divMaker("field")//Div készítése és field class név megadása
        const breaker = document.createElement("br")//br készítése
        const breaker2 = document.createElement("br")//br készítése
        const elements = [this.#labelElement, breaker, this.#inputElement, breaker2, this.#errorElement]; //Egy tömbbe eltároljuk az elemeket
        for(const element of elements){//Végigmegyünk a tömbön
            div.appendChild(element); //Hozzáadjuk a divhez
        }
        return div; //Visszatérünk a divvel
    }


}