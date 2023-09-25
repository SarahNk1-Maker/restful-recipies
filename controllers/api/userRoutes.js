const router = require("express").Router();
const { User } = require("../../models");

//Route hnadler for user to signup. (Creates new user and associated password in database, if it doesn't already exist, and logs user in by creating sessoin id.)
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Route handler for user to login. (Checks if user/password pair exists, if true logs them in by creating session id, if not error message.)
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

//Logs user out be destroying session id.
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//Deletes user account.
router.delete("/:id", async (req, res) => {
  // Query the database to find the user by ID
  try {
    const userID = req.params.id;

    const user = await User.findByPk(userID);
    console.log(user);

    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user from the database
    await user.destroy();

    // Send a success response or a message indicating successful deletion
    res.status(204).send(); // 204 No Content status for successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
