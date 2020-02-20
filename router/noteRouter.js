/**
 * modules to be imported for routing
 */

const express = require('express');
const router = express.Router();
const noteController = require('../controller/noteController')
const middleware = require('../middleware/authentication')
const upload = require("../middleware/multer")

router.post('/addNote', middleware.checkTokenAuth, noteController.addNote);
router.get('/getNotes', middleware.checkTokenAuth, noteController.getNotes);
router.put('/updateNotes', middleware.checkTokenAuth, noteController.updateNotes);
router.delete('/deleteNote', middleware.checkTokenAuth, noteController.deleteNote);
router.post('/imageUpload', middleware.checkTokenAuth, upload.single('image'), noteController.imageUpload);

router.post ('/addCollaborator', middleware.checkTokenAuth, noteController.collabAdd);
router.post ('/deleteCollaborator', middleware.checkTokenAuth, noteController.collabDelete);

router.post('/toArchive', middleware.checkTokenAuth, noteController.toArchive);
router.post('/unArchive',middleware.checkTokenAuth, noteController.unArchive);

router.post( '/toTrash', middleware.checkTokenAuth, noteController.toTrash);
router.post( '/noTrash', middleware.checkTokenAuth, noteController.noTrash);

router.post('/addReminder', middleware.checkTokenAuth, noteController.addReminder);

router.post('/noteSequ', middleware.checkTokenAuth, noteController.noteSequ);


module.exports = router;
