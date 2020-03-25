const line = require("line-pay-sdk");
const express = require("express");
const uuid = require("uuid/v4")
const dotenv = require("dotenv");

dotenv.config()

const client = new line.Client({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecret: process.env.LINE_PAY_CHANNEL_SECRET,
});

const app = express();

// Set ejs as template engine.
app.set("view engine", "ejs");

// Router configuration to serve web page containing pay button.
app.get("/", (req, res) => {
  res.render(__dirname + "/index");
});

// Middleware configuration to serve static file.
app.use(express.static(__dirname + "/public"));

/**
 *  LINE PAY WITHOUT MIDDLEWARE
 */
// Router configuration to start payment.
app.use("/pay/reserve", (req, res) => {
  const options = {
    productName: "Apple",
    amount: 1,
    currency: "JPY",
    orderId: uuid(),
    confirmUrl: `http://localhost:${process.env.PORT ?? 5000}/pay/confirm`
  };

  client.reservePayment(options).then((response) => {
    let reservation = options;

    console.log("Reservation was made!");
    console.log("Response: ", response);

    res.redirect(response.info.paymentUrl.web);
  });
});

// Router configuration to recieve notification when user approves payment.
app.use("/pay/confirm", (req, res) => {
  if (!req.query.transactionId) {
    throw new Error("Transaction Id not found.");
  }

  const confirmation = {
    transactionId: req.query.transactionId,
    amount: 1,
    currency: "JPY"
  };

  console.log(`Going to confirm payment with following options.`);
  console.log(confirmation);

  client.confirmPayment(confirmation).then((response) => {
    res.send("Payment has been completed.");
  });
});

/**
 *  LINE PAY WITH MIDDLEWARE
 */
app.use("/middleware", client.middleware({
  productName: "Banana",
  amount: 1,
  currency: "JPY",
  orderId: uuid(),
  confirmUrl: `http://localhost:${process.env.PORT ?? 5000}/middleware/confirm`
}), (req, res, next) => {
  res.send("Payment has been completed.");
});

app.listen(process.env.PORT ?? 5000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT ?? 5000}`);
});
