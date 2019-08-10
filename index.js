require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
//const PORT = process.env.PORT || 3000;//Para el servidor en la nube.
//const cMongoUrl = 'mongodb+srv://admin:m19951225@cluster-nzn6e.gcp.mongodb.net/test?retryWrites=true&w=majority';

const {user} = require('./models/User');//nombre del archivo
const verify = require('./middlewares/verifyToken');
//const {srvUser} = require('./controllers/UserService');
//conection db
mongoose.connect(process.env.mongoUrl, {useNewUrlParser: true},(err) =>{
    if(!err){
        console.log('Mongo Conectado correctamente');
    }
});

//Settings
app.set('PORT',process.env.PORT || process.env.PORT);
app.set('views',path.join(__dirname),'views');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//routes
app.get('/',(req,res)=>{
    res.send(`<h1>SERVER</h1>`);
})

app.post('/new/user',(req,res) => {
    let params = req.body;
    let newUser = user({
        name: params.name,
        mail: params.mail,
        password: params.password
    })

    //srvUser.saveUser(newUser);
    newUser.save().then(item => {//guardar nuevo registro.
        newUser.password = ';)';
        res.send(`El usuario ${newUser.name} se a guardado correctamente`);
    });
    console.log(newUser);
    
})
//static files



//start the server
app.listen(app.get('PORT'),() =>{
    console.log(`Servidor escuchado en port ${app.get('PORT')}`);
});