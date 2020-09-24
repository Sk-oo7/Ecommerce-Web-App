const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51HUf2KGbh00gXxRnsG5P5CFZ1TjqxRDZVzz0HNrx6DrNP4dGtOqQVMBPqPDgFo5EPE2LoLz8Dj1zp8hPDZQ7tl5200DqgbSHFx"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("payemnt reqst >>>>>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
