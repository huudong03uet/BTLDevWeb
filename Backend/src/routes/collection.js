const express = require('express');
const collectionController = require('../controllers/collectionController');
const deletedController = require('../controllers/deletedController'); // Import the new controller

const router = express.Router();

router.post('/collections', collectionController.createOrUpdateCollection);
router.get('/collections/user/:userId', collectionController.getCollectionsByUser);
router.get('/collections/:collectionId/pens', collectionController.getPensInCollection);
router.post('/collections/addPenToCollection', collectionController.addPenToCollection);
router.post('/collections/removePenFromCollection', collectionController.removePenFromCollection); 
router.post('/collections/removeCollection', collectionController.removeCollection); 
router.post('/collections/restore', collectionController.restoreCollection);
router.post('/deleted', deletedController.getDeletedCollectionsAndPens); 

module.exports = router;
