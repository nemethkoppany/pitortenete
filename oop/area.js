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

    /**
     * 
     * @returns {HTMLDivElement};
     */
    #getContainerDiv(){ //Új privát függvény
        let divContainer = document.querySelector('.containeroop'); //container kiválasztása
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
     * @returns {HTMLElement}
     */
    buttonCreator(textContent){ //Egy metódus a gomb készítéséhez
        const button = document.createElement("button"); //Button készytése
        button.textContent = textContent;//Megadjuk a gomb szövegét
        return button; //Vissztérünk a gombbal
    }
}

class Table extends Area{
    constructor(nameOfTheClass, manager){ //A Table construktora
        super(nameOfTheClass, manager); //A superrel meghívjuk az Area construktorát
        const tbody = this.#tableCreation(); //Függvény meghívása
       
        this.manager.setaddPiCallback(this.#addPiCallback(tbody));
        this.manager.setTableRendererCallback(this.#tableCallbackRenderer(tbody));
    }

    #tableCallbackRenderer(tbody){
        return (tomb) => {
            tbody.innerHTML = "";
            for(const pi of tomb){
                this.#piRowCreator(pi, tbody);
            }
        }
    }

    #addPiCallback(tbody){
        return(pi) => {
            this.#piRowCreator(pi, tbody);
        }
    }

    #piRowCreator(pi, tbody){//Privát metódus
        const tr = document.createElement("tr") //HTML elem létzrehozása
        tbody.appendChild(tr);//Hozzáadjuk az egyel fölötti réteghez
    
        this.#createTD(tbody, pi.name);
        this.#createTD(tbody, Number(pi.number));
        this.#createTD(tbody, Number(pi.century));
    }


    #createTD(row, textContent, type = "td"){
        const td = document.createElement(type);
        td.textContent = textContent;
        row.appendChild(td);
    }

    /**
     * 
     * @returns {HTMLElement}
     */
    #tableCreation(){//Privát függvény
        const table = document.createElement('table'); //table létrehozás
        this.div.appendChild(table); //A table div-hez adása

        const thead = document.createElement('thead'); //thead létrehozás
        table.appendChild(thead); //A thead  table-höz adása

        const tr = document.createElement('tr'); //tr létrehozás
        thead.appendChild(tr); //A tr thead-hez adása

        const headerContent = ["Név", "Számjegyek száma", "Század"]; //A header tartalma
        for(const content of headerContent){ //A headerContent tömb bejárása
           this.#createTD(tr, content, "th");
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

        const form = this.#formCreation(elementsOfField);
        form.addEventListener("submit", this.#submitEventListener());
    }

    #submitEventListener(){
        return (e) =>{
        e.preventDefault();
        if(this.#validateFields()){
            const contentObject = this.#getContentObject();
            const pi = new PiData(contentObject.name, Number(contentObject.number), Number(contentObject.century));
            this.manager.addElement(pi);
        }


    }
    }

    #formCreation(fieldList){

        const form = document.createElement('form'); //A form létrehozás
        this.div.appendChild(form); //A form div-hez adása
       

        for(const element of fieldList){ //Végigmegyünk a field elemein
           const formField = new FormField(element.fieldid, element.fieldLabel); //Példányosítjuk a FormField-et
           this.#arrayForFormField.push(formField); //Feltöltjük a tömbbe
           form.appendChild(formField.getDiv()); //Belerakjuk a formba a formfield-re meghívott getDiv metódust
        }
        const button = this.buttonCreator("Hozzáadás")
        form.appendChild(button); //Button formhoz adása
        return form;
    }


    #validateFields(){
        let Isvalid = true;
        for(const formField of this.#arrayForFormField){
            formField.error = '';
            if(formField.value === ''){
                formField.error = 'Kötelező megadni';
                Isvalid = false;
            }
        }
        return Isvalid
    }

    #getContentObject(){
        const contentObject = {};
        for(const formField of this.#arrayForFormField){
            contentObject[formField.id] = formField.value;
        }
        return contentObject;
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

        input.addEventListener("change", (e)=>{
            const file = e.target.files[0];//Kiválasztjuk a fájlt
            const reader = new FileReader(); //Beolvassuk azt
        
            reader.onload = () =>{//Betöltésnél
                const fileSperator = reader.result.split("\n")//Elválasztjuk a fájl külön részeit
                const headlinesRemover = fileSperator.slice(1); //Leszedjük a fejlécet
        
                for(const line of headlinesRemover){//Végigmegyünk a fájlon
                    const trimmer = line.trim(); //Leszedjük a felesleges részeket
                    const fields = trimmer.split(";") //A pontosvesszőnél elválasztjuk a részeket
                    const pi = new PiData(fields[0], Number(fields[1]),Number( fields[2]))//Létrhozunk egy új elemet
                    this.manager.addElement(pi);//Hozzáadjuk az addElement segítségével
                }
            }
            reader.readAsText(file);//Megmondjuk neki, hogy szövegként olvassa be
        })

        const downloadButton = document.createElement("button");//gomb készytése
        downloadButton.textContent ="Letöltés";//Gomb felirata
        this.div.appendChild(downloadButton);//Hozzárakjuk a div-hez

        downloadButton.addEventListener("click", ()=>{//Eventlistener a gomb lenyomására
            const link = document.createElement("a"); //Link képezése
            const innerText = this.manager.downloadableString();// A tömböt egy stringgé alakítjuk
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

    /**
     * 
     * @param {string} id 
     * @param {string} labelText 
     */
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