const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./config/bd');

db.sync()
.then(() => {
    console.log("Bd Conectada");
})
.catch((error) => {
    console.log(error);
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cors());

app.listen(5000);
