# Hướng dẫn Build Ứng Dụng

### Cây thư mục
BTLDevWeb

├── Frontend

│ ├── node_modules

│ ├── angular.js

│ └── src

├── Backend

│ ├── node_modules

│ ├── src

│ │ ├── models

│ │ │ └── sequelize.js

│ │ ├── Controller

│ │ ├── Router

│ │ └── server.js

## Bước 1: Clone Repository
```
git clone https://github.com/huudong03uet/BTLDevWeb.git
```

## Bước 2: cd vào file Front end
```
cd Frontend
```

## Bước 3: chỉnh lại file angular.js trong folder Frontend
- thêm phụ thuộc các js trong build -> options.
```
"options": {
    **"allowedCommonJsDependencies": [
      "lodash"
    ],**
...
}
```

  
- thuộc tính "build" có thuộc tính con "outputPath". Chỉnh lại "outputPath" thành "dist" ("outputPath": "dist")

```
"build": {
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
    "allowedCommonJsDependencies": [
      "lodash"
    ],
    **"outputPath": "dist",**
```

  
- ở phần "configurations" có thuộc tính con "production". Ở trong "production" có thuộc tính con "budgets". Chỉnh lại "maximumError" ở cả init và anyComponentStyle thành 2mb (Thực ra chỉnh số nào thì tùy thuộc vào chương trình báo lỗi, có thể tăng số này lên)
```
"configurations": {
    "production": {
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "1mb",
          **"maximumError": "1.5mb"**
        },
        {
          "type": "anyComponentStyle",
          "maximumWarning": "2kb",
          **"maximumError": "6.5kb"**
        }
      ],
      "outputHashing": "all"
    },
....
```


## Bước 4: npm run build hoặc ng build 
## Bước 5: từ thư mục gốc vào lại Backend
## Bước 6: trong Backend có 2 file "src/models/sequelize.js" và "src/server.js".
- "src/models/sequelize.js": chỉnh lại tên và cơ sở dữ liệu và password
```
const sequelize = new Sequelize('database_name', 'user_name', 'password', {
  host: 'localhost', // chỉnh lại cái này. nếu chạy trên web của thầy là process.env.MYSQL_SERVICE_HOST
  dialect: 'mysql',
  port: 3306,
});
```
- "src/server.js": chỉnh lại app.get('*', ...) thành đúng đường dẫn tới thư mục dist
  
Hết.
