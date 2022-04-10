const { Router } = require("express");
const { register } = require("../../controllers/users/register");

const router = new Router();

router.get("/login", (req, res) => {
  res.send("mocked login");
});

router.post("/register", register);

module.exports = router;
