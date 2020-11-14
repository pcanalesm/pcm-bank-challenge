const express = require('express');
const database = require('./database/db');
const userRoute = require('./routes/user.route');
const { PORT  } = require('./config/config');
const helmet = require('helmet');
const app = express();

//Middleware
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



//Init Database
database.connect();

//Rutas

app.use('/api', userRoute);


app.listen(PORT, () => {
    console.log('Express Running On Port ', PORT);
    
});

