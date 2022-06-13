const { users, todos, user_exists, delete_user, update_user } = require('./user.query');
const auth = require('../../middleware/auth');
const verif_id = require('../../middleware/notFound');

module.exports = (app, bcrypt) => {
    app.get('/user', auth, (req, res) => {
        users(res);
    });
    app.get('/user/todos', auth, (req, res) => {
        todos(res, req.user);
    });
    app.get('/user/:data', auth, (req, res) => {
        user_exists(res, req.params.data);
    });
    app.delete('/user/:id', auth, (req, res) => {
        delete_user(res, req.params.id);
    });
    app.put('/user/:id', auth, (req, res) => {
        var email = req.body["email"];
        var name = req.body["name"];
        var firstname = req.body["firstname"];
        var password = req.body["password"];

        if (req.params.id === undefined || email === undefined || name === undefined ||
            firstname === undefined || password === undefined) {
            res.status(500).json({ "msg": "Internal server error" });
            return;
        }
        password = bcrypt.hashSync(password, 10);
        update_user(res, req.params.id, email, password, name, firstname);
    });
}