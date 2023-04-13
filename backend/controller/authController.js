const jwt = require('jsonwebtoken');
const userModels = require('../models/userModels');
const clientModels = require('../models/clientModels');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (userId) =>
  jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });

const handleError = (err) => {
  const errors = { name: "", email: "", password: "" };

  if (err === "Incorrect Name") errors.message = "Name should be valid";

  if (err.message === "Incorrect Email")
    errors.message = "This email is not registered";

  if (err.message === "Incorrect Password")
    errors.message = "This password is incorrect";

  if (err.code === 11000) errors.message = "Email already registered";

  return errors;
};

class AuthController {
  async postRegisterUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModels.create({ email, password });
      const token = createToken(user._id);

      res.cookie("jwtUser", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      delete user?.password;
      res.status(201).send({
        token,
        status: "success",
        message: "Account created Successfully",
      });
    } catch (error) {
      console.error(error);
      const errors = handleError(error);
      res.status(401).send({ errors, created: false });
    }
  }

  async postloginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModels.login(email, password);

      const token = createToken(user._id);

      res.cookie("jwtUser", token, {
        withCredentials: true,
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: maxAge * 1000,
      });

      res.status(202).json({
        token,
        loginStatus: true,
        message: "Logged in Successfully",
      });
    } catch (error) {
      console.error(error);
      const errors = handleError(error);
      res.json({ errors, loginStatus: false });
    }
  }
  
    async postRegisterClient(req, res) {
        try {
      const { email, password } = req.body;
      const user = await clientModels.create({ email, password });
      const token = createToken(user._id);

      res.cookie("jwtClient", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(201).send({
        token,
        status: "success",
        message: "Account created Successfully",
      });
    } catch (error) {
      console.error(error);
      const errors = handleError(error);
      res.status(401).send({ errors, created: false });
    }
    }

    async postloginClient(req, res) {
        try {
          const { email, password } = req.body;
          const user = await clientModels.login(email, password);

          const token = createToken(user._id);

          res.cookie("jwtClient", token, {
            withCredentials: true,
            secure: true,
            httpOnly: true,
            sameSite: "none",
            maxAge: maxAge * 1000,
          });

          res.status(202).json({
            token,
            loginStatus: true,
            message: "Logged in Successfully",
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          const errors = handleError(error);
          res.json({ errors, loginStatus: false });
        }
    }
}

module.exports = new AuthController();
