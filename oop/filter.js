class Filter extends Area{
    /**
     * 
     * @param {string} nameOfTheClass 
     * @param {Manager} manager 
     */
    constructor(nameOfTheClass, manager){//constructor két bemeneti paraméterrel
        super(nameOfTheClass, manager); //Ezzel meghívjuk az Area class constructorát

        const form = document.createElement("form"); //form létrehozása
        this.div.appendChild(form); //Hozzáadjuk a divhez

        const select = document.createElement("select"); //Készytünk egy select elemet
        form.appendChild(select); //Hozzáadjuk a formhoz a selectet
        const options = [{
            value: "", //Az első opció értéke üres
            innerText: "Nincs filter szempont" //Az első opció szövege
        },
        {
            value: "name",//Az második opció értéke 
            innerText: "Név"//Az második opció szövege
        },
        {
            value: "number",//Az harmadik opció értéke 
            innerText:"Számjegyek száma"//Az harmadik opció szövege
        },
        {
            value: "century",//Az negyedik  opció értéke 
            innerText:"Század"//Az negyedik opció szövege
        }]

        for(const option of options){//Véfifmegyünk a tömbön
            const element = document.createElement("option")//option elem létrehozása
            element.value = option.value; //Az option elem értékének megadása
            element.innerText = option.innerText; //Az elem szövegének megadása
            select.appendChild(element); //Hozzáadjuk a selecthez
        }

        const input = document.createElement("input"); //Az input létrehozása
        input.id = "filterInput"; //Adunk az inputnak egy id-t
        form.appendChild(input);//Hozzáadjuk a formhoz

        const button = document.createElement("button");//Gomb létrehozása
        button.innerText = "Szűrés"//Gomb szövegének megadása
        form.appendChild(button);//Hozzáadjuk a gombot a formhoz

        form.addEventListener("submit", (e)=>{//eventListener a form submit eseményére
            e.preventDefault()//Megakadályozzuk az alapértelmezett végrehajtást

            const inputFilter = e.target.querySelector("#filterInput"); //Megkeressük a filterInput id-jű input elemet
            const select = e.target.querySelector("Select"); //Megkeressük a selectet

            this.manager.filter((elementValue)=>{//Meghívjük a filter függvényt
                if(select.value == "name"){//Ha a legördülő menü értéke name
                    if(inputFilter.value ===elementValue.name){//És ha az input értéke megegyezik a keresendő elemmel
                        return true; //Térjen vissza igazzal
                    }
                }
                else if(select.value == "number"){//Ha a legördülő menü értéke number
                    if(Number(inputFilter.value) === Number(elementValue.number)){//És ha az input értéke megegyezik a keresendő elemmel
                        return true;//Térjen vissza igazzal
                    }
                }
                else if(select.value == "century"){//Ha a legördülő menü értéke century
                    if(Number(inputFilter.value) === Number(elementValue.century)){//És ha az input értéke megegyezik a keresendő elemmel
                        return true;//Térjen vissza igazzal
                    }
                }
                else{
                    return true;//Térjen vissza igazzal
                }
            })
        })
    }
}