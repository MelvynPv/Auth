const jwt = require('jsonwebtoken');
const secret = 'qwdxqwd23dwfw23er2%&31!2)6';

exports.createToken = (user) => {
    return jwt.sign({user},process.env.SECRET,{expiresIn: '1hr'})
}