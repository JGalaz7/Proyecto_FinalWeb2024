const express = require('express');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tareas_pf'
});

db.connect((err) => {
    if (err) {
        console.error('SI LEES ESTO DEDICATE AL FRONTEND XD', err);
        process.exit(1);
    }
    console.log('Conexión a base de datos');
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
    console.log('SI PUEDES LEER ESTO, ES PORQUE FUNCIONA');
});

module.exports = db;
