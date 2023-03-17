if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const ejsMate = require("ejs-mate");
const Joi = require("joi");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utilities/ExpressError");
const catchAsync = require("./utilities/CatchAsync");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const userRoutes = require("./routes/user");
const dashboardRoutes = require("./routes/dashboard");
const userportalRoutes = require("./routes/userportal");
// const reviewRoutes = require("./routes/reviews");

const MongoDBStore = require("connect-mongo")(session);

let dbUrl;
// if (process.env.DB_URL !== "production") {
//   dbUrl = 'mongodb://localhost:27017/yelp-camp';
// } else {
//   dbUrl = process.env.DB_URL;
// }

// dbUrl = "mongodb://localhost:27017/gc-webathon-ee2023";
// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
dbUrl = "mongodb+srv://amrit2104:sxwyxb7NMwSBQCC4@cluster0.yzowgze.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());

const secret = process.env.SECRET || "thisshouldbeabettersecret!";

const store = new MongoDBStore({
  url: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("Session Store error", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() * (1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://a.tiles.mapbox.com/",
  "https://b.tiles.mapbox.com/",
  "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/dfxrae3d5/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
        "https://images.unsplash.com/",
        "https://www.nutanix.com/content/dam/nutanix-newsroom/why-drone-delivery-is-destined-to-make-a-difference/img-drone-delivery-droneports-feature.jpeg",
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/userportal", userportalRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 400));
});

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  if (!err.message) err.message = "Something Went Wrong!!!";
  res.status(err.statusCode).render("error", { err });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
