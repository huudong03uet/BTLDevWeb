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
    user.password = undefined;

    // Trả về thông tin của người dùng và statusCode
    res.status(200).json({ statusCode, data: user });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình đăng nhập.' });
  }
};

let signup = async (req, res) => {
  try {
    console.log(req.body)
    const { full_name, user_name, gmail, password } = req.body; // Lấy name, email, password và username từ req.body

    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    const existingUserByEmail = await User.findOne({
      where: { gmail },
    });

    // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu chưa
    const existingUserByUsername = await User.findOne({
      where: { user_name },
    });

    if (existingUserByEmail) {
      // Email đã tồn tại, trả về mã lỗi và lý do lỗi
      return res.status(200).json({ 
        code: 400,
        error: 'Email đã tồn tại trong hệ thống.' 
      });
    }

    if (existingUserByUsername) {
      // Username đã tồn tại, trả về mã lỗi và lý do lỗi
      return res.status(200).json({ code: 400, error: 'Username đã tồn tại trong hệ thống.' });
    }



    // Nếu email và username chưa tồn tại, thêm người dùng mới vào cơ sở dữ liệu
    const newUser = await User.create({
      user_name,
      full_name,
      gmail,
      password // Thêm username vào cơ sở dữ liệu
    });
    newUser.password = undefined;

    // Trả về thông tin của người dùng đã đăng ký
    res.status(200).json({ code: 200, data: newUser });
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình đăng ký.' });
  }
};


module.exports = {
  login, signup
};
