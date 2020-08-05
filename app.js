const express =require('express');
const app= express();
const bodyparse = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://localhost:27017/ATM";

app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyparse.urlencoded({
    extended : true
}));
app.use('/views',express.static(path.join(__dirname,'views')));

const userRoutes = require('./routes/userRoutes');

app.use('/', userRoutes);

mongoose.connect(MONGODB_URI,
    {userNewUrlParser: true},
    () =>  console.log('Connected to DB!')
);
app.listen(PORT);
