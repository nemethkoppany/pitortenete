const tomb = []//Tömb létrehozása

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

const divAsAContainer = divMaker('container'); //container létrehozás
document.body.appendChild(divAsAContainer); //A container body-hoz adása
const divTable = divMaker('table');  //table létrehozás


const tableRegular = document.createElement('table'); //table létrehozás
divTable.appendChild(tableRegular); //A table divhez adása

const thead = document.createElement('thead'); //thead létrehozás
tableRegular.appendChild(thead); //A thead table-höz adása

const tr = document.createElement('tr'); //tr létrehozás
thead.appendChild(tr); //A tr thead-hez adása

const headerContent = ["Név", "Számjegyek száma", "Század"]; //header tartalom
for(const content of headerContent){ //headerContent tömb bejárása
    const th = document.createElement('th'); //th létrehozás
    th.innerHTML = content; //th tartalom beállítása
    tr.appendChild(th); //A th tr-hez adása
}
const tbody = document.createElement('tbody'); //tbody létrehozás
tableRegular.appendChild(tbody); //A tbody tablehez adása

const divForm = divMaker('form'); //form létrehozás

const formRegular = document.createElement('form'); //form létrehozás
divForm.appendChild(formRegular); //A form div-hez adása

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

for(const fieldElement of elementsOfField){//fieldElement tömb bejárása
    const field = divMaker('field'); //field létrehozás
    formRegular.appendChild(field); //A field form-hoz adása

    const label = document.createElement('label'); //label létrehozás
    label.innerHTML = fieldElement.fieldLabel; //label tartalom beállítása
    label.htmlFor = fieldElement.fieldid; //label htmlFor beállítása
    field.appendChild(label); //A label fieldh-ez adása

    field.appendChild(document.createElement("br"))//Sortörés hozzáadása a fieldhez

    const input = document.createElement('input'); //input létrehozás
    input.id = fieldElement.fieldid; //input id beállítása
    field.appendChild(input); //Az input field-hez adása
    
    field.appendChild(document.createElement("br"))//Sortörés hozzáadása a fieldhez

    const error = document.createElement("span") //error span létrehozása
    error.className = "error"; //Adunk neki egy class-t
    field.appendChild(error); //Hozzárakjuk a fieldhez
}

const buttonRegular = document.createElement("button"); //Button létrehozása
buttonRegular.textContent = "Hozzáadás";//A button tartalma
formRegular.appendChild(buttonRegular); //A button formhoz adása

formRegular.addEventListener("submit", (e)=>{//Eventlistener a submit eseményre
    e.preventDefault(); //Alapétrelmezett végrehajtás megakadályozása

    const contentObject = {} //Objektum létrehozása
    const inputs = e.target.querySelectorAll("input") //Megkeressük az összes inputot
    let isValid = true; //az isValid alapétrelmezett értéke true
    for(const input of inputs){ //Végigmegyünk az inputokon
        const error = input.parentElement.querySelector(".error"); //Eltároljuk egy változóban az első error classú elemet
        if(!error){//Ha nincs ilyen elem
            console.error("nincs errorfield") //Írjon ki hibaüzenetet
            return; //Lépjünk ki az if-ből
        }
        error.textContent ="";//Töröljük a hibaüzenetet
        if(input.value === ""){//Ha nincs semmi a bementi mezőben
            error.textContent = "Kötelező kitölteni" //Adjon hibát;
            isValid = false; //És legyen az isValid értéke false;
        }

        contentObject[input.id] = input.value; //A contentObject értékének az id-je legyen egynelő az input értékével
    }
    if(isValid){//Ha az isValid értéke igaz maradt
        tomb.push(contentObject); //És azt töltsük bele a táblázatba
    const tr = document.createElement("tr") //HTML elem létzrehozása
    tbody.appendChild(tr);//Hozzáadjuk az egyel fölötti réteghez

    const nametd = document.createElement("td");//HTML elem létzrehozása
    nametd.textContent = contentObject.name; //Értékadás
    tr.appendChild(nametd);//Hozzáadjuk az egyel fölötti réteghez

    const szamjegytd = document.createElement("td");//HTML elem létzrehozása
    szamjegytd.textContent = contentObject.number; //Értékadás
    tr.appendChild(szamjegytd);//Hozzáadjuk az egyel fölötti réteghez

    const szazadtd = document.createElement("td");//HTML elem létzrehozása
    szazadtd.textContent = contentObject.century; //Értékadás
    tr.appendChild(szazadtd);//Hozzáadjuk az egyel fölötti réteghez
    }
});

