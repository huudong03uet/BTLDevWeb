# Hướng dẫn 

## 1. Hướng dẫn Deploy (trên hệ thống fall2324g3w5)

Bước 1: Từ root: ```cd 123web/testweb/Backend```

Bước 2: ```/etc/jupyter/bin/expose 3000```

Bước 3: ```npm start```

Link video demo: https://youtu.be/mt1vxgTYrrY

### 2. Hướng dẫn Deloy (trên server bất kỳ)


#### 2.1. Tiền xử lý Dự án
Bước 1: ```git clone https://github.com/huudong03uet\BTLDevWeb```

Bước 2: ```cd Frontend``` -> vào file src/app/host.service.ts -> đổi apiHost sang server cần build

Bước 3: ```ng build```.

Bước 4: Đẩy file Backend và dist lên server.



#### 2.2. Tạo Cơ sở dữ liệu
Bước 1: Tạo Cơ sở dữ liệu trên local, dựa trên file fall2324ww3g5.sql trong folder project.

Bước 2: Vào server, chạy câu lệnh ```mysql -u fall2324w3g5 -h MY_SERVICE_HOST -``` + {{your_password}}

Bước 3: Nhập password

Bước 4: ```use fall2324w3g5;```

Bước 5: ```show tables;```

Bước 6: ```source fall2324w3g5.sql```


#### 2.3. Deploy trên hệ thống

Bước 1: Từ root: ```cd 123web/testweb/Backend```

Bước 2: ```/etc/jupyter/bin/expose 3000```

Bước 3: ```npm start```


## 3. Hướng dẫn Deploy (trên localhost)



Bước 1: Mở terminal, chạy câu lệnh: ```git clone https://github.com/huudong03uet/BTLDevWeb.git```

Bước 2: Tạo Cơ sở dữ liệu MySQL với tên Database là fall2324w3g5

Bước 3: Thực hiện các câu lệnh trong file Cơ sở dữ liệu fall2324w3g5.sql được lưu ở thư mục gốc mới clone

Bước 3: Quay trở lại terminal, ```cd Backend```

Bước 4: ```npm start```

Bước 5: ```cd ..```

Bước 6: ```cd Frontend```

Bước 7: ```ng serve```

Bước 8: Truy cập ```http://localhost:4200/```


## 4. Cấu trúc Ứng dụng

BTLDevWeb

├── Frontend

│ ├── node_modules

│ ├── angular.js

│ ├── src

│ │ ├── app

│ │ │ ├── components

│ │ │ ├── models

│ │ │ ├── pages

│ │ │ ├── pipes

│ │ │ ├── services

│ │ │ └── app.module.ts

├── Backend

│ ├── node_modules

│ ├── src

│ │ ├── models

│ │ │ └── sequelize.js

│ │ ├── Controller

│ │ ├── Router

│ │ └── server.js

## 5. Liên hệ
  - Nguyễn Hữu Đồng - 21020760@vnu.edu.vn
  - Nguyễn Văn Khang - 21020768@vnu.edu.vn
  - Nguyễn Trần Đạt - 21020011@vnu.edu.vn
  - Lê Minh Châu - 21020286@vnu.edu.vn
  - Phạm Thị Diễm Quỳnh - 21020087@vnu.edu.vn
