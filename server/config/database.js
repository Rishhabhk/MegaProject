const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("DB connected"))
        .catch((e) => {
            console.log("db connection failed");
            console.error(e);
            process.exit(1);
        })

}
