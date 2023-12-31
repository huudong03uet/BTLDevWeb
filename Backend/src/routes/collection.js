const express = require('express');
const collectionController = require('../controllers/collectionController');

const router = express.Router();

router.post('/collections', collectionController.createOrUpdateCollection);
router.get('/collections/user/:userId', collectionController.getCollectionsByUser);
router.get('/collections/:collectionId/pens', collectionController.getPensInCollection);
router.post('/collections/addPenToCollection', collectionController.addPenToCollection); // New endpoint
router.post('/collections/removePenFromCollection', collectionController.removePenFromCollection); 

module.exports = router;
