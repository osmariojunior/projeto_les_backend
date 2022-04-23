const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const create = require("../../../controllers/companies/create");

const router = new Router();

router.post("/", authentication, create);

module.exports = router;
