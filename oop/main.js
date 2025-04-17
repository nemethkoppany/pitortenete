const separator = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(separator); //Az elválasztó body-hoz adása

const fieldElements = [{ //form elemek
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

const table = new Table('table'); //Area osztály példányosítása
const form = new Form('form', fieldElements); //Area osztály példányosítása

