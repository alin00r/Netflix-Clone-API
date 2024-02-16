const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((e) => console.log(e.message));