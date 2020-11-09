var express = require("express");
var htmlRoutes = require("./routes/htmlRoutes.js");
var apiRoutes = require("./routes/apiRoutes.js");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, function() {
  console.log("listening at port" + PORT);
});