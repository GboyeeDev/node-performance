const express = require('express');
const app = express();


function delay(duration) {
    const startTime = Date.now();
    while(Date.now() - startTime < duration) {
        // event loop is blocked!!
    }
}


app.get('/', (req, res) => {
    res.send(`Performance Example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    // delaying the response
    delay(4000);
    res.send(`work work work! ${process.pid}`);
})


console.log('Running server.js..')
console.log('Worker process started');
app.listen(5000);

