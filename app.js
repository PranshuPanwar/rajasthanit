/**
 * Created by Pranshu Panwar on 18-03-2018.
 */
const express = require('express');
const path =require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const poll = require('./routes/poll');

//set public folder
app.use(express.static(path.join(__dirname , 'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// enable cors
app.use(cors);
app.use('/poll',poll);
const port = 3000;

//starting the xerver here we get
app.listen(port , function() {
        console.log('server started on port $(port) ');
    }

)



