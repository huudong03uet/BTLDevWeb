# Hướng dẫn 

### 1. Cách Deploy (trên hệ thống fall2324g3w5)

Bước 1: Từ root: ```cd 123web/testweb/Backend```

Bước 2: ```/etc/jupyter/bin/expose 3000```

Bước 3: ```cd Backend```

Bước 4: ```npm start```

Link video demo: https://youtu.be/mt1vxgTYrrY

### 2. Cách Deploy (trên localhost)

Bước 1: Mở terminal, chạy câu lệnh: ```git clone https://github.com/huudong03uet/BTLDevWeb.git```

Bước 2: Tạo Cơ sở dữ liệu MySQL với tên Database là fall2324w3g5

Bước 3: Thực hiện các câu lệnh trong file Cơ sở dữ liệu fall2324w3g5.sql được lưu ở thư mục gốc mới clone

Bước 3: Quay trở lại terminal, ```cd Backend```

Bước 4: ```npm start```

Bước 5: ```cd ..```

Bước 6: ```cd Frontend```

Bước 7: ```ng serve```

Bước 8: Truy cập ```http://localhost:4200/```


### 2. Cấu trúc Ứng dụng

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

