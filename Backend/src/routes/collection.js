// routes/collections.js

const express = require('express');
const collectionController = require('../controllers/collectionController');

const router = express.Router();

router.post('/collections', collectionController.createOrUpdateCollection);
router.get('/user/:userId', collectionController.getCollectionsByUser);
router.get('/:collectionId/pens', collectionController.getPensInCollection);

module.exports = router;
