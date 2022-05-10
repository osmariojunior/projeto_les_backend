const authentication = require("../middlewares/authentication");
const requestValidate = require("../middlewares/request-validate");
const { Router } = require("express");
const { register } = require("../controllers/users/register");
const { login } = require("../controllers/users/login");
const loginRequestSchema = require("../controllers/users/login/request-schema");
const switchRole = require("../controllers/users/switch-role");
const router = new Router();

router.post("/login", requestValidate(loginRequestSchema), login);

router.post("/register", register);

router.post("/companies", authentication, switchRole);

module.exports = router;
