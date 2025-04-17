const divMaker = (nameOfTheClass) =>{ //div készítős arrow function
    const div = document.createElement('div'); //div létrehozás
    div.className = nameOfTheClass; //className beállítása
    return div; //visszatér a div-el
}

const divAsAContainer = divMaker('container'); //container létrehozás
document.body.appendChild(divAsAContainer); //container a body-hoz adása
const divTable = divMaker('table');  //table létrehozás

const divForm = divMaker('form'); //form létrehozás

divAsAContainer.appendChild(divTable); //table a containerhez adása
divAsAContainer.appendChild(divForm); //form a containerhez adása