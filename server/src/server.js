const express = require('express');
const database = require('./database/db');
const userRoute = require('./routes/user.route');
const accountRoute = require('./routes/account.route');
const { PORT, CORS_ORIGIN  } = require('./config/config');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

//Middleware
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: CORS_ORIGIN }))



//Init Database
database.connect();

//Rutas

app.use('/api', userRoute);
app.use('/api', accountRoute);


app.listen(PORT, () => {
    console.log('Express Running On Port ', PORT);
    
});

