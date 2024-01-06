const express = require('express');
const searchController = require('../controllers/searchController')

const router = express.Router();

router.get('/pen', searchController.getPenIDWithSearch);
router.get('/collection', searchController.getCollectionIDWithSearch);
router.get('/project', searchController.getProjectIDWithSearch);

module.exports = router;
