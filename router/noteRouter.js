const express = require('express');
const router = express.Router();
const noteController = require('../controller/noteController')
const middleware = require('../middleware/authentication')

router.post('/addNote', middleware.checkTokenAuth, noteController.addNote);
router.get('/getNotes',middleware.checkTokenAuth,noteController.getNotes);
router.put('/updateNotes',middleware.checkTokenAuth,noteController.updateNotes);
router.delete('/deleteNote',middleware.checkTokenAuth,noteController.deleteNote);
module.exports = router;
