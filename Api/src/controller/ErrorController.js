const mongoose = require('mongoose');

const ErrorLog = mongoose.model('ErrorLog');

module.exports = {

    async store(req, res){ 
        const error = await ErrorLog.create(req.body);
        return res.json(error);
    }

   
}