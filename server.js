const express = require("express");
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const routes = require('./routes');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/FitnessAppdb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
