const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CurdDb', (err)=>{
    if(!err){
        console.log('Mongosb connection started');
    }else{
        console.log(`Causing error while connecting ${JSON.stringify(err,undefined,2)}`);
    }
});

module.exports = mongoose;