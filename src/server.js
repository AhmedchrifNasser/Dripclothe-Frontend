const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/frontend-release-1.0'));

app.get('/*', (req,res) =>
  res.sendFile('index.html',{root:'dist/frontend-release-1.0'}),
);

app.listen(process.env.PORT || 8080);
