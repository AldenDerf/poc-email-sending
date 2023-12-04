require(`dotenv`).config(); // Load environment variables from .env file
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Goole OAuth2 credentials loaded from .env file
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// Create an OAuth2 client using Google API credentials
const oAuth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

//Function to send a test email using Nodemailer
const sendTestEmail = async (to) => {
  try {
    // Set OAuth credentials using the refresh token
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    // Retrieve the access token for authentication
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken();

    // Create a Nodemailer transporter with OAuth2 authentication
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MY_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const from = process.env.MY_EMAIL;
    const subject = "Test";
    const html = `
            <p>Hey ${to},</p>
            <p>🌻 This Is A Test Mail Sent By NodeMailer 🌻</p>
            <p>Thank you</p>
        `;

    // Attachment details
    const attachments = [
      {
        filename: `PDS1.pdf`,
        path: "./attachment/PDS1.pdf",
        contentType: `application/pdf`,
      },
      // You can add more attachments here if needed
    ];
    // Mail options
    const mailOptions = {
      from,
      to,
      subject,
      html, // Set the email content as HTML
      attachments // Include attachments in the mail options
    };

    // Return a promise to send the email
    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err, info) => {
        if (err) reject(err); // Reject promise if sending fails
        resolve(info); // Resolve promise with email information if successful
      });
    });
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
};

sendTestEmail("aldenderfc.fabro99@gmail.com");
module.exports = { sendTestEmail }; // Export the sendTestEmail
