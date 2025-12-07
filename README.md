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

**What happened when I was trying to test the API in Postman today?**

I am sharing this because I find this funny.

Suddenly, thought came if I am storing OTP in db why not encrypt it

So, I wrote encryption logic using bcrypt library

Ok no error appeared in console. I thought let's try in postman.

I updated the code around 8 am morning but there was Undefined message in console.

I was not able to figure out what actually bug is present and I too wrote small app for debugging but the result was same.

Finally, in Postman I tried changing Text to Json it worked.And interesting part is this that it almost took me 4 hours to figured this out.(I know I am bit dumb)

<img width="927" height="596" alt="image" src="https://github.com/user-attachments/assets/4c5d54ba-f583-4994-b570-8977e7303e62" />

<img width="698" height="673" alt="image" src="https://github.com/user-attachments/assets/d8c4611b-6bd7-41bb-9100-b05df1286059" />





