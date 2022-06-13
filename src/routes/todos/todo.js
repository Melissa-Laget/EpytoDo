const { create_todo, todos, todo_ids, delete_task, update_task } = require('./todo.query');
const auth = require('../../middleware/auth');
const verif_id = require('../../middleware/notFound');

module.exports = (app, bcrypt) => {
    app.get('/todo', auth, (req, res) => {
        todos(res);
    });
    app.get('/todo/:id', auth, verif_id, (req, res) => {
        todo_ids(res, req.params.id);
    });
    app.post('/todo', auth, (req, res) => {
        var title = req.body["title"];
        var description = req.body["description"];
        var due_time = req.body["due_time"];
        var my_id = req.body["user_id"];
        var status = req.body["status"];

        if (title === undefined || description === undefined ||
            due_time === undefined || my_id === undefined || status === undefined) {
            res.status(500).json({ "msg": "Internal server error" });
            return;
        }
        create_todo(res, title, description, due_time, my_id, status);
    });
    app.delete('/todo/:id', auth, (req, res) => {
        var id = req.params.id;

        delete_task(res, id);
    });
    app.put('/todo/:id', auth, (req, res) => {
        var id = req.params.id;
        var title = req.body["title"];
        var description = req.body["description"];
        var due_time = req.body["due_time"];
        var user_id = req.body["user_id"];
        var status = req.body["status"];

        if (id === undefined || title === undefined || description === undefined ||
            due_time === undefined || user_id === undefined ||
            status === undefined) {
            res.status(500).json({ "msg": "Internal server error" });
            return;
        }
        update_task(res, id, title, description, due_time, user_id, status);
    })
}