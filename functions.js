
/**
 * 
 * @param {string} nameOfTheClass 
 * @returns {HTMLDivElement}
 */
const divMaker = (nameOfTheClass) =>{ //div készítős arrow function
    const div = document.createElement('div'); //div létrehozás
    div.className = nameOfTheClass; //className beállítása
    return div; //Visszatér a div-el
}


/**
 * 
 * @param {{PiData}[]} piArray 
 * @param {{pi:PiData}:boolean} callback 
 * @returns {{PiData}[]}
 */
const filter = (piArray, callback)=>{//Arrpw function két bemeneti paraméterrel
    const result = []; //Készytünk egy tömböt
    for(const pi of piArray){//Bejárjuk a tömböt
        if(callback(pi)){// Ha a callback függvény visszatérési értéke igaz
            result.push(pi); // A szűrt tömbhöz hozzáadjuk az aktuális elemet
        }
    }
    return result; // Visszatérünk a szűrt tömbbel
}

/**
 * 
 * @param {HTMLDivElement} container 
 * @param {function(HTMLElement): void} callback 
 */
const tableCreation = (container, callback) =>{//Arrow function
    const divThatsATable = divMaker("table"); //div létrehozása classNameel
    container.appendChild(divThatsATable);

    const tableRegular = document.createElement("table")//Valódi table létrehozása
    divThatsATable.appendChild(tableRegular); //Hozzáadjuk a divhez a table-t

    const thead = document.createElement("thead")//A thead készítése
    tableRegular.appendChild(thead); //Hozzáadjuk a table-höz

    const tr = document.createElement("tr");//tr készytése
    thead.appendChild(tr); //Hozzáadjuk a thead-hez

    const headerContent = ["Név", "Számjegyek száma", "Század"];//Tömb amiben a fejléc tartalma van
    for(const content of headerContent){//Végigmegyünk a tömbön
        const th = document.createElement("th");//th készytése
        th.innerText = content //A szöveg az aktuális tartalom lesz
        tr.appendChild(th); //Hozzáadjuk a tr-hez
    }
    const tbody = document.createElement("tbody");//Készytünk egy tbody-t
    tableRegular.appendChild(tbody);//Amit hozzárakunk a table-höz
    callback(tbody);// Meghívjuk a callback függvényt, aminek átadjuk a tbody-t
}

/**
 * 
 * @param {HTMLElement} tbody 
 * @param {HTMLDivElement} container 
 * @param {tomb[]} piArray 
 */
const uploading = (tbody, container, piArray) =>{
    const inputForFile = document.createElement("input")//input készítése
container.appendChild(inputForFile); //Hozzáadom a container-hez
inputForFile.id ="fileinput"//id megadása
inputForFile.type = "file"; //Typus megadása

inputForFile.addEventListener("change", (e)=>{//eventlistener a changere
    const file = e.target.files[0];//Kiválasztjuk a fájlt
    const reader = new FileReader(); //Beolvassuk azt

    reader.onload = () =>{//Betöltésnél
        const fileSperator = reader.result.split("\n")//Elválasztjuk a fájl külön részeit
        const headlinesRemover = fileSperator.slice(1); //Leszedjük a fejlécet

        for(const line of headlinesRemover){//Végigmegyünk a fájlon
            const trimmer = line.trim(); //Leszedjük a felesleges részeket
            const fields = trimmer.split(";") //A pontosvesszőnél elválasztjuk a részeket

            const pi = {//megadjuk, hogy melyik rész micsoda
                name: fields[0],//első rész
                number: fields[1],//második rész
                century: fields[2]//harmadik rész
            };

            piArray.push(pi); //Belerakjuk a tömbbe
            addTheRow(pi, tbody)//Meghíjuk az addTheRow metódust
        }
    }
    reader.readAsText(file);//Szövegként olvassa 
});
        
}
    
/**
 * 
 * @param {HTMLElement} tbody 
 * @param {HTMLDivElement} container 
 * @param {tomb[]} piArray 
 */
