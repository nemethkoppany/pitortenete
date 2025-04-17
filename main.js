/**
 * 
 * @param {string} nameOfTheClass 
 * @returns {HTMLDivElement}
 */
const divMaker = (nameOfTheClass) =>{ //div készítős arrow function
    const div = document.createElement('div'); //div létrehozás
    div.className = nameOfTheClass; //className beállítása
    return div; //visszatér a div-el
}

const divAsAContainer = divMaker('container'); //container létrehozás
document.body.appendChild(divAsAContainer); //container a body-hoz adása
const divTable = divMaker('table');  //table létrehozás


const tableRegular = document.createElement('table'); //table létrehozás
divTable.appendChild(tableRegular); //table a divhez adása

const thead = document.createElement('thead'); //thead létrehozás
tableRegular.appendChild(thead); //thead a tablehez adása

const tr = document.createElement('tr'); //tr létrehozás
thead.appendChild(tr); //tr a theadhez adása

const headerContent = ["Név", "Számjegyek száma", "Század"]; //header tartalom
for(const content of headerContent){ //headerContent tömb bejárása
    const th = document.createElement('th'); //th létrehozás
    th.innerHTML = content; //th tartalom beállítása
    tr.appendChild(th); //th a trhez adása
}
const tbody = document.createElement('tbody'); //tbody létrehozás
tableRegular.appendChild(tbody); //tbody a tablehez adása

const divForm = divMaker('form'); //form létrehozás

divAsAContainer.appendChild(divTable); //table a containerhez adása
divAsAContainer.appendChild(divForm); //form a containerhez adása