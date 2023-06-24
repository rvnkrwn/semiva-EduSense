const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Model = require('./models')
const app = express();

// Menghubungkan ke database MongoDB
Model.mongoose.connect(Model.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });


// Middleware untuk parsing body request
app.use(express.json());
app.use(cors({ origin: '*' }));



// Menambahkan routes pengguna
app.get('/', (req,res) => {
    res.send('Hello World');
})
require('./routes/userRouter')(app)
require('./routes/openaiRouter')(app)



// Menjalankan server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
