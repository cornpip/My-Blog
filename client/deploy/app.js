const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// const httpsOptions = {
//   cert: fs.readFileSync('./secrets/certificate.crt'),
//   key: fs.readFileSync('./secrets/private.key')
// };

// const server = https.createServer(httpsOptions, app);

// // 서버 시작
// const port = 443;
// server.listen(port, function () {
//   console.log(`HTTPS server is running on port ${port}`);
// });