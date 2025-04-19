/**
 * @typedef {{name:string, number:Number, century:Number}}  piData
 */







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
 * @param {PiData[]} piArray 
 * @param {function(PiData):boolean} callback 
 * @returns {PiData[]}
 */
const filter = (piArray, callback)=>{//Arrow function két bemeneti paraméterrel
    const result = []; //Készytünk egy tömböt
    for(const pi of piArray){//Bejárjuk a piArray tömböt
        if(callback(pi)){// Ha a callback függvény visszatérési értéke igaz
            result.push(pi); // A szűrt tömbhöz hozzáadjuk az aktuális elemet
        }
    }
    return result; // Visszatérünk a szűrt tömbbel
}

/**
 * 
 * @param {HTMLDivElement} container 
 * @param {function(HTMLTableSectionElement): void} callback 
 */
const tableCreation = (container, callback) =>{//Arrow function
    const divThatsATable = divMaker("table"); //div létrehozása classNameel
    container.appendChild(divThatsATable);//Hozzáadjuk a containerhez a table divet

    const tableRegular = document.createElement("table")//Valódi table létrehozása
    divThatsATable.appendChild(tableRegular); //Hozzáadjuk a divhez a table-t

    const thead = document.createElement("thead")//A thead készítése
    tableRegular.appendChild(thead); //Hozzáadjuk a table-höz

    const tr = document.createElement("tr");//tr készítése
    thead.appendChild(tr); //Hozzáadjuk a thead-hez

    const headerContent = ["Név", "Számjegyek száma", "Század"];//Tömb amiben a fejléc tartalma van
    for(const content of headerContent){//Végigmegyünk a tömbön
        const th = document.createElement("th");//th készítése
        th.innerText = content //A szöveg az aktuális tartalom lesz
        tr.appendChild(th); //Hozzáadjuk a tr-hez
    }
    const tbody = document.createElement("tbody");//Készítünk egy tbody-t
    tableRegular.appendChild(tbody);//Amit hozzárakunk a table-höz
    callback(tbody);// Meghívjuk a callback függvényt, aminek átadjuk a tbody-t
}

/**
 * 
 * @param {HTMLTableSectionElement} tbody 
 * @param {HTMLDivElement} container 
 * @param {tomb[]} piArray 
 */
const uploading = (tbody, container, piArray) =>{//Feltöltős arrow function, 3 bemeneti paraméterrel
    const inputForFile = document.createElement("input")//input készítése
container.appendChild(inputForFile); //Hozzáadom a container-hez
inputForFile.id ="fileinput"//id megadása
inputForFile.type = "file"; //Típus megadása

inputForFile.addEventListener("change", (e)=>{//eventlistener az inputForFile change eseményére
    const file = e.target.files[0];//Kiválasztjuk a fájlt
    const reader = new FileReader(); //Beolvassuk azt

    reader.onload = () =>{//Betöltésnél
        const fileSperator = reader.result.split("\n")// Sorokra bontjuk a fájl tartalmát
        const headlinesRemover = fileSperator.slice(1); //Leszedjük a fejlécet

        for(const line of headlinesRemover){//Végigmegyünk mindeen soron
            const trimmer = line.trim(); //Leszedjük a felesleges részeket
            const fields = trimmer.split(";") //A pontosvesszőnél elválasztjuk a részeket

            const pi = {//Objektumot készítünk az adatokból
                name: fields[0],//Név
                number: fields[1],//Számjegyek száma
                century: fields[2]//Század
            };

            piArray.push(pi); //Belerakjuk a tömbbe
            addTheRow(pi, tbody)//Megjelenítjük a sort a táblázatban
        }
    }
    reader.readAsText(file);//Szövegként olvassa 
});
        
}
    
/**
 * 
 * @param {HTMLTableSectionElement} tbody 
 * @param {HTMLDivElement} container 
 * @param {tomb[]} piArray 
 */
