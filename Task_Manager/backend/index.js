const mongoose = require('mongoose');
const express = require('express');
/* const bodyParser = require("body-parser"); */
const ChannelModel = require('./modules/Channel')
const cors = require('cors');
const bodyParser = require( "body-parser" );

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.get( '/fromFront', (req, res) => {
    const received = req.body;
    console.log(req[0]);
    res.status(201).send(req[0] + "Hello");
});

app.get('/', async (req, res) => {
    res.status(201).send('<h1>Hello Node main page</h1>')
})

mongoose.connect('mongodb://localhost:27017/node_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB!');
        })
    .catch((error) => {
        if (error) {
            console.log(error);
        }
    })
        
    app.get('/insert', (req, res) => {
        const user = new ChannelModel({
            id : 1,
            name : 'Adivhaho',
            email : 'hey@gmail.com',
            password : '1234'
        });
        // Save the user to database
        user.save().then(()=>{
            res.send(`User ${user.name} has been added!`);
        }).catch((err)=>{
            console.log(err);
        })
    })
    
    app.get('/read', (req, res) => {
        ChannelModel.find().
        then(data => {return res.json(data);})
        .catch(err => {
            console.log(err);
        })
    })
    app.listen(5051, () => {
        console.log('listing to port 5051');
    });