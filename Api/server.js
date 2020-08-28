const express = require ('./node_modules/express');
const cors = require ('./node_modules/cors/lib');
const mongoose = require ('mongoose');
const requireDir = require('./node_modules/require-dir');
const { mongo } = require('../app.config');

const app = express();

app.use(express.json());
app.use(cors());

connection_string = 'mongodb+srv://'+mongo.user+':'+mongo.password+'@'+mongo.url+'/'+mongo.database+'?'+mongo.options;
mongoose.connect(connection_string, 
    { useNewUrlParser: true }
)

requireDir ('./src/model');

app.use('/api', require('./src/routes'));


app.listen(3333);
