const express = require('express');
const fs = require('fs')
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.get("/", (req, res) => {

    fs.readFile("requests.txt", (err, data) => {

        if (err) { console.log(err.message) }
        else { 

            let counter = ++data | 0;

            fs.writeFile("requests.txt", counter.toString(), (err) => {
                if (err) { console.log(err.message) }
                else { res.send(`Request counter value ${counter}`) };
            });

        };

    });

});