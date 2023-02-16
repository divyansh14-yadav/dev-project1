import express from "express";
import User from "../models/userM.js";

const usercontroller = express.Router();

// post method

const userpost = async (req, res) => {

  const { name, age, city, gender, salary, phone, address } = req.body;                       // object bna kar req.body mai pass kr diya aur niche usko use kr liya

  if (gender !== "Male" && gender !== "Female" && gender !== "m" && gender !== "f" && gender !== "female" && gender !== "male" && gender !== "other" && gender !== "o") {
    res.status(401).send({ message: "gender is not correct" })
  }

  else if (!name || !age || !city || !salary || !phone || !address) {
    res.status(401).send({ "message": "field is missing check the fields" })
  }

  else {

    try {

      const names = await User.findOne({ name });

      // if (names)
      // {
      //   res.status(400).send('name already exists');

      // }

      // else{
      const users = new User({
        name, age, city, gender, salary, phone, address
      });

      const data = await users.save()

      res.send({ details: data })
      // }

    }
    catch (err) {

      res.send(err)
    }
  }
}



// get method for all data

const userget = async (req, res) => {

  const data = await User.find()
  try {
    res.status(200).send(data);

  }
  catch (err) {

    res.status(400).send(err);
  }

}

// get by id method

const usergetone = async (req, res) => {

  const data = await User.findById(req.params.id)

  try {

    res.status(200).send(data);
  }
  catch (err) {

    res.status(400).send(err);

  }
}

// put method

const userput = async (req, res) => {

  const data = await User.findByIdAndUpdate(req.params.id, req.body)
  try {

    res.status(200).send({ "message": "updated successfully" })
  }
  catch (err) {

    res.status(400).send({ "error": "err" })
  }

}

// delete method

const userdelete = async (req, res) => {

  const data = await User.findByIdAndRemove(req.params.id)

  try {

    res.status(200).send({ "message": "data deleted" })

  }
  catch (err) {
    res.status(400).send({ "error": "data not deleted " })
  }
}


export default { usercontroller, userpost, userget, userput, userdelete, usergetone }

