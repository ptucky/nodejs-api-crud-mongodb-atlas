module.exports = (app) => {
    const notes = require('../controllers/controller');

    // Retrieve all Notes
    app.get('/courses', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/courses/:noteId', notes.findOne);

    // Create a new Note
    app.post('/courses', notes.create);

    // Update a Note with noteId
    app.put('/courses/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/courses/:noteId', notes.delete);
}