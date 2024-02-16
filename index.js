const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
require("./db");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(port || 3000, () => {
    console.log(`server up at port ${port}`);
});