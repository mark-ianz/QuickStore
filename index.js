import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import Feedback from "./Feedback.js"

const app = express();

async function startServer() {
  try {
    mongoose.connect(process.env.MONGODB_URI);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log("Listening to port " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/feedback", async (req, res) => {
  const { name, email, message } = req.body;
  const feedback = await new Feedback({name, email, message}).save();
  res.json(feedback);
});