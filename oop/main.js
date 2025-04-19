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
const table = new Table('table', manager);// Példányosítjuk a Table osztályt, átadva a class nevét és a managert
const form = new Form('form', fieldElements, manager); //Példányosítjuk a Form osztályt, átadva a class nevét, a mezőket és a managert
const upload = new UploadAndDownload("upload", manager)//Példányosítjuk az UploadAndDownload osztályt, átadva a class nevét és a managert
const filterOOP = new Filter("filter", manager); // Példányosítjuk a Filter osztályt, átadva a class nevét és a managert

