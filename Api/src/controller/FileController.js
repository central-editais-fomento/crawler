const mongoose = require('mongoose');

const Paginas = mongoose.model('Paginas');

module.exports = {

    async store(req, res){ 
        const paginas = await Paginas.create(req.body);
        return res.json(paginas);
    }

   
}