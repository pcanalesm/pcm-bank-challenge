const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

module.exports = async(req, res, next) => {
 
    let token = req.headers['access-token'] || req.headers['authorization'];
    if(token) {
        if (token.startsWith('Bearer ')) {
  
            token = token.slice(7, token.length);
        }
        jwt.verify(token, JWT_SECRET , (err, decoded) => {
            if (err) {
              console.log('err');
              return res.status(401).json({
                message: 'Token is not valid Access Denied'
              });
            } else {
              req.decoded = decoded;
              next();
            }
        });
    }
    else {
      console.log('denied');
        res.status(401).send({ message: 'Access Denied' });
    }
}