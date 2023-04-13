const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRouter = require('./routes/auth-router');
const Auth = require("./middleware/auth");
const clientRouter = require('./routes/client-router');
const userRouter = require('./routes/user-router');

const app = express();

connectDB();

const corsConfig = {
  credentials: true,
  origin: [`${process.env.FRONTEND_PORT}`],
  method: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", `${process.env.FRONTEND_PORT}`);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/client", Auth.verifyAuthClient, clientRouter);
app.use('/api/v1/user', Auth.verifyAuthUser, userRouter)

module.exports = app;