const formCreation = (tbody, container, piArray) =>{//Arrow function
    const formDiv = divMaker("form");//div kreálás
    container.appendChild(formDiv);//Hozzáadjuk a ocntainerhez

    const formRegular = document.createElement("form");//Form készítése
    formDiv.appendChild(formRegular);//Hozzáadjuk a div-hez

    const elements = [
        {
            fieldid:"name",//Első elem értéke
            fieldLabel: "Név"//Első elem szövege
        },
        {
            fieldid:"number",//Második elem értéke
            fieldLabel: "Számjegyek száma"//Második elem szövege
        },
        {
            fieldid:"century",//Harmadik elem értéke
            fieldLabel: "Század"//Harmadik elem szövege
        }
    ];

        for(const element of elements){//Végigmegyünk az objektumokon
            const fieldDiv = divMaker("field")//Egy div készytése aminek a className-je field
            formRegular.appendChild(fieldDiv); //Hozzáadjuk ezt a táblázathoz
            
            const label = document.createElement("label")//label elem létrehozása
            label.htmlFor = element.fieldid//A label id-jének megadása
            label.textContent = element.fieldLabel//A label szövegének megadása
            fieldDiv.appendChild(label)//A labelt hozzáadjuk a fieldDiv-hez

            fieldDiv.appendChild(document.createElement("br"))//Hozzáadunk egy sortörést

            const input = document.createElement("input")//Bemeneti mező létrehozása
            input.id = element.fieldid; //Az input id-jének megadása
            fieldDiv.appendChild(input);//Hozzáadjuk a div-hez az inputot

            fieldDiv.appendChild(document.createElement("br"))//Hozzáadunk egy sortörést

            const error = document.createElement("span"); //Span elem készytése
            error.className = "error"; //Megadjuk a class-át is
            fieldDiv.appendChild(error); //Ezt is hozzáadjuk a div-hez
            }
        
   
        const buttonRegular = document.createElement("button")//Gomb létrehozása
        buttonRegular.textContent = "Hozzáadás"; //A gomb szövegének megadása
        formRegular.appendChild(buttonRegular);//A gomb hozzáadása a formhoz

        formRegular.addEventListener("submit", (e)=>{//A formRegular submit eseményére egy eventListener
            e.preventDefault(); //Megakadályozzuk az alapértelmezett működést

            const contentObject = {}//Objektum létrehozása

            const inputFields = e.target.querySelectorAll("input");//Megkeressük az összes inputot

            let isValid = true; //Az isValid alapértelmezett értéke igaz;
            for(const inputField of inputFields){
                const error = inputField.parentElement.querySelector('.error');// Kiválasztjuk a hibaüzenet span elemet
                if(!error){//Ha nincs ilyen class-ú elem
                    console.error("Nincs errorfield")//Kiírjuk, hogy nincs errorfield
                    return; //És kilépünk
                }
                error.textContent =""//Kitötljük a hibaüzenetet
                if(inputField.value === ""){//Ha nincs értéke valamelyik bemeneti mezőnek
                    error.textContent = "Kötelező megadni"; //Adjon hibaüzenetet
                    isValid = false; //És legyen az isValid false
                }
                contentObject[inputField.id] = inputField.value; //A contentObject értékének az id-je legyen egynelő az inputField értékével
            }
            if(isValid){//Ha az isValid értéke igaz
                piArray.push(contentObject);//Felpusholjuk a tömbbe az obejektumot
                addTheRow(contentObject, tbody);//Meghívjük az addTheRow függvényt
            }
        })    
}
   
/**
 * 
 * @param {pi} object 
 * @param {HTMLElement} tbody 
 */
const addTheRow = (object, tbody) =>{//Arrow function
    const tr = document.createElement("tr"); //HTML elem létrehozása
    tbody.appendChild(tr); //Hozzáadjuk a tbody-hoz

    const name = document.createElement("td");//HTML elem létrehozása
            name.textContent = object.name;//textContent megadása
            tr.appendChild(name);//Az egyel fölötte lévő elembe rakása

            const number = document.createElement("td");//HTML elem létrehozása
            number.textContent = object.number;//textContent megadása
            tr.appendChild(number);//Az egyel fölötte lévő elembe rakása

            const century = document.createElement("td");//HTML elem létrehozása
            century.textContent = object.century;//textContent megadása
            tr.appendChild(century);//Az egyel fölötte lévő elembe rakása
}


/**
 * 
 * @param {HTMLDivElement} container 
 * @param {{name: string, number: number, century:number}[]} piArray 
 */
