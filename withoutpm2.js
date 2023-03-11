const express = require('express');
const app = express();

// for node performance
const cluster = require('cluster')
const os = require('os');

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
    delay(9000);
    res.send(`bing bing bing ${process.pid}`);
})

console.log('Running server.js..')
if (cluster.isMaster) {
    console.log('Master has started..');
    const NUM_WORKERS = os.cpus().length;
    for (let i = 0; i < NUM_WORKERS; i++) {
        cluster.fork();
    }
} else {
    console.log('Worker process started');
    app.listen(5000);
}

