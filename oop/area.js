class Area{

    /**
     * @type {HTMLDivElement}
     */
    #div // Privát változó a div tárolására

    /**
     * @type {Manager}
     */
    #manager //Privát változó a manager tárolására


    /**
     * @returns {HTMLDivElement}
     */
    get div(){ //getter, amivel elérjük a div-et
        return this.#div; //visszaadja a div-et
    }

    /**
     * @returns {Manager}
     */
    get manager(){//Getter a manager eléréséhez
        return this.#manager; //Visszatér a managerrel
    }

    /**
     * 
     * @param {string} nameOfTheClass 
     * @param {Manager} manager
     */
    constructor(nameOfTheClass, manager){ //constructor, amiben van a className és a manager
        this.#manager = manager//értéket adunk a managernek
        const container = this.#getContainerDiv(); //Meghívjuk a privát metódust, ami visszaadja a container div-et
        this.#div = document.createElement("div");//Készítünk egy divet
        this.#div.className = nameOfTheClass;//Megadjuk a class-t
        container.appendChild(this.#div)//Hozzárakjuk a div-et a containerhez
    }

    /**
     * 
     * @returns {HTMLDivElement};
     */
    #getContainerDiv(){ //Privát metódus amivel vagy lekérjuk vagy létrehozzuk a container divet
        let divContainer = document.querySelector('.containeroop'); //van-e már containeroop class-ú div
        if(!divContainer){ //ha nincs container, akkor létrehoz egyet
            divContainer = document.createElement('div'); //container létrehozás
            divContainer.className = 'containeroop'; //className beállítása
            document.body.appendChild(divContainer); //container a body-hoz adása
        }
        return divContainer; //Visszatérünk a divContainerrel
    }

    /**
     * 
     * @param {string} textContent 
     * @returns {HTMLButtonElement}
     */
    buttonCreator(textContent){ //Egy metódus a gomb készítéséhez
        const button = document.createElement("button"); //Button készítése
        button.textContent = textContent;//Megadjuk a gomb szövegét
        return button; //Vissztérünk a gombbal
    }
}

class Table extends Area{

    /**
     * 
     * @param {string} nameOfTheClass 
     * @param {Manager} manager 
     */
    constructor(nameOfTheClass, manager){ //A Table construktora
        super(nameOfTheClass, manager); //A superrel meghívjuk az Area construktorát
        const tbody = this.#tableCreation(); //Létrehozzuk a táblázatot
       
        this.manager.setaddPiCallback(this.#addPiCallback(tbody));//Beállítjuk az új elem hozzáadásakor meghívandó callback-et
        this.manager.setTableRendererCallback(this.#tableCallbackRenderer(tbody));//Beállítjuk a táblázat újrarendereléséért felelős callback-et
    }

    /**
     * 
     * @param {HTMLTableSectionElement} tbody 
     * @returns {function(PiData[]):void}
     */
    #tableCallbackRenderer(tbody){//Privát metódus, ami visszaad egy függvényt
        return (tomb) => { //A függvény bemenete a PiData tömb
            tbody.innerHTML = "";//Kiürítjük a tbodyt
            for(const pi of tomb){// Végigmegyünk a tömbön
                this.#piRowCreator(pi, tbody);//Hozzáadjuk a sort a táblázathoz
            }
        }
    }

    /**
     * 
     * @param {HTMLTableSectionElement} tbody 
     * @returns {function (PiData):void}
     */
    #addPiCallback(tbody){//Privát metódus, ami visszaad egy függvényt
        return(pi) => { // A függvény bemenete egy PiData objektum
            this.#piRowCreator(pi, tbody);//Hozzáadjuk a sort a táblázathoz
        }
    }

    /**
     * 
     * @param {PiData} pi 
     * @param {HTMLTableSectionElement} tbody 
     */
    #piRowCreator(pi, tbody){// Privát metódus egy sor létrehozására
        const tr = document.createElement("tr") //HTML elem létzrehozása
        tbody.appendChild(tr);//Hozzáadjuk a tbody-hoz
    
