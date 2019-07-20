const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/petsavermad', { useNewUrlParser: true });
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const animalsRouter = require("./controllers/animals");
const userRouter = require("./controllers/user");

app.use(bodyParser.json());

app.use('/', animalsRouter);
app.use('/', userRouter);

app.listen(3333, () => {
   console.log("3333");
})


