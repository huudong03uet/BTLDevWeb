# Hướng dẫn 

### 1. Cách Deploy (trên hệ thống fall2324g3w5)

Bước 1: Từ root: ```cd 123web/testweb/Backend```

Bước 2: ```/etc/jupyter/bin/expose 3000```

Bước 3: ```cd Backend```

Bước 4: ```npm start```

Link video demo: https://youtu.be/mt1vxgTYrrY


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
