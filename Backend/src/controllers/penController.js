import User from "../models/user";
import Pen from "../models/pen";
import User_Pen from "../models/user_pen";
import View from "../models/viewTable";
import Comment from "../models/commentTable";
import Like from "../models/likeTable";

let createOrUpdatePen = async (req, res) => {
    try {
        if (req.body.pen_id != null) {
            const { user_id, pen_id } = req.body;
            const existingPen = await Pen.findOne({ where: { pen_id: req.body.pen_id } });

            // Nếu pen đã tồn tại, thực hiện cập nhật
            existingPen.html_code = req.body.html_code;
            existingPen.js_code = req.body.js_code;
            existingPen.css_code = req.body.css_code;
            await existingPen.save();
    
            // Trả về thông tin pen đã được cập nhật
            return res.status(200).json({code: 200, pen: existingPen, message: "cập nhật pen thành công"});
        } else {
            // Nếu pen chưa tồn tại, tạo mới pen
            const newPen = await Pen.create({
            html_code: req.body.html_code,
            js_code: req.body.js_code,
            css_code: req.body.css_code,
            name: req.body.name,
            });
            await User_Pen.create({
                user_id: req.body.user_id,
                pen_id: newPen.pen_id
            });
            return res.status(201).json({code: 200, pen: newPen, message: "tạo pen mới thành công"});
        // Trả về thông tin pen đã được tạo
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi trong quá trình tạo hoặc cập nhật pen' });
    }
}
  
// Hàm để lấy thông tin pen bằng id
async function getPenById(req, res) {
    const { pen_id } = req.body;
  
    try {
      // Tìm pen theo id
      const pen = await Pen.findOne({ where: { pen_id: pen_id } });
  
      if (!pen) {
        // Nếu không tìm thấy pen với id đã cho
        return res.status(404).json({ code: 404, message: 'Không tìm thấy pen với id đã cho' });
      }
  
      // Trả về thông tin pen
      return res.status(200).json({ code: 200, pen, message: 'Lấy thông tin pen thành công' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy thông tin pen' });
    }
}



// API endpoint để lấy thông tin về một pen dựa trên pen_id
async function getInfoPen(req, res) {
  const penId = req.params.id;

  try {
    console.log(penId);
    // Lấy thông tin về pen
    const pen = await Pen.findByPk(penId);

    console.log(pen)
    if (!pen) {
      return res.status(404).json({ error: 'Pen not found' });
    }

    // Lấy thông tin về user sở hữu pen
    const userPen = await User_Pen.findOne({
      where: { pen_id: penId },
      include: [{ model: User }],
    });

    // Lấy số lượt xem
    const viewCount = await View.count({ where: { pen_id: penId } });

    // Lấy số lượt comment
    const commentCount = await Comment.count({ where: { pen_id: penId } });

    const likeCount = await Like.count({ where: { pen_id: penId } });
    // Tạo đối tượng kết quả
    const result = {
      pen: pen,
      user: userPen ? userPen.user : null,
      view: viewCount,
      comment: commentCount,
      like: likeCount
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function getTrending(req, res) {
  try {
    const penIds = await Pen.findAll({
      attributes: ['pen_id'],
    });

    // Chuyển đổi kết quả từ mảng các đối tượng thành mảng các giá trị pen_id
    const penIdValues = penIds.map((pen) => pen.pen_id);

    res.json(penIdValues);
  } catch (error) {
    console.error('Error fetching pen ids:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
    createOrUpdatePen, getPenById, getInfoPen, getTrending
};
