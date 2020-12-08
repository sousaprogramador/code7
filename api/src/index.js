const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mean', { useNewUrlParser: true,useUnifiedTopology: true });

require('./api/routes')(app);
app.listen(9000,()=>console.log('Express is running'));