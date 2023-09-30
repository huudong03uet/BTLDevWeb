import User from "../models/user";
import Pen from "../models/pen";
import User_Pen from "../models/user_pen";

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
    const { pen_id } = req.params;
  
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


module.exports = {
    createOrUpdatePen, getPenById
};
