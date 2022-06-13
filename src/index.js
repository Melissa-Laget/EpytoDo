const express = require('express')
const app = express();

var bcrypt = require('bcryptjs')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

require('dotenv').config();
require('./routes/auth/auth')(app, bcrypt);
require('./routes/user/user')(app, bcrypt);
require('./routes/todos/todo')(app, bcrypt);

const port = process.env.LISTENING_PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})