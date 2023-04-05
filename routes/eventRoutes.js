const express = require('express');
const router = express.Router();

const EventController = require('../controllers/eventController');
const checkUserAuth = require('../middlewares/auth-middleware');


router.post('/add', checkUserAuth, EventController.addEvent);
router.post('/list', checkUserAuth, EventController.eventList);

module.exports = router;
