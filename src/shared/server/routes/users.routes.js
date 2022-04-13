const { Router } = require("express");
const { register } = require("../../../controllers/users/register");
const { login } = require("../../../controllers/users/login");
const router = new Router();

router.post("/login", login);

router.post("/register", register);

module.exports = router;
