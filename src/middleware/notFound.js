module.exports = (req, res, next) => {
    var identification = req.params.identification;
    var db_config = require('../config/db')

    if (identification) {
        db_config.execute('SELECT * FROM `todo` WHERE id = ?', [identification], (err, results, fields) => {
            if (results.length > 0)
                next();
            res.status(404).json({ "msg": "Not found" });
        });
    }
    res.status(500).json({ "msg": "Internal server error" });
};