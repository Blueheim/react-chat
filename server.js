const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(compression());

app.use(express.static(path.join(__dirname, '/build')));

// // oauth redirection
// app.get('/google-auth', function(req, res) {
//   console.log(req);
//   res.sendFile('index.html');
// });

app.get('*', (req, res) => {
  // console.log(req);
  // console.log(path.resolve(__dirname, 'build', 'index.html'));
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
