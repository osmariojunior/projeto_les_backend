const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const create = require("../../../controllers/jobs/create");
const convert = require("../../../controllers/jobs/convert");

const router = new Router();

router.post("/", authentication, create);
router.get("/convert", convert);

module.exports = router;
