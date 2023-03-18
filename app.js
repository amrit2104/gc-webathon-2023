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
const socket = require('socket.io');
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

app.use(express.static('public'));

// dummy drone activation
app.get('/drone1',(req,res)=>{
  res.sendFile(__dirname+'/drone1.html')
})
app.get('/drone2',(req,res)=>{
  res.sendFile(__dirname+'/drone2.html')
})
app.get('/drone3',(req,res)=>{
  res.sendFile(__dirname+'/drone3.html')
})
app.get('/drone4',(req,res)=>{
  res.sendFile(__dirname+'/drone4.html')
})
app.get('/drone5',(req,res)=>{
  res.sendFile(__dirname+'/drone5.html')
})



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

// tracking
app.get('/track/admin',(req,res)=>{
  res.render('trackAdmin',{uid: "6414ad771642e487baf6bad9"})
})


app.get('/track',(req,res)=>{
  res.render('track',{uid: '6414c0a2b5c4b9206dd43375'})
})




app.use("/", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/userportal", userportalRoutes);
// app.use("/campgrounds/:id/reviews", reviewRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 400));
});

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  if (!err.message) err.message = "Something Went Wrong!!!";
  res.status(err.statusCode).render("error", { err });
});

const port = process.env.PORT || 8000;
















const server = app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});



const io = socket(server);

// DUMMY DATABASE VALUES droneid -> userid
const DRONES = new Map([
    [1,'6414c0cfb5c4b9206dd43381'],[2,'6414c0a2b5c4b9206dd43375'],
    [3,'6414c0fab5c4b9206dd43389'],[4,'6414c0fab5c4b9206dd43389'],[5,'6414c0a2b5c4b9206dd43375']
]);

const drones = new Map();
// online user -> socket id
const users = new Map();








io.on('connection',(socket)=>{
    socket.on('group',(data)=>{
        if(data.grp == 'drone'){
            drones.set(data.id, DRONES.get(data.id))
        }
        else if(data.grp == 'user'){
            users.set(data.id, socket.id)
        }
    })

    
    socket.on('pos',(data)=>{
        let userid = drones.get(data.id);
        // send position of drone to admin. (drone id, position)
        io.to(users.get("6414ad771642e487baf6bad9")).emit('newpos',data)

        if(users.get(userid)){
            io.to(users.get(userid)).emit('newpos',data)
        }
    });

});

