const express = require("express");
const errorHandeler = require("./middleWares/errorHandeler");
const connectDB = require("./config/dataBaseConnection");
const dotenv = require("dotenv").config();
const app = express();
const port = 5000;

connectDB();
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));// middleWare
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandeler);


app.listen(port, () => {
    console.log("server running on ", port);
})