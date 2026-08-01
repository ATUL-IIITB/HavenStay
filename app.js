const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy= require("passport-local");
const User = require("./models/user.js");
const listingsRouter = require("./router/listing.js"); 
const reviewsRouter = require("./router/review.js");
const userRouter = require("./router/user.js");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
    secret: "MysuperSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    console.log("Success:", res.locals.success);
    console.log("Error:", res.locals.error);

    next();
});
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("Connection error:", err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.listen(8080, () => {
    console.log("App Is Listening at Port 8080");
});

app.get("/demouser",async(req,res)=>{
    const fakeUser = new User ({
        email : "Demoemail@gmail.com",
        username : "fakeuser"
    });
    let registeredUser = await User.register(fakeUser,"hello");
    res.send(registeredUser);
});

app.get("/", (req, res) => {
    res.send("App is running");
});


app.use((req, res, next) => {
    const isAsset = /\.(css|js|ico|png|jpg|map|woff|woff2)$/.test(req.path);
    if (isAsset) return res.status(404).end();
    next(new expressError(404, "Page Not Found!!!!"));
});

app.use((err, req, res, next) => {
    console.error(err);
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error.ejs", { message });
});