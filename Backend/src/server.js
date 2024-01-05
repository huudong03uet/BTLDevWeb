import express from "express";
const morgan = require("morgan");
const route = require("./routes");
const cors = require("cors");
const multer = require('multer');
const nodemailer = require('nodemailer');
require("dotenv").config();
const app = express();

const PORT = 3000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static('../dist')); 
app.use(morgan("combined"));


route(app);

app.get('/hello', (req, res) => {
  res.send("ok")
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: '../dist' });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port localhost:${PORT}`);
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ntdat12a03@gmail.com',
    pass: 'pewuvrxyefcycvdo',
  }
});

app.post('/send-email/support', async (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  const message = req.query.message;
  const subject = req.query.subject;

  const text = `
    Dear ${name},
    Em khong biet dau ua ua.

    ${message}
  `;

  await transporter.sendMail(
    {
      from: 'ntdat12a03@gmail.com',
      to: email,
      subject: subject,
      text: text,
    }, (err) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json("done");
      }
    });
});

import { _checkUserWithGmail }  from './controllers/authController';

app.post('/send-email/forgotPassword', async (req, res) => {
  const email = req.query.email;
  let text = '';

  try {
    const x = await _checkUserWithGmail(email);

    if (x == false) {
      res.json("sai email");
    }

    await transporter.sendMail(
      {
        from: 'ntdat12a03@gmail.com',
        to: email,
        subject: "QUEN MAT KHAU",
        text: `password = Abc123456@`,
      }, (err) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json("done");
        }
      }
    );
  } catch (error) {
    
  }

  
});
