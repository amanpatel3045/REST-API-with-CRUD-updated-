const express = require("express");
const mongoose = require("mongoose");
const schema = require("./models/User");
const app = express();
app.use(express.json());
app.listen(5000, () => {
  try {
    // When the strict option is set to true, Mongoose will ensure that only the fields that are specified in your schema will be saved in the database, and all other fields will not be saved (if some other fields are sent).
    mongoose.set("strictQuery", true);
    mongoose.connect(
      "mongodb+srv://restapi:restapi@cluster0.xbrh7x0.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("SERVER IS RUNNING ON 5000");
  } catch (err) {
    console.log(err);
  }
});

// app.get("/", (req, res) => {
//   res.send({
//     message: "Welcome to Home Page (tsting the portal)",
//   });
// });

//POST METHOD

app.post("/", async (req, res) => {
  const userData = new schema({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const storage = userData.save();
    res.send({
      message: "data saved",
    });
  } catch (err) {
    console.log(err);
  }
});

//GET METHOD

app.get("/", async (req, res) => {
  try {
    const getData = await schema.find();
    res.json(getData);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

//GET BY ID => get a particular data object by id

app.get("/:id", async (req, res) => {
  try {
    const getByIdData = await schema.findById(req.params.id);
    res.json(getByIdData);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

//UPDATE THE PARTICULAR PART OF THE DATA USING PATCH METHOD

app.patch("/:id", async (req, res) => {
  try {
    const Data = await schema.findById(req.params.id);
    Data.name = req.body.name;
    const store = await Data.save();
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

//DELETE METHOD

app.delete("/:id", async (req, res) => {
  try {
    const alien = await schema.findById(req.params.id);
    const a1 = await alien.remove();
    res.json(a1);
  } catch (err) {
    res.send("ERROR");
    console.log(err);
  }
});
