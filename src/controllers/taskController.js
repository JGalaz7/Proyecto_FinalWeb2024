const db = require('../db');

// Obtener todas las tareas del usuario autenticado
exports.getTasks = (req, res) => {
    const userId = req.user.id_usuario;

    db.query('SELECT * FROM tareas WHERE usuarios_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// Crear una nueva tarea
exports.createTask = (req, res) => {
    const userId = req.user.id_usuario;
    const { descripcion } = req.body;

    db.query('INSERT INTO tareas (usuarios_id, descripcion) VALUES (?, ?)', [userId, descripcion], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Task created successfully' });
    });
};

// Actualizar una tarea existente
exports.updateTask = (req, res) => {
    const taskId = req.params.id;
    const { descripcion, estado_tarea } = req.body;

    db.query('UPDATE tareas SET descripcion = ?, estado_tarea = ?, f_actualizacion = CURRENT_TIMESTAMP WHERE id_tarea = ?', [descripcion, estado_tarea, taskId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Task updated successfully' });
    });
};

// Eliminar una tarea
exports.deleteTask = (req, res) => {
    const taskId = req.params.id;

    db.query('DELETE FROM tareas WHERE id_tarea = ?', [taskId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Task deleted successfully' });
    });
};
