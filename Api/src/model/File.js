const mongoose = require ('mongoose');

const PaginaSchema = new mongoose.Schema({
    pagina: Array,
    
  
});
mongoose.model ('Paginas', PaginaSchema);