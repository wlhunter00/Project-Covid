const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://expressUser:bkQ8i3FRi2oxnIrq@cluster0-wqfvl.mongodb.net/CoronaInfo?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.on("connected", () => console.log("Connected"));
mongoose.connection.on("error", () => console.log("Connection failed with - "));
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port ", port));
