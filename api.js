const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/petsavermad', { useNewUrlParser: true });
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const animalsRouter = require("./controllers/animals");
const userRouter = require("./controllers/user");
const conversacionRouter = require("./controllers/conversacion");
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use('/', animalsRouter);
app.use('/', userRouter);
app.use('/', conversacionRouter);

app.listen(3333, () => {
   console.log("3333");
})


