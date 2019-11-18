const { Router } = require('express');
const router = Router();
const { getEvents, createEvent, getEvent, updateNote, deleteNote} = require('../controllers/event.controller');
router.route('/')
    .get(getEvents)
    .post(createEvent)
router.route('/:id')
    .get(getEvent)
    .put(updateNote)
    .delete(deleteNote)
module.exports = router;


