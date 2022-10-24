if ( !isNaN(process.argv[2]) && process.argv[2] > 0 && !isNaN(process.argv[3]) && !isNaN(process.argv[4]) ) {

    var random_list = [];

    for (let i = 0; i < process.argv[2]; i++) {
        random_list.push( Math.round( Math.random() * (process.argv[4] - process.argv[3]) ) | 0 + process.argv[3] );
    };

    console.log(random_list);
}
else {
    console.log("Usage: t5.js RANDOMIZED_NUMBERS_COUNT MIN_VALUE MAX_VALUE")
};