const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI)
    .then((conn) =>
      console.log(`MongoDB is connected on : ${conn.connection.host}`)
    )
    .catch((err) => console.log("DB ERROR : ", err));
};

module.exports = connectDatabase;