divAsAContainer.appendChild(divTable); //A table container-hez adása
divAsAContainer.appendChild(divForm); //A form container-hez adása

const inputForFile = document.createElement("input")//input készítése
divAsAContainer.appendChild(inputForFile); //Hozzáadom a container-hez
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

            tomb.push(pi); //Belerakjuk a tömbbe

            const tr = document.createElement("tr"); //HTML elem létrehozása
            tbody.appendChild(tr);//Az egyel fölötte lévő elembe rakása

            const name = document.createElement("td");//HTML elem létrehozása
            name.textContent = pi.name;//textContent megadása
            tr.appendChild(name);//Az egyel fölötte lévő elembe rakása

            const number = document.createElement("td");//HTML elem létrehozása
            number.textContent = pi.number;//textContent megadása
            tr.appendChild(number);//Az egyel fölötte lévő elembe rakása

            const century = document.createElement("td");//HTML elem létrehozása
            century.textContent = pi.century;//textContent megadása
            tr.appendChild(century);//Az egyel fölötte lévő elembe rakása
        }
    }
    reader.readAsText(file);//Megmondjuk neki, hogy szövegként olvassa be
});

const downloadButton = document.createElement("button"); //gomb létrehozása
downloadButton.textContent = "Letöltés";
divAsAContainer.appendChild(downloadButton); //A containerhez adás

downloadButton.addEventListener("click", ()=>{//Eventlistener a gomb lenyomására
    const link = document.createElement("a"); //Link képezése
    const arrayContents = ["name,number,century"]; //Egy tömb amiben benne vamnak a különböző rublikák

    for(const pi of tomb){//Végigmegyünk a tömbön
        arrayContents.push(`${pi.name};${pi.number};${pi.century}`); //Feltöltjuk egy sorként a tömbbe az adatokat
    }
    const innerText = arrayContents.join("\n");// A tömböt egy stringgé alakítjuk
    const blob = new Blob([innerText]);// Létrehozunk egy Blob objektumot, amiben a szöveg van
    link.href = URL.createObjectURL(blob);// A link href attribútuma a Blob objektum URL-je
    link.download = "ujabb_pi.csv";// A link letöltési neve 
    link.click(); // A linkre kattintunk, hogy letöltsük a fájlt
    URL.revokeObjectURL(link.href);// A Blob objektum URL-jét visszavonjuk
});

const filterFormDiv = divMaker("filterform"); //Készítünk egy divet aminek adunk egy class-t
divAsAContainer.appendChild(filterFormDiv); //Hozzáadjuk a containerhez

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

    const ArrayThatIsFiltered = filter(tomb, (element)=>{//Változóban eltárolt arrow function
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
        const tr = document.createElement("tr")//HTML elem készítése
        tbody.appendChild(tr)//Hozzárakjuk az egyel fentebbi elemhez

        const name = document.createElement("td");//Végigmegyünk a tömbön
        name.innerHTML = element.name; //Az szövegének megadása
        tr.appendChild(name);//Hozzárakjuk az egyel fentebbi elemhez

        const number = document.createElement("td");//Végigmegyünk a tömbön
        number.innerHTML = element.number; //Az szövegének megadása
        tr.appendChild(number);//Hozzárakjuk az egyel fentebbi elemhez

        const century = document.createElement("td");//Végigmegyünk a tömbön
        century.innerHTML = element.century; //Az szövegének megadása
        tr.appendChild(century);//Hozzárakjuk az egyel fentebbi elemhez
    }
})