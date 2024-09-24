const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pgPool = require("./pool");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pgPool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
      );

      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password_hash);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pgPool.query(
      `SELECT id, username, first_name, last_name,membership_status,is_admin FROM users WHERE id = $1`,
      [id]
    );

    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