const download = (container, piArray) =>{//Arrow function
    const downloadButton = document.createElement("button"); //gomb létrehozása
downloadButton.textContent = "Letöltés";
container.appendChild(downloadButton); //A containerhez adás

downloadButton.addEventListener("click", ()=>{//Eventlistener a gomb lenyomására
    const link = document.createElement("a"); //Link képezése
    const arrayContents = ["name,number,century"]; //Egy tömb amiben benne vamnak a különböző rublikák

    for(const pi of piArray){//Végigmegyünk a tömbön
        arrayContents.push(`${pi.name};${pi.number};${pi.century}`); //Feltöltjuk egy sorként a tömbbe az adatokat
    }
    const innerText = arrayContents.join("\n");// A tömböt egy stringgé alakítjuk
    const blob = new Blob([innerText]);// Létrehozunk egy Blob objektumot, amiben a szöveg van
    link.href = URL.createObjectURL(blob);// A link href attribútuma a Blob objektum URL-je
    link.download = "ujabb_pi.csv";// A link letöltési neve 
    link.click(); // A linkre kattintunk, hogy letöltsük a fájlt
    URL.revokeObjectURL(link.href);// A Blob objektum URL-jét visszavonjuk
});
}

/**
 * 
 * @param {HTMLDivElement} container 
 * @param {HTMLElement} tbody 
 * @param {tomb[]} piArray 
 */
const filteredForm = (container, tbody, piArray) =>{
    const filterFormDiv = divMaker("filterform"); //Készítünk egy divet aminek adunk egy class-t
container.appendChild(filterFormDiv); //Hozzáadjuk a containerhez

const formForFilter = document.createElement("form")//form létrehozása
filterFormDiv.appendChild(formForFilter);//Hozzáadjuk a div-hez

const select = document.createElement("select")//Készítünk egy selectet
formForFilter.appendChild(select);//Hozzáadjuk a formhoz a selectet

const options = [{
    value: "",//Első opció értéke
    innerText: "Nincs szűrés"//Első opció innerTextje
},
{
    value: "name",//Második opció értéke
    innerText: "Név"//Második opció innerTextje
},
{
    value:"number",//Harmadik opció értéke
    innerText: "Számjegyek száma"//Harmadik opció innerTextje
},
{
    value:"century",//Negyedik opció értéke
    innerText:"Évszázad"//Negyedik opció innerTextje
}
];

for(const option of options){//Végigmegyünk a tömbön
    const optionElement = document.createElement("option")//Option elem létrehozása
    optionElement.value = option.value; //Értékadás
    optionElement.innerText = option.innerText //Szöveg megadása
    select.appendChild(optionElement);
}

const input = document.createElement("input")//input készytése
input.id ="filterInput";
formForFilter.appendChild(input);//Hozzáadjuk a formhoz

const button = document.createElement("button"); //Gomb létrehozása
button.innerText ="Szűrés"//A gomb szövege
formForFilter.appendChild(button); //Hozzáadjuk a formhoz

formForFilter.addEventListener("submit", (e)=>{//eventlistener a formForFilter submit eseményére
    e.preventDefault();//Megakadályozzuk az alapértelmezett végrehajtást

    const filterInput = e.target.querySelector("#filterInput"); //Megkeressük a filterInput id-jű inputot
    const select = e.target.querySelector("select");//Megkeressük a selectet

    const ArrayThatIsFiltered = filter(piArray, (element)=>{//Változóban eltárolt arrow function
        if(select.value == "name"){//Ha a kiválasztott opció  értéke name
            if(filterInput.value === element.name){//És az input értéke megegyezik a névvel
                return true;//Térjen vissza igazzal
            }
        }
        else if(select.value == "number"){//Ha a kiválasztott opció  értéke number
            if(filterInput.value === element.number){//És az input értéke megegyezik a numberrel
                return true;//Térjen vissza igazzal
            }
        }
        else if(select.value == "century"){//Ha a kiválasztott opció  értéke century
            if(filterInput.value === element.century){//És az input értéke megegyezik a centuryval
                return true;//Térjen vissza igazzal
            }
        }
        else{//Minden más esetben
            return true;//Térjen vissza igazzal
        }
    });

    tbody.innerHTML ="" //Kitöröljük a tbody tartalmát
    
    for(const element of ArrayThatIsFiltered){//Végigmegyünk a tömbön
        addTheRow(element, tbody);
    }
})
}