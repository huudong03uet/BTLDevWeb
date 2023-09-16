import User from "../models/user";

let login = async (req, res) => {
  try {
    const { gmail, password } = req.body; // Lấy email và password từ req.body

    // Khởi tạo biến statusCode
    let statusCode = 200;

    // Kiểm tra trong bảng "user"
    const user = await User.findOne({
      where: { gmail, password },
    });

    if (!user) {
      // Thông tin đăng nhập không chính xác, đặt lại statusCode và thông báo lỗi
      statusCode = 300;
    }

    // Trả về thông tin của người dùng và statusCode
    res.status(200).json({ statusCode, data: user });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình đăng nhập.' });
  }
};

module.exports = {
  login
};
