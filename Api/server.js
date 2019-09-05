const express = require ('express');
const cors = require ('cors');
const mongoose = require ('mongoose');
const requireDir = require('require-dir');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://dbuser:dbuser@cluster0-jivi5.mongodb.net/test?retryWrites=true&w=majority')

requireDir ('./src/model');

app.use('/api', require('./src/routes'));


app.listen(3333);
