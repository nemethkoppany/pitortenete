const tomb = []//Tömb létrehozása


const containerDiv = divMaker("container")//Készytünk egy div-et és adunk neki egy container class-t
document.body.appendChild(containerDiv); //Hozzáadjuk a containerDivet a bodyhoz

tableCreation(containerDiv, (tbody)=>{// Táblázatot hozunk létre a containerDiv-ben, és a callback megkapja a táblázat törzsét (tbody)
    formCreation(tbody, containerDiv, tomb); // Űrlapot hozunk létre, amely a táblázat törzséhez (tbody), a containerDiv-hez kapcsolódik, és a tomb tömbbe írja az adatokat
    uploading(tbody, containerDiv, tomb); // Fájl feltöltés funkciót adunk hozzá, amely a táblázat törzsét, a containerDiv-et és a tomb tömböt használja
    download(containerDiv,tomb);// Letöltés funkciót adunk hozzá, amely a containerDiv-et és a tomb tömböt használja
    filteredForm(containerDiv,tbody,tomb);// Szűrő űrlapot hozunk létre, amely a containerDiv-et, a táblázat törzsét és a tomb tömböt használja
})