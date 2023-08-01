const fs = require("fs");

const fileUrl = process.argv[2];

// console.log(process.argv[2]);
const outputUrl = createOutputUrl(fileUrl);

const data = readFile(fileUrl);

if (data) {
    const report = createReport(data);
    writeData(outputUrl, report);
}

function createOutputUrl(url) {
    const splittedUrl = url.split(".");
    // const finalUrl='.'+splittedUrl[1]+'-report.'+splittedUrl[2];
    const lastPart = splittedUrl.pop();
    const firstPart = splittedUrl.join(".");
    const finalUrl = firstPart + "-report." + lastPart;
    return finalUrl;
}

function createReport(data) {
    let report =
        "numero di caratteri: " +
        countChars(data) +
        "\n" +
        "numero di parole: " +
        countWords(data) +
        "\n" +
        "carattere con più occorrenze: " +
        mostUsedChar(data) +
        "\n" +
        "parola con più occorrenze: " +
        mostUsedWord(data);
    return report;
}

function countChars(data) {
    const dataWithoutSpaces = data.replace(/ /g, "");
    return dataWithoutSpaces.length;
}

function countWords(data) {
    const dataArray = data.split(" ");
    return dataArray.length;
}

function topOccurencyInArray(arr){

    let occurrencyMap = {};
    for (let i = 0; i < arr.length; i++) {

        const el = arr[i];

        if(occurrencyMap[el]){
            occurrencyMap[el]+=1;
        }else{
            occurrencyMap[el]=1;
        }
    }

    const keyValues = Object.entries(occurrencyMap);

    keyValues.sort((e1,e2) =>{
        const firstValue = e1[1];
        const secondValue = e2[1];
        return secondValue - firstValue;
    });

    return keyValues[0][0];
}



function mostUsedChar(data){
    const dataWithoutSpaces = data.replace(/ /g, "").split('');
    return topOccurencyInArray(dataWithoutSpaces);

    //Lorem ipsum dolor sit amet
    // let charMap = {};
    // for (let i = 0; i < dataWithoutSpaces.length; i++) {
    //     const char = dataWithoutSpaces[i];

    //     if(charMap[char]){
    //         charMap[char]+=1;
    //     }else{
    //         charMap[char]=1;
    //     }
    // }
    // const keyValues = Object.entries(charMap);

    // keyValues.sort((e1,e2) =>{
    //     const firstValue = e1[1];
    //     const secondValue = e2[1];
    //     return secondValue - firstValue;
    // });

    // return keyValues[0][0];
}

function mostUsedWord(data) {
    const splittedData =  data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()(\r\n|\n|\r)]/g,"").split(" ");
    return topOccurencyInArray(splittedData);
    // let wordMap = {};

    // for (let i = 0; i < splittedData.length; i++) {
    //     const word = splittedData[i];

    //     if(wordMap[word]){
    //         wordMap[word]+=1;
    //     }else{
    //         wordMap[word]=1;
    //     }
    // }

    // console.log(wordMap);
    // const keyValues = Object.entries(wordMap);
    
    // keyValues.sort((e1,e2) =>{
    //     const firstValue = e1[1];
    //     const secondValue = e2[1];
    //     return secondValue - firstValue;
    // });

    // return keyValues[0][0];

}





function readFile(url) {
    try {
        const data = fs.readFileSync(url, "utf8");
        return data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

function writeData(url, data) {
    try {
        fs.writeFileSync(url, data);
    } catch (err) {
        console.error(err.message);
    }
}

// creare un'applicazione node che legga un qualsiasi file di testo
// e nella stessa cartella in cui lo legge scriva un file che si chiama
// come l'originale aggiungendo '-report'
// es pippo.txt => pippo-report.txt;

// numero caratteri: 400 (non compresi gli spazi)
// numero parole: 100

// task aggiuntivi:
// a) carattere con più occorrenze: e
// b) parola con più occorrenze: un



// function mostUsedChar2(data){
//     //Lorem ipsum dolor sit amet
//     let charMap = new Map();
//     for (let i = 0; i < data.length; i++) {
//         const char = data[i];

//         if(charMap.get(char)){
//             charMap.set(char, charMap.get(char) + 1);
//         }else{
//             charMap.set(char, 1);
//         }
        
//     }
//     console.log(charMap);
// }