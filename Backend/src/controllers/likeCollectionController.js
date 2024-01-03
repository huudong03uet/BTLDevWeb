const LikeCollection = require('../models/likeCollection');

// Đếm số lượt thích của một collection
const countLikesForCollection = async (req, res) => {
    try {
        const collection_id = req.params.collection_id;

        const likeCount = await LikeCollection.count({
            where: { collection_id: collection_id }
        });

        return res.status(200).json({ likeCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Kiểm tra xem một người dùng có thích một collection không
const checkUserLikeForCollection = async (req, res) => {
    try {
        const collection_id = req.params.collection_id;
        const user_id = req.params.user_id;

        const likeRecord = await LikeCollection.findOne({
            where: { collection_id: collection_id, user_id: user_id }
        });

        const userLikedCollection = !!likeRecord;

        return res.status(200).json({ userLikedCollection });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addLike = async (req, res) => {
    try {
        const { collection_id, user_id } = req.body;
        const existingLike = await LikeCollection.findOne({
            where: { collection_id: collection_id, user_id: user_id }
        });

        if (!existingLike) {
            await LikeCollection.create({
                collection_id: collection_id,
                user_id: user_id
            });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Xóa lượt thích cho collection
const removeLike = async (req, res) => {
    try {
        const { collection_id, user_id } = req.body;
        await LikeCollection.destroy({
            where: { collection_id: collection_id, user_id: user_id }
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { countLikesForCollection, checkUserLikeForCollection, addLike, removeLike };