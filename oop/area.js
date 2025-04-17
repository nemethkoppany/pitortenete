class Area{
    /**
     * 
     * @param {string} nameOfTheClass 
     */
    constructor(nameOfTheClass){ //constructor, amiben van a className
        let divContainer = document.querySelector('.containeroop'); //container kiválasztása
        if(!divContainer){ //ha nincs container, akkor létrehoz egyet
            divContainer = document.createElement('div'); //container létrehozás
            divContainer.className = 'containeroop'; //className beállítása
            document.body.appendChild(divContainer); //container a body-hoz adása
        }

        const div = document.createElement('div'); //div létrehozás
        div.className = nameOfTheClass; //className beállítása
        divContainer.appendChild(div); //a div containerhez adása
    }
}