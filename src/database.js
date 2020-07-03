const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/pandacornio-users', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false 
})
    .then(db => console.log('DB is conected'))
    .catch(err => console.error(err));