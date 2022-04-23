const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const create = require("../../../controllers/companies/create");
const list = require("../../../controllers/companies/list");

const router = new Router();

router.post("/", authentication, create);
router.get("/", authentication, list);

module.exports = router;
