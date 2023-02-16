import Jwt from "jsonwebtoken";
import User from "../models/userM.js";

// const dotenv=config()

const verifytoken = (req, res, next) => {

  const authHeader = req.headers['token']
  const token = authHeader && authHeader.split(' ')[1]
  try {
    if (token == null)

      return res.send({ Message: "Token is required" })

    Jwt.verify(token, process.env.API_SECRET_KEY)

    req.user = User

    next()

  } catch (err) {
    res.send({ Message: "Invalid token" })
  }
};

export default verifytoken