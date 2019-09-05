const mongoose = require ('mongoose');

const ErrorSchema = new mongoose.Schema({
    Error: String,
    
  
});
mongoose.model ('ErrorLog', ErrorSchema);