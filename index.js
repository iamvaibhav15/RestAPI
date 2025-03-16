const express = require("express");

const { connecttoMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares")
const userRouter = require("./routes/user");

const app = express();
port = 5000;


// Middleware - Plugins
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"))

app.use("/api/users", userRouter);

// Connection to Mongoose
connecttoMongoDB("mongodb://127.0.0.1:27017/FirstDB")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error", err));

app.listen(port, () => {
    console.log(`Server Working on http://localhost:${port}`);
});