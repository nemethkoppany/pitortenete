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

divAsAContainer.appendChild(divTable); //A table container-hez adása
divAsAContainer.appendChild(divForm); //A form container-hez adása