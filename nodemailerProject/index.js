const express = require("express");
const app = express();
const port = 300;
require("dotenv").config();
// Node mailer
const nodemailer = require("nodemailer");
const { google } = require("googleapis");


app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});

const oAuth2client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oAuth2client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

// Use oAuth2Client in nodemailer transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.USERNAME,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: oAuth2client.getAccessToken(),
  },
});

// mailOptions object, which holds the details of where to send the email and with what data.
let mailOptions = {
  from: "aldenderfc.fabro99@gmail.com",
  to: "aldenderfc.fabro99@gmail.com",
  subject: "Nodemailer Project",
  text: "Hi from paofi foudation",
};

//the senMail method
transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log("Error" + err);
  } else {
    console.log("Email sent successfully");
  }
});

