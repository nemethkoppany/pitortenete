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

    const input = document.createElement('input'); //input létrehozás
    input.id = fieldElement.fieldid; //input id beállítása
    field.appendChild(document.createElement('br')); //Sortörés fieldhez adása
    field.appendChild(input); //Az input field-hez adása
}

const buttonRegular = document.createElement("button"); //Button létrehozása
buttonRegular.textContent = "Hozzáadás";//A button tartalma
formRegular.appendChild(buttonRegular); //A button formhoz adása

formRegular.addEventListener("submit", (e)=>{//Eventlistener a submit eseményre
    e.preventDefault(); //Alapétrelmezett végrehajtás megakadályozása

    const contentObject = {} //Objektum létrehozása
    const inputs = e.target.querySelectorAll("input") //Megkeressük az összes inputot
    for(const input of inputs){ //Végigmegyünk az inputokon
        contentObject[input.id] = input.value; //A contentObject értékének az id-je legyen egynelő az input értékével
    }
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
});

divAsAContainer.appendChild(divTable); //A table container-hez adása
divAsAContainer.appendChild(divForm); //A form container-hez adása