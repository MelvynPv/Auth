const jwt = require('jsonwebtoken');
const secret = 'qwdxqwd23dwfw23er2%&31!2)6';
require('dotenv').config();

exports.verify = (req,res,next) =>{
    let token = req.headers.authorization;

    if(token){
        jwf.verify(token,process.env.SECRET,(err,decode)=>{
            if(err){
                res.status(500).json({
                    message:'Ocurrio un error'
                });
            }else{
                console.log('Decoded ==>>> ',decode);
            }
        })
    }else{
        res.status(404).json({
            message: 'Error en token.'
        });
    }
}