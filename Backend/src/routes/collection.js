const express = require('express');
const collectionController = require('../controllers/collectionController');
const deletedController = require('../controllers/deletedController');
const likeCollectionController = require('../controllers/likeCollectionController');

const router = express.Router();


router.get('/collections/checkStatus', collectionController.checkCollectionStatus);
router.get('/collections/user/:userId', collectionController.getCollectionsByUser);
router.get('/collections/:collectionId/pens', collectionController.getPensInCollection);
router.get('/collection/:collection_id/likeCount', likeCollectionController.countLikesForCollection);
router.get('/collection/:collection_id/likeStatus/:user_id', likeCollectionController.checkUserLikeForCollection);
router.get('/getAllCollection', collectionController.getAllCollection);
router.get('/collections/getUserInfoByCollectionId/:collection_id', collectionController.getUserInfoByCollectionId);
router.get('/getCollectionByUserSort', collectionController.getCollectionByUserSort);

router.post('/collections', collectionController.createOrUpdateCollection);
router.post('/collections/addPenToCollection', collectionController.addPenToCollection);
router.post('/collections/addCollectionToCollection', collectionController.addCollectionToCollection);
router.post('/collections/removePenFromCollection', collectionController.removePenFromCollection);
router.post('/collections/removeCollection', collectionController.removeCollection);
router.post('/collections/restore', collectionController.restoreCollection);
router.post('/deleted', deletedController.getDeletedCollectionsAndPens);
router.post('/deleteCollectionPermanently', deletedController.deleteCollectionPermanently);
router.post('/collection/addLike', likeCollectionController.addLike);
router.post('/collection/removeLike', likeCollectionController.removeLike);
router.post('/collections/toggleStatus', collectionController.toggleCollectionStatus);

module.exports = router;
