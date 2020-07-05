const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dancrag1:eFk7IKO3JaEGLMkw@pandacluster.yceml.mongodb.net/pandacluster?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
})
    .then(db => console.log('DB is conected'))
    .catch(err => console.error(err));