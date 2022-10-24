const fs = require('fs')

fs.readFile('numbers.txt', (error, data) => {

    let number_array = data.toString().split(",");

    console.log("Reading file and calculate a sum...");
    console.log(`Sum is ${number_array.reduce((pvalue, nvalue) => {return parseInt(pvalue) + parseInt(nvalue); }, 0)}`);
    // luettavuus aivan järkyttävä, mutta menkööt.

});