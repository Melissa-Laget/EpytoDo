var db = require('../../config/db.js');
const jwt = require('jsonwebtoken')

// Export da stuff //
exports.users = (res, id) => {
    db.query('SELECT * FROM `user`', (err, results, fields) => {
        res.status(200).json(results);
    });
}
exports.todos = (res, id) => {
    db.query('SELECT * FROM todo WHERE user_id = ?', [id], (err, results, fields) => {
        res.status(200).json(results);
    })
}
exports.register = (res, email, password, name, firstname) => {
    db.execute('INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)', [email, password, name, firstname], (err, results, fields) => {
        const token = jwt.sign({ email: email, password: password }, process.env.SECRET);
        res.status(200).json({ token });
    })
}

// If user exists //
exports.user_exists = (res, name, email, callback) => {
    db.execute('SELECT * FROM `user` WHERE name = ?', [name], (err, results, fields) => {
        if (results.length > 0) {
            callback(84);
            return;
        }
    })
    db.execute('SELECT * FROM `user` WHERE email = ?', [email], (err, results, fields) => {
        if (results.length > 0) {
            callback(84);
            return;
        }
        callback(0);
        return;
    })

}

// Check correct credentials && login //
exports.login = (res, email, password, bcrypt, callback) => {
    db.execute('SELECT password, id FROM `user` WHERE email = ?', [email], (err, results, fields) => {
        if (results.length < 1) {
            callback(84);
            return;
        }
        if (results.length > 0) {
            if (bcrypt.compareSync(password, results[0].password)) {
                const token = jwt.sign({ email: email, id: results[0].id }, process.env.SECRET);
                res.json({ token });
                callback(0);
                return;
            }
            callback(84);
            return;
        }
    })
}

// Modify User Information //
exports.delete_user = (res, id) => {
    db.execute('DELETE FROM `user` WHERE id = ?', [id], (err, results, fields) => {
        res.status(200).json({ "msg": `Succesfully deleted record number: ${id}` });
    });
}

exports.update_user = (res, id, email, password, name, firstname) => {
    db.execute('UPDATE `user` SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?', [email, password, name, firstname, id], (err, results, fields) => {
        db.execute('SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?', [id], (err, results, fields) => {
            res.status(200).json(results);
        });
    });
}