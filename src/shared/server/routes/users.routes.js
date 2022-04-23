const authentication = require("../middlewares/authentication");
const { Router } = require("express");
const { register } = require("../../../controllers/users/register");
const { login } = require("../../../controllers/users/login");
const switchRole = require("../../../controllers/users/switch-role");
const router = new Router();

router.post("/login", login);

router.post("/register", register);

router.post("/companies", authentication, switchRole);

module.exports = router;
