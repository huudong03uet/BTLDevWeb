const express = require('express');
const collectionController = require('../controllers/collectionController');
const deletedController = require('../controllers/deletedController'); 
const likeCollectionController = require('../controllers/likeCollectionController'); 

const router = express.Router();

router.post('/collections', collectionController.createOrUpdateCollection);
router.get('/collections/user/:userId', collectionController.getCollectionsByUser);
router.get('/collections/:collectionId/pens', collectionController.getPensInCollection);
router.post('/collections/addPenToCollection', collectionController.addPenToCollection);
router.post('/collections/removePenFromCollection', collectionController.removePenFromCollection); 
router.post('/collections/removeCollection', collectionController.removeCollection); 
router.post('/collections/restore', collectionController.restoreCollection);
router.post('/deleted', deletedController.getDeletedCollectionsAndPens); 
router.post('/deleteCollectionPermanently', deletedController.deleteCollectionPermanently); 
router.get('/collection/:collection_id/likeCount', likeCollectionController.countLikesForCollection);
router.get('/collection/:collection_id/likeStatus/:user_id', likeCollectionController.checkUserLikeForCollection);
router.post('/collection/addLike', likeCollectionController.addLike);
router.post('/collection/removeLike', likeCollectionController.removeLike);

module.exports = router;
