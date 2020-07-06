const mongoose = require('mongoose')

//
//mongodb://localhost:27017/pandacornio_db_test

mongoose.connect('mongodb+srv://dancrag1:eFk7IKO3JaEGLMkw@pandacluster.yceml.mongodb.net/pandacluster?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
})
    .then(db => console.log('DB is conected'))
    .catch(err => console.error(err));