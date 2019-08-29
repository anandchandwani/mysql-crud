const express = require('express');
const bodyParser = require('body-parser')
const db = require('./config/database/db');
const path = require('path');
const app = express();
const userRoutes = require('./router/user');
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/',userRoutes);
app.set('views', path.join(__dirname ,'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set(port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    