const fs = require("fs");

const fileUrl = process.argv[2];

// console.log(process.argv[2]);
const outputUrl = createOutputUrl(fileUrl);



function createOutputUrl(url){

    // ./demo-files/pippo.txt  => ./demo-files/pippo-report.txt
    
    const splittedUrl = url.split('.');
    // const finalUrl='.'+splittedUrl[1]+'-report.'+splittedUrl[2];
    const lastPart = splittedUrl.pop();
    const firstPart = splittedUrl.join('.');
    const finalUrl = firstPart + "-report." +lastPart ;
    return finalUrl;

}




function readFile(url){
    try {
        const data = fs.readFileSync(url, "utf8");
        return data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}


function writeData(url, data){
    try {
        fs.writeFileSync(url, data);
    } catch (err) {
        console.error(err.message);
    }
}
