require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

 const createTransporter = async () => {
   try {
     const oauth2Client = new OAuth2(
       process.env.CLIENT_ID,
       process.env.CLIENT_SECRET,
       "https://developers.google.com/oauthplayground"
     );

     oauth2Client.setCredentials({
       refresh_token: process.env.REFRESH_TOKEN,
     });

     const accessToken = await new Promise((resolve, reject) => {
       oauth2Client.getAccessToken((err, token) => {
         if (err) {
           console.log("*ERR: ", err);
           reject();
         }
         resolve(token);
       });
     });

     const transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
         type: "OAuth2",
         user: process.env.USER_EMAIL,
         accessToken,
         clientId: process.env.CLIENT_ID,
         clientSecret: process.env.CLIENT_SECRET,
         refreshToken: process.env.REFRESH_TOKEN,
       },
     });
     return transporter;
   } catch (err) {
     return err;
   }
 };

  const sendMail = async (recipientEmail) => {
    try {
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to:  recipientEmail,//'req.body.email',
        subject: "Test",
        text: "Hi, this is a test email",
      };

      let emailTransporter = await createTransporter();
      await emailTransporter.sendMail(mailOptions);
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

 sendEmail("aldenderfc.fabro99@gmail.com");