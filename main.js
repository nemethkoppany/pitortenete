const tomb = []//Tömb létrehozása


const containerDiv = divMaker("container")//Készytünk egy div-et és adunk neki egy container class-t
document.body.appendChild(containerDiv); //Hozzáadjuk a containerDivet a bodyhoz

tableCreation(containerDiv, (bodyOfTable)=>{
    formCreation(bodyOfTable, containerDiv, tomb);
    uploading(bodyOfTable,containerDiv, tomb);
    download(containerDiv,tomb);
    filteredForm(containerDiv,bodyOfTable,tomb);
})