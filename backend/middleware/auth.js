const jwt = require("jsonwebtoken");
const clientModels = require("../models/clientModels");
const userModels = require("../models/userModels");

class Auth {
  async verifyAuthClient(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token)
        return res
          .status(403)
          .send({ message: "Access Denied. Please Login!" });
      jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        if (error) {
          console.error(error);
          return res.status(401).send({
            message: "Auth failed. Please Login again!",
            success: false,
          });
        }
        const user = await clientModels.findById(decoded.userId);
        if (user) {
          req.user = user;
          next();
        } else
          return res
            .status(403)
            .send({ message: "Access Denied. User not found!" });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err.message });
    }
    }
    
    async verifyAuthUser (req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
          if (!token)
            return res
              .status(403)
              .send({ message: "Access Denied. Please Login!" });
          jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
            if (error) {
              console.error(error);
              return res.status(401).send({
                message: "Auth failed. Please Login again!",
                success: false,
              });
            }
            const user = await userModels.findById(decoded.userId);
            if (user) {
                req.user = user;
              next();
            } else
              return res
                .status(403)
                .send({ message: "Access Denied. User not found!" });
          });
        } catch (err) {
          console.error(err);
          res.status(500).send({ error: err.message });
        }
    }
}

module.exports = new Auth();
