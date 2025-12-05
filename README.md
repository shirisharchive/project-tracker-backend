**package.json**

        {
      "name": "backend",
      "version": "1.0.0",
      "description": "",
      "license": "ISC",
      "author": "",
      "type": "commonjs",
      "main": "server.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon server.js"
      },
      "dependencies": {
        "cors": "^2.8.5",
        "dotenv": "^17.2.3",
        "express": "^5.2.1",
        "joi": "^18.0.2",
        "mongoose": "^9.0.0",
        "nodemailer": "^7.0.11",
        "nodemon": "^3.1.11"
      }
    }
**.env**

        DB_URL=mongodb://localhost:27017/DB_NAME
        EMAIL_USER=email@gmail.com
        EMAIL_PASS=APP_PASSWORD