        this.#createTD(tbody, pi.name); // Név cella hozzáadása
        this.#createTD(tbody, Number(pi.number));//Számjegyek száma cella hozzáadása
        this.#createTD(tbody, Number(pi.century));//Század cella hozzáadása
    }


    /**
     * 
     * @param {HTMLTableRowElement} row 
     * @param {string} textContent 
     * @param {string} type 
     */
    #createTD(row, textContent, type = "td"){//Privát metódus cella létrehozására
        const td = document.createElement(type);//Létrehozunk egy td elemet
        td.textContent = textContent;//Beállítjuk a cella tartalmát
        row.appendChild(td); // Hozzáadjuk a sorhoz
    }

    /**
     * 
     * @returns {HTMLTableSectionElement}
     */
    #tableCreation(){//Privát metódus a táblázat létrehozására
        const table = document.createElement('table'); //table létrehozás
        this.div.appendChild(table); //A table div-hez adása

        const thead = document.createElement('thead'); //thead létrehozás
        table.appendChild(thead); //A thead  table-höz adása

        const tr = document.createElement('tr'); //tr létrehozás
        thead.appendChild(tr); //A tr thead-hez adása

        const headerContent = ["Név", "Számjegyek száma", "Század"]; //A header tartalma
        for(const content of headerContent){ //A headerContent tömb bejárása
           this.#createTD(tr, content, "th");//Hozzáadjuk a fejléc cellákat
        }
        const tbody = document.createElement('tbody'); //A tbody létrehozás
        table.appendChild(tbody); //A tbody table-höz adása
        return tbody; //Visszatérünk a tbody-val
    }
}

class Form extends Area{

    /**
     * @type {FormField[]}}
     */
    #arrayForFormField //Privát változó


    /**
     * 
     * @param {string} nameOfTheClass 
     * @param {{fieldid:string, fieldLabel:string}[]} elementsOfField 
     * @param {Manager} manager 
     */
    constructor(nameOfTheClass,elementsOfField,manager){ //construcor készítése aminek egy paramétere van
        super(nameOfTheClass, manager); //A superrel meghívjuk az Area construktorát

        this.#arrayForFormField = []; //Készítünk egy tömböt

        const form = this.#formCreation(elementsOfField);//Létrehozunk egy formot
        form.addEventListener("submit", this.#submitEventListener());//Hozzáadjuk a submit eseménykezelőt
    }

    /**
     * 
     * @returns {EventListener}
     */
    #submitEventListener(){//Privát metódus ami visszaad egy eseménykezelőt
        return (e) =>{
        e.preventDefault();//Megakadályozzuk az alapértelmezett űrlapküldést
        if(this.#validateFields()){//Ha minden mező ki lett töltve
            const contentObject = this.#getContentObject();// Lekérjük a mezők értékeit
            const pi = new PiData(contentObject.name, Number(contentObject.number), Number(contentObject.century)); // Létrehozunk egy új PiData objektumot
            this.manager.addElement(pi);//Meghívjük az addElement függvényt
        }
    }
    }

    /**
     * 
     * @param {{fieldid:string, fieldLabel:string}[]} fieldList 
     * @returns {HTMLFormElement}
     */
    #formCreation(fieldList){ //Privát metódus a form létrehozására

        const form = document.createElement('form'); //A form létrehozás
        this.div.appendChild(form); //A form div-hez adása
       

        for(const element of fieldList){ //Végigmegyünk a field elemein
           const formField = new FormField(element.fieldid, element.fieldLabel); //létrehozunk egy FormField-et
           this.#arrayForFormField.push(formField); //Feltöltjük a tömbbe
           form.appendChild(formField.getDiv()); //Belerakjuk a formba a formfield-re meghívott getDiv metódust
        }
        const button = this.buttonCreator("Hozzáadás")//Létrehozunk egy hozzáadás gombot
        form.appendChild(button); //Button formhoz adása
        return form;//Visszaadjuk a formot
    }


    /**
     * 
     * @returns {Boolean}
     */
    #validateFields(){// Privát metódus a mezők validálására
        let Isvalid = true;//Létrehozunk egy változót ami alapból igaz
        for(const formField of this.#arrayForFormField){//Végigmegyünk a mezőkön
            formField.error = '';//Töröljük a hibaüzenetet
            if(formField.value === ''){//Ha üres a mező
                formField.error = 'Kötelező megadni';//Adjon hibaüzenetet
                Isvalid = false;//Ás legyen az isValid értéke hamis
            }
        }
        return Isvalid;//Visszaadjuk az eredményt
    }

    /**
     * 
     * @returns {object}
     */
    #getContentObject(){//Privát metódus, ami visszaadja a mezők értékeit objektumban
        const contentObject = {};//Üres objektum
        for(const formField of this.#arrayForFormField){//Végigmegyünk a mezőkön
            contentObject[formField.id] = formField.value;// Az input mező értékét eltároljuk az objektumban az input id-ja alapján
        }
        return contentObject;//Visszaadjuk az objektumot
    }
}

