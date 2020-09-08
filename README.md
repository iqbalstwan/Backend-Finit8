<h1 align="center">ExpressJS - Finit8 RESTfull API</h1>

This project name called FINIT8. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST = localhost        // DB Host
DB_USER = root            // DB User
DB_PASS =                // DB Pass
DB_BASE = online-shop   // DB Name
IP = 127.0.0.1         // IP
PORT = 3001           // PORT

```

## End Point

**1. GET**

- `/product`(Get all product)
- `/product/:id`(Get product by id)
- `/product/search/:keyword`(Get product by name)

- `/category`(Get all category)
- `/category/:id`(Get category by id)

- `/order`(Get all order)
- `/order/:id`(Get order by id)

- `/history`(Get all order)
- `/history/dashboard/day`(Get today income)
- `/history/dashboard/week`(Get order count)
- `/history/dashboard/years`(Get years income)
- `/history/recent/order`(Get recent order)
- `/history/week/order`(Get week order)
- `/history/month/order`(Get month order)
- `/history/chart`(Get history chart)
- `/history/:id`(Get history by id)

- `/user`(Get all user)
- `/user/:id`(Get user by id)

**2. POST**

- `/product` (Post product)

  - `{ "category_id": "1", "product_name": Red Velvet,"product_img": image, "product_price": 50000 , "product_status" : 1 | 0}`

- `/category` (Post product)

  - `{ "category_name": "Coffe" , "category_status" : 1 | 0}`

- `/order` (Post product)

  - `{ orders ,[{ "history_id": "61", "product_id": 12, "order_qty": 2 , "total_price" : 60000 ]}}`

- `/user/login` (Post product)

  - `{ "user_email": "iqbalstwan@outlook.com" , "user_password" : 12345678}`

**3. PATCH**

- `/product/:id` (Update product by id)

  - `{"product_name" : "Red Velvet", "category_id" : 1, "product_harga" : 100000, "product_status" : 1 | 0}`

- `/category/:id` (Update category by id)

  - `{"category_name" : "Milk", "product_status" : 1 | 0}`

- `/user/update/:id` (Update user by id)

  - `{ "user_email": "iqbalstwan@outlook.com" , "user_password" : 12345678}, "user_status" : 1 | 0}`

**4. DELETE**

- `/product/:id` (Delete product by id)
- `/category/:id` (Delete product by id)
- `/user/:id` (Delete product by id)
