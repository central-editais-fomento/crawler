const express = require ('./node_modules/express');
const cors = require ('./node_modules/cors/lib');
const mongoose = require ('mongoose');
const requireDir = require('./node_modules/require-dir');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://dbuser:dbuser@cluster0-jivi5.mongodb.net/test?retryWrites=true&w=majority', 
    { useNewUrlParser: true }
)

requireDir ('./src/model');

app.use('/api', require('./src/routes'));


app.listen(3333);
