require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const saltRounds = 10;
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
    /*let params = req.body;
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
    console.log(newUser);*/
    
    let params = req.body;
    if (params.mail && params.password && params.name) {
        user.findOne({mail: params.mail }, (err, respuesta) => {
            if (err) {
                res.status(500).json({ message: 'Ocurrio un Error' });
            } else if (respuesta !== null) {
                res.status(200).json({ message: `El correo ${params.mail} ya esta en uso` });
            } else {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(params.password, salt, function(err, hash) {
                        let newUser = user({
                            name: params.name,
                            mail: params.mail,
                            password: hash
                        });
                        newUser.save((err, resp) => {
                            if(err){
                                res.status(500).json({message: 'Ocurrio un error', err});
                            } if(resp) {
                                newUser.password = ':('
                                res.status(201).json({status: 'Ok', data: resp});
                            } else {
                                res.status(400).json({message: 'No se creo el usuario'});
                            }
                        });
                        
                    });
                });
            }
        })
    } else {
        res.status(400).json({ message: 'Sin datos' })
    }

})
//static files



//start the server
app.listen(app.get('PORT'),() =>{
    console.log(`Servidor escuchado en port ${app.get('PORT')}`);
});