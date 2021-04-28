const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token'); // the key to the token inside the header

    //Check if not token    //401 - Unauthorized
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user; // from the entire decoded(token), we compare the re.user with the user from the token
        next();
    } catch (err) {
      res.status(401).json({msg: 'Token is not Valid'})  
    }
}