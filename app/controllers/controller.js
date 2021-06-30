const Note = require('../models/model');

// Create and Save a new Note
exports.create = (req, res) => {

    // Validate request
    if(!req.body.courseName) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // // Create a Note
    const note = new Note({
        courseName: req.body.courseName || "Test",
        courseId: req.body.courseId || "1",
        courseDuration: req.body.courseDuration || "5",
        courseFee: req.body.courseFee || "200"
    });

    // // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });

};



// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};



// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    if(!req.body.courseName) {
        return res.status(400).send({
            message: "Update Note content can not be empty"
        });
    }

    Note.findByIdAndUpdate(req.params.noteId, {
        courseName: req.body.courseName || "Test",
        courseId: req.body.courseId || "1",
        courseDuration: req.body.courseDuration || "5",
        courseFee: req.body.courseFee || "200"
    }, {new: true})
    .then(note => {
        
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send("DONE UPDATE");

    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });

    });
    
};



// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });

};