class UploadAndDownload extends Area{
    /**
     * 
     * @param {string} nameOfTheClass 
     * @param {Manager} manager 
     */
    constructor(nameOfTheClass, manager){//Contructor két bemeneti paraméterrel
        super(nameOfTheClass, manager); //Ezzel meghívjuk az Area class constructorát

        const input = document.createElement("input")//input készítése
        input.id ="fileinput"//id megadása
        input.type = "file"; //Típus megadása
        this.div.appendChild(input)//Belerakjuk a divbe

        input.addEventListener("change", (e)=>{//Eseménykezelő a fájl kiválasztására
            const file = e.target.files[0];//Lekérjük a kiválasztott fájlt
            const reader = new FileReader(); //Beolvassuk azt
        
            reader.onload = () =>{//Betöltésnél
                const fileSperator = reader.result.split("\n")//Sorokra bontjuk a fájl tartalmát
                const headlinesRemover = fileSperator.slice(1); //Leszedjük a fejlécet
        
                for(const line of headlinesRemover){//Végigmegyünk a sorokon
                    const trimmer = line.trim(); //Leszedjük a felesleges részeket
                    const fields = trimmer.split(";") //A pontosvesszőnél elválasztjuk a részeket
                    const pi = new PiData(fields[0], Number(fields[1]),Number( fields[2]))//Létrhozunk egy új elemet
                    this.manager.addElement(pi);//Hozzáadjuk az addElement segítségével
                }
            }
            reader.readAsText(file);//Megmondjuk neki, hogy szövegként olvassa be
        })

        const downloadButton = document.createElement("button");//gomb készítése
        downloadButton.textContent ="Letöltés";//Gomb szövege
        this.div.appendChild(downloadButton);//Hozzárakjuk a div-hez

        downloadButton.addEventListener("click", ()=>{//Eventlistener a gomb lenyomására
            const link = document.createElement("a"); //Link létrehozása
            const innerText = this.manager.downloadableString();//Lekérjük a letölthető adatokat
            const blob = new Blob([innerText]);// Létrehozunk egy Blob objektumot, amiben a szöveg van
            link.href = URL.createObjectURL(blob);// A link href attribútuma a Blob objektum URL-je
            link.download = "ujabb_pi.csv";// A link letöltési neve 
            link.click(); // A linkre kattintunk, hogy letöltsük a fájlt
            URL.revokeObjectURL(link.href);// A Blob objektum URL-jét visszavonjuk
        })

    }
}


class FormField{
    /**
     * @type {string}
     */
    #id // Privát változó az id tárolására

    /**
     * @type {HTMLInputElement}
     */
    #inputElement//Privát változó az input elem tárolására

     /**
     * @type {HTMLLabelElement}
     */
    #labelElement//Privát változó a label elem tárolására

     /**
     * @type {HTMLSpanElement}
     */
    #errorElement//Privát változó a hibaüzenet elem tárolására

    /**
     * @returns {string}
     */
    get id(){ //Getter az id eléréséhez
        return this.#id;//Visszatérünk a privát változóval
    }

    /**
     * @returns {string}
     */
    get value(){//Getter az input értékének eléréséhez
        return this.#inputElement.value; //Térjünk vissza a privát változó értékével
    }

    /**
     * @param {string} value
     */
    set error(value){//Setter a hibaüzenet beállításához
        this.#errorElement.textContent = value; //Hibaüzenet beállítása
    }

    /**
     * 
     * @param {string} id 
     * @param {string} labelText 
     */
    constructor(id, labelText){//constructor két bemeneti paraméterrel
        this.#id = id //Az id beállítása
        this.#labelElement = document.createElement("label")//Készítünk egy labelt
        this.#labelElement.htmlFor = id; //Beállítjuk a label for attribútumát
        this.#labelElement.textContent = labelText; //A kiírt szöveg

        this.#inputElement = document.createElement("input");//Készítünk egy inputot
        this.#inputElement.id = id; //id megadása
        
        this.#errorElement = document.createElement("span"); //Span készytése
        this.#errorElement.className = "error"; //Class megadása
    }

    /**
     * 
     * @returns {HTMLDivElement}
     */
    getDiv(){//Metódus ami visszaadja a mezőhöz tartozó div-et
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