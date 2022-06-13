var db = require('../../config/db');

// Get todos and todo ids //
exports.todos = (res) => {
    db.query('SELECT * FROM `todo`', (err, results, fields) => {
        res.status(200).json(results);
    })
}
exports.todo_ids = (res, id) => {
    db.execute('SELECT * FROM `todo` WHERE id = ?', [id], (err, results, fields) => {
        res.status(200).json(results);
    })
}

// Create todo //
exports.create_todo = (res, title, description, due_time, user_id, status) => {
    db.execute('INSERT INTO `todo` (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)', [title, description, due_time, status, user_id], (err, results, fields) => {
        var id_task = results["insertId"];
        db.execute('SELECT * FROM `todo` WHERE id = ?', [id_task], (err, results, fields) => {
            res.status(200).json(results);
        });
    });
}

// Modify Task Information //
exports.delete_task = (res, id) => {
    db.execute('DELETE FROM `todo` WHERE id = ?', [id], (err, results, fields) => {
        res.status(200).json({ "msg": `Succesfully deleted record number: ${id}` });
    });
}

exports.update_task = (res, id, title, description, due_time, user_id, status) => {
    db.execute('UPDATE `todo` SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?', [title, description, due_time, user_id, status, id], (err, results, fields) => {
        db.execute('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = ?', [id], (err, results, fields) => {
            res.status(200).json(results);
        });
    });
}