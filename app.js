const express = require("express");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const passport = require("passport");
const path = require("node:path");
const pgPool = require("./database/pool");
const indexRouter = require("./routes/index");
const authMiddleware = require("./utils/isAuth").authMiddleware;

require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    store: new pgSession({
      pool: pgPool,
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authMiddleware);

app.use((req, res, next) => {
  console.log(req.session);
  console.log("req.user: ", req.user);
  console.log("req.isUser: ", req.isUser);
  console.log("req.isMember: ", req.isMember);
  console.log("req.isAdmin: ", req.isAdmin);

  next();
});

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
