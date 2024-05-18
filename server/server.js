const app = require("./app");
const connectDatabase = require("./config/database");

process.on("uncaughtException", (err) => {
  console.log(`ERROR  -  ${err}`);
  server.close(() => {
    process.exit(1);
  });
});

connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server Listening to the PORT : ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on("unhandledRejection", (err) => {
  //console.log(`ERROR   -   ${err}`);
  console.log("Unhandled Rejection Error Triggers to Node Shutdown");
  server.close(() => {
    process.exit(1);
  });
});
