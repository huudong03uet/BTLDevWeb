const Comment =require('../models/commentTable')
const User = require('../models/user')
const { DataTypes, literal } = require('sequelize');
const Sequelize = require('sequelize');

function _calculateTimeAgo(time) {
    const commentDate = new Date(time);
    const now = new Date();
    const timeDifference = now - commentDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const week = Math.floor(days / 7);
    const month = Math.floor(days / 30);
    const year = Math.floor(month / 12);

    if (year > 0) {
        if (year == 1) {
            return `${year} year ago`;
        }
        return `${year} years ago`;
    } else if (month > 0) {
        if (month == 1) {
            return `${month} month ago`;
        }
        return `${month} months ago`;

    } else if (week > 0) {
        if (week == 1) {
            return `${week} week ago`;
        }
        return `${week} weeks ago`;
    } else if (days > 0) {
        if (days == 1) {
            return `${days} day ago`;
        }
        return `${days} days ago`;
    } else if (hours > 0) {
        if (hours == 1) {
            return `${hours} hour ago`;
        }
        return `${hours} hours ago`;
    } else if (minutes > 0) {
        if (minutes == 1) {
            return `${minutes} minute ago`;
        }
        return `${minutes} minutes ago`;
    } else {
        
        return 'Just now';
    }
}

async function _getAllCommentOfPen(pen_id) {
    try {
        let comments = await Comment.findAll({
            where: {
                pen_id: pen_id,
                type: "pen",
            },
            order: [
                ['createdAt', 'DESC'], 
            ],
            include: [
                {
                    model: User,
                    attributes: ['user_name', 'avatar_path'],
                }
            ],
            attributes: [
                'comment_id',
                'comment',
                'createdAt',
                'updatedAt',
                `type`, 
                `pen_id`,
                `collection_id`,
                `user_id`,
                `reply`,
                [Sequelize.literal('(SELECT user_name FROM user WHERE user_id = comment_table.reply)'), 'replyUser'],
            ],
        });

        comments = comments.map(comment => ({
            ...comment.dataValues,
            "createdAt": _calculateTimeAgo(comment.createdAt),
            "updatedAt": _calculateTimeAgo(comment.updatedAt),
        }));

        return comments;
    } catch (error) {
        throw error;
    }
}

async function _getAllCommentOfCollection(collection_id) {
    try {
        let comments = await Comment.findAll({
            where: {
                collection_id: collection_id,
                type: "collection",
            },
            order: [
                ['createdAt', 'DESC'],
            ],
            include: [
                {
                    model: User,
                    attributes: ['user_name', 'avatar_path'],
                },
            ],
            attributes: [
                'comment_id',
                'comment',
                'createdAt',
                'updatedAt',
                `type`, 
                `pen_id`,
                `collection_id`,
                `user_id`,
                `reply`
            ],
        });

        comments = comments.map(comment => ({
            ...comment.dataValues,
            "createdAt": _calculateTimeAgo(comment.createdAt),
            "updatedAt": _calculateTimeAgo(comment.updatedAt),
        }));

        return comments;
    } catch (error) {
       throw error
    }
}

async function getAllComment(req, res) {
    const id = req.query.id;
    const type = req.query.type;

    let x = false;
    try {
        if (type == 'pen') {
            x = await _getAllCommentOfPen(id);
        } else if (type == "collection") {
            x = await _getAllCommentOfCollection(id);
        } 
        res.status(201).json(x);
    } catch (error) {
        console.log(error);
        res.status(500).json(x);
    }
}

async function _setCommentReplyOfCollection(collection_id, user_id, comment, reply = null) {
    try {
        const newComment = await Comment.create({
            comment: comment,
            type: "collection",
            user_id: user_id,
            collection_id: collection_id,
            pen_id: null,
            reply: reply,
        });

        return newComment;

    } catch (error) {
       throw error
    }
}

async function _setCommentReplyOfPen(pen_id, user_id, comment, reply = null) {
    try {
        const newComment = await Comment.create({
            comment: comment,
            type: "pen",
            user_id: user_id,
            collection_id: null,
            pen_id: pen_id,
            reply: reply,
        });

        return newComment;

    } catch (error) {
       throw error
    }
}

async function createComment(req, res) {
    const id = req.query.id;
    const user_id = req.query.user_id;
    const comment = req.query.comment;
    const reply = req.query.reply == 'null'? null: req.query.reply;
    const type = req.query.type;

    let x = false;

    console.log(req.query)

    if(comment == '') {
        res.status(500).json(x);
    }

    try {
        if (type == 'pen') {
            x = await _setCommentReplyOfPen(id, user_id, comment, reply);
        } else if (type == "collection") {
            x = await _setCommentReplyOfCollection(id, user_id, comment, reply);
        } 

        res.status(201).json(x);
    } catch (error) {
        console.log(error);
        res.status(500).json(x);
    }
}

async function _updatecomment(comment_id, updatedCommentText) {
    try {
        const updatedComment = await Comment.update(
            { comment: updatedCommentText },
            {
                where: {
                    comment_id: comment_id
                }
            }
        );

        if (updatedComment[0] > 0) {
            return {code: 200, success: true}
        } else {
            return {code: 404, success: false}
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function editComment(req, res) {
    const comment_id = req.query.comment_id;
    const updatedCommentText = req.body.updatedCommentText;

    if (updatedCommentText == '') {
        res.status(500).json({ success: false, message: 'Internal server error.' });
        return;
    }

    try {
        const updatedComment = await _updatecomment(comment_id, updatedCommentText);

        res.status(updatedComment.code).json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

async function deleteComment(req, res) {
    const comment_id = req.query.comment_id;

    try {
        const deletedComment = await Comment.destroy({
            where: {
                comment_id: comment_id
            }
        });

        if (deletedComment) {
            res.status(200).json({ success: deletedComment, message: 'Comment deleted successfully.' });
        } else {
            res.status(404).json({ success: deletedComment, message: 'Comment not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

module.exports = {
    createComment,
    getAllComment,
    deleteComment,
    editComment,
};
