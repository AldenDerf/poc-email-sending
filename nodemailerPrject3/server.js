// Create an Express server
const express = require("express");
const app = express();
const port = 3010;
const { sendTestEmail } = require("./mailer");

require("dotenv").config(); // Load environment variables from .env file

//Set up the root endpoint to display instructions for sending a test email
app.get("/", (request, response) => {
  response.send("Run /send-email to send test email");
});

app.get("/send-email", async (_, response) => {
  try {
    const SENDER_EMAIL_ID = process.env.MY_EMAIL;

    // Check if the sender's email ID needs to be updated and throw an error if not updated
    if (SENDER_EMAIL_ID === "EMAIL_ID") {
      throw new Error("Please update SENDER_EMAIL_ID");
    }

    // Send a test email using the provided sender's email ID
    const info = await sendTestEmail(SENDER_EMAIL_ID);
    response.send(info);
  } catch (error) {
    response.send(error.message);
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
