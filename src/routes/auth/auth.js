const { register, user_exists, login } = require('./../user/user.query');

module.exports = (app, bcrypt) => {
    app.post('/login', (req, res) => {
        var email = req.body["email"];

        if (email === undefined || req.body["password"] === undefined) {
            res.status(500).json({ "msg": "internal server error" });
            return;
        }
        login(res, email, req.body["password"], bcrypt, (result) => {
            if (result == 84) {
                res.status(401).json({ "msg": "Invalid Credentials" });
            }
            return;
        });
    });
    app.post('/register', (req, res) => {
        var email = req.body["email"];
        var firstname = req.body["firstname"];
        var name = req.body["name"];
        var password = req.body["password"];

        if (email === undefined || name === undefined || password === undefined ||
            firstname === undefined) {
            res.status(500).json({ "msg": "Internal server error" });
            return;
        }
        password = bcrypt.hashSync(password, 10);
        user_exists(res, name, email, (result) => {
            if (result == 84) {
                res.status(409).json({ "msg": "Account already exists" });
                return;
            }
            register(res, email, password, name, firstname);
            return;
        });
    });
}