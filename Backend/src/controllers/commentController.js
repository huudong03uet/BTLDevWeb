const Comment =require('../models/commentTable')

function _level(comment) {
    let tmp_cmt = []

    for (let cmt of comment) {
        const new_cmt = {
            "comment_id": cmt.comment_id,
            "comment": cmt.comment,
            "type": "pen",
            "createdAt": cmt.createdAt,
            "updatedAt": cmt.updatedAt,
            "user_id": cmt.user_id,
            "pen_id": cmt.pen_id,
            "collection_id": cmt.collection_id,
            "reply": cmt.reply, 
            "fake_reply": cmt.reply, 
            "level": 0,
            "replies": []
        }

        if (cmt.reply == null) {
            tmp_cmt.push(new_cmt)
        } else {
            new_cmt.level = tmp_cmt[cmt.reply - 1].level + 1
            while (new_cmt.level > 2) {
                new_cmt.fake_reply = tmp_cmt[cmt.reply - 1].reply
                new_cmt.level = tmp_cmt[cmt.reply - 1].level
            }
            tmp_cmt.push(new_cmt)
        }
    }

    return tmp_cmt
}

function _sortComentByReply(comment) {
    let tmp_cmt = []
    let ids = []
    let i = 0;

    for (let i=0; i<comment.length + 1; ++i) {
        ids.push(0);
    }

    for (let cmt of comment) {
        if (cmt.reply == null) {
            ids[cmt.comment_id] = tmp_cmt.length
            tmp_cmt.push(cmt);
        } else {
            if(cmt.level == 1) {
                ids[cmt.comment_id] = tmp_cmt.length
                tmp_cmt.push(cmt);
            } else if (cmt.level == 2) {
                let x1 = cmt.fake_reply;
                tmp_cmt[x1-1].replies.push(cmt);
                ids[cmt.comment_id] = -1
            }
        }
    }

    let res = []

    for (let i=0; i<comment.length + 1; ++i) {
        ids.push(0);
    }

    for (let cmt of tmp_cmt) {
        if (cmt.reply == null) {
            ids[cmt.comment_id] = res.length
            res.push(cmt);
        } else {
            let x1 = cmt.reply;
            if(x1 == ids[x1] + 1) {
                res[x1-1].replies.push(cmt);
                ids[cmt.comment_id] = -1
            } 
        }
    }

    return res
}

async function _getAllCommentOfPen(pen_id) {
    try {
        let comments = await Comment.findAll({
            where: {
                pen_id: pen_id,
                type: "pen",
            },
            order: [
                ['createdAt', 'ASC'], 
            ],
        });

        return comments;
    } catch (error) {
        throw error;
    }
}

async function _getAllCommentOfCollection(collection_id) {
    try {
        let comment = await Comment.findAll({
            where: {
                collection_id: collection_id,
                type: "collection",
            },
            order: [
                ['createdAt', 'ASC'], 
            ],
        });

        return comment;
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

        x = x.map(x => x.dataValues);

        x = _level(x);
        x = _sortComentByReply(x);

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
    console.log(comment)
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


module.exports = {
    createComment,
    getAllComment
};
