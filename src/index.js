const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const db = require("./config/database");
const route = require("./routes/api");
const methodOverride = require("method-override");
require("dotenv").config();
var cookieParser = require('cookie-parser')

//Connect to database
db.connect();

const app = express();
const port = process.env.PORT || 3001;

//Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      formatPrice: (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ'
    },
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Link to static file
app.use(express.static(path.join(__dirname, "public")));

//middleware
app.use(
  express.urlencoded({
    extended: true,
  })
); //res
app.use(express.json()); //req

app.use(methodOverride("_method"));

app.use(cookieParser())

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
