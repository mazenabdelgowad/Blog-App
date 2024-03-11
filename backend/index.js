const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");
const categoryRouter = require("./routes/categoryRouter");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Server Started");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error.message);
  });

app.use(express.json());

app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/category", categoryRouter);

app.use(errorHandler);

app.all("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "Error", message: `404 ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
