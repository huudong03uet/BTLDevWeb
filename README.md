cách build ứng dụng
Bước 1: git clone về máy
Bước 2: cd vào file Front end
Bước 3: chỉnh lại file angular.js trong folder Frontend
+ thuộc tính "build" có thuộc tính con "outputPath". Chỉnh lại "outputPath" thành "dist" ("outputPath": "dist")
+ ở phần "configurations" có thuộc tính con "production". Ở trong "production" có thuộc tính con "budgets". Chỉnh lại "maximumError" ở cả init và anyComponentStyle thành 2mb (Thực ra chỉnh số nào thì tùy thuộc vào chương trình báo lỗi, có thể tăng số này lên)
Bước 4: npm run build hoặc ng build 
Bước 5: từ thư mục gốc vào lại Backend
Bước 6: trong Backend có 2 file "src/models/sequelize.js" và "src/server.js".
+ "src/models/sequelize.js": chỉnh lại tên và cơ sở dữ liệu và password
+ "src/server.js": chỉnh lại app.get('*', ...) thành đúng đường dẫn tới thư mục dist
Hết.
