const express = require('express');
const redis = require('redis');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: '1234',
    database: 'ioblog',
    port: '3306'
});

const client = redis.createClient({
    socket: {
        host: 'redis',
        // host.docker.internal 이걸로 진행하면 연결은 되는데 같은 인스턴스 공유x
        port: '6379'
    },
})

async function initial() {
    await client.connect();
    const r = await client.INFO();
    connection.connect();
}

const app = express();
var count = 0;

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/data/:key', async (req, res) => {
    const key = req.params.key;
    console.log(key);
    const data = await client.get(key);
    res.send(data);
})

app.get('/set/:key', async (req, res) => {
    const key = req.params.key;
    console.log(key);
    const data = await client.set(key, `${count++}`);
    res.send(200);
})

// Start server
app.listen(8080, async () => {
    await initial();
    console.log('Server started on port 8080');
});