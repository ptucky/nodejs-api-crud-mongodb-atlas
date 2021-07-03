module.exports = (app) => {
    const notes = require('../controllers/controller');

    app.get('/list-db', notes.findAllDb);

    app.get('/get-list/:propertyType', notes.findOneList);

    app.get('/list-types/:propertyType', notes.findAllType);

    app.get('/list-id/:roomId', notes.findOneId);

    app.post('/property', notes.create);

    app.put('/property/:propertyId', notes.update);

    app.delete('/property/:propertyId', notes.delete);
}