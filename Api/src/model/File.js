const mongoose = require ('mongoose');

const PaginaSchema = new mongoose.Schema({

    pagina: {
        type: {
            pagina: String
        },
        type: {

        }
    }

    // adicionar as palavras chaves
    
  
});
mongoose.model ('Paginas', PaginaSchema);