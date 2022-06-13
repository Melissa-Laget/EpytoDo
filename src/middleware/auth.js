const token = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
        const token = authorization.split(' ')[1];

        token.verify(token, process.env.SECRET, (err, user) => {
            if (err)
                return res.status(498).json({ "msg": "Token is not valid" });
            req.user = user["id"]
            next();
        });
    }
    res.status(498).json({ "msg": "No token, authorization denied" });
};