const http = require("http");
//const path = require("path");
const app = require("./app");
//const Sequelize = require("sequelize");
//const properties = require("./properties.js");
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort("4040");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is alread in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
  console.log(process.env.jwt);
});

// app.use("*", (req, res, next) => {
//   if (req.originalUrl) {
//     let url = req.originalUrl;
//     if (!url.startsWith("/api/") && url.indexOf(".") == -1) {
//       res
//         .status(200)
//         .sendFile(
//           path.resolve(
//             __dirname +
//             "//..//" +
//             properties.publicPath.replace(/\//g, "//") +
//             "//index.html"
//           )
//         );
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
// server.listen(properties.port);
server.listen(port);
