const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
const cors = require("cors");
// const corsOptions = {
//   origin: true, //included origin as true
//   credentials: true, //included credentials as true
// };
const path = require("path");
const bodyParser = require("body-parser");
const dateFns = require("date-fns/format");
require("dotenv").config();
app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to zen application." });
});
// app.use(cors(corsOptions));
//app.use(cors({ origin:true, credentials:true }));
const db = require("./models");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const userRoutes = require("./routes/user");

//gestion CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://frontendz.vercel.app");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",

  );
  // var token=JSON.stringify({
  //   "token":"some token content"
  // });
  // res.header('Access-Control-Allow-Origin', "http://127.0.0.1:3000");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header( 'Access-Control-Allow-Credentials',true);
  // var date = new Date();
  // var tokenExpire = date.setTime(date.getTime() + (360 * 1000));
  // res.status(201)
  //    .cookie('token', token, { maxAge: tokenExpire, httpOnly: true })
  //    .send();

  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});
const multer = require("multer");
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname;
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
    callback(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
module.exports = multer({ storage }).single("image");
// Pour parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
const likesRouter = require("./routes/like");

app.use("/images", express.static(path.join(__dirname, "images")));
/* s */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to zzzen application." });
});
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", userRoutes);
app.use("/api/likes", likesRouter);
module.exports = app;

db.sequelize.sync();
