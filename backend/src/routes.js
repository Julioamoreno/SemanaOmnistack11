const express = require('express');

const SessionController = require('./controllers/SessionController');
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

//__
routes.get('/ongs', ongController.list);

routes.post('/ongs', ongController.store);
//__________

routes.get('/profile', ProfileController.index);


//________
routes.post('/incidents', incidentController.store);

routes.get('/incidents', incidentController.index);

routes.delete('/incidents/:id', incidentController.delete);


module.exports = routes;