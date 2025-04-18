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

const manager = new Manager(); //Manager példányosítása
const table = new Table('table', manager); //Table osztály példányosítása
const form = new Form('form', fieldElements, manager); //Form osztály példányosítása
const upload = new Upload("upload", manager)//Upload osztály példányosítása

