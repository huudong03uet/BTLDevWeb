const express = require('express');
const collectionController = require('../controllers/collectionController');

const router = express.Router();

router.post('/collections', collectionController.createOrUpdateCollection);

module.exports = router;