const formCreation = (tbody, container, piArray) =>{//Arrow function a form készítéséhez, 3 bemeneti paraméterrel
    const formDiv = divMaker("form");//div kreálás aminek van egy form class-a
    container.appendChild(formDiv);//Hozzáadjuk a containerhez

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

        for(const element of elements){//Végigmegyünk az tömbön
            const fieldDiv = divMaker("field")//Egy div készítése aminek a className-je field
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

            const error = document.createElement("span"); //Span elem készítése
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
            for(const inputField of inputFields){//Végigmegyünk az inputokon
                const error = inputField.parentElement.querySelector('.error');// Kiválasztjuk a hibaüzenet span elemet
                if(!error){//Ha nincs ilyen class-ú elem
                    console.error("Nincs errorfield")//Kiírjuk, hogy nincs errorfield
                    return; //És kilépünk a ciklusból
                }
                error.textContent =""//Kitötljük a hibaüzenetet
                if(inputField.value === ""){//Ha nincs értéke valamelyik bemeneti mezőnek
                    error.textContent = "Kötelező megadni"; //Adjon hibaüzenetet
                    isValid = false; //És legyen az isValid false
                }
                contentObject[inputField.id] = inputField.value; // Az input mező értékét eltároljuk az objektumban az input id-ja alapján
            }
            if(isValid){//Ha az isValid értéke igaz
                piArray.push(contentObject);//Felpusholjuk a tömbbe az obejektumot
                addTheRow(contentObject, tbody);// Új sor beszúrása a táblázatba
            }
        })    
}
   
/**
 * 
 * @param {piData} object 
 * @param {HTMLTableSectionElement} tbody 
 */
const addTheRow = (object, tbody) =>{// Egy új sor (tr) hozzáadása a táblázat törzséhez (tbody) az adott objektum adataival
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
 * @param {piData[]} piArray 
 */
const download = (container, piArray) =>{ // Letöltés funkció
    const downloadButton = document.createElement("button"); //gomb létrehozása
downloadButton.textContent = "Letöltés";
container.appendChild(downloadButton); //A containerhez adás

downloadButton.addEventListener("click", ()=>{//Eventlistener a gomb lenyomására
    const link = document.createElement("a"); //Link képezése
    const arrayContents = ["name,number,century"]; //Egy tömb amiben benne vamnak a különböző rublikák

    for(const pi of piArray){//Végigmegyünk a tömbön
        arrayContents.push(`${pi.name};${pi.number};${pi.century}`); //Minden sort hozzáadunk a fájlhoz
    }
    const innerText = arrayContents.join("\n"); // A tömböt soronként összefűzzük egy szöveggé
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
 * @param {HTMLTableSectionElement} tbody 
 * @param {piData[]} piArray 
 */
const filteredForm = (container, tbody, piArray) =>{//Arrow function a form szűrésére
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

for(const option of options){//Végigmegyünk az opciókon
    const optionElement = document.createElement("option")//Option elem létrehozása
    optionElement.value = option.value;  // Beállítjuk az option értékét
    optionElement.innerText = option.innerText// Beállítjuk az option szövegét
    select.appendChild(optionElement);// Hozzáadjuk az optiont a selecthez
}

const input = document.createElement("input"); // Létrehozunk egy input mezőt
input.id ="filterInput";// Beállítjuk az input id-ját
formForFilter.appendChild(input);//Hozzáadjuk a formhoz

const button = document.createElement("button"); //Gomb létrehozása
button.innerText ="Szűrés"//A gomb szövege
formForFilter.appendChild(button); //Hozzáadjuk a formhoz

formForFilter.addEventListener("submit", (e)=>{//eventlistener a formForFilter submit eseményére
    e.preventDefault();//Megakadályozzuk az alapértelmezett végrehajtást

    const filterInput = e.target.querySelector("#filterInput"); //Megkeressük a filterInput id-jű inputot
    const select = e.target.querySelector("select");//Megkeressük a selectet

    const ArrayThatIsFiltered = filter(piArray, (element)=>{//Változóban eltárolt arrow function
        if(select.value == "name"){// Ha név szerint szűrünk
            if(filterInput.value === element.name){//És az input értéke megegyezik a névvel
                return true;//Térjen vissza igazzal
            }
        }
        else if(select.value == "number"){ // Ha számjegyek száma szerint szűrünk
            if(filterInput.value === element.number){//És az input értéke megegyezik a numberrel
                return true;//Térjen vissza igazzal
            }
        }
        else if(select.value == "century"){ // Ha évszázad szerint szűrünk
            if(filterInput.value === element.century){//És az input értéke megegyezik a centuryval
                return true;//Térjen vissza igazzal
            }
        }
        else{ // Ha nincs kiválasztva szűrési szempont
            return true;//Térjen vissza igazzal
        }
    });

    tbody.innerHTML ="" //Kitöröljük a tbody tartalmát
    
    for(const element of ArrayThatIsFiltered){//Végigmegyünk a tömbön
        addTheRow(element, tbody);// Hozzáadjuk a szűrt elemeket a táblázathoz
    }
})
}