const { Router } = require("express");

const authentication = require("../middlewares/authentication");
const requestValidate = require("../middlewares/request-validate");

const create = require("../controllers/jobs/create");
const convert = require("../controllers/jobs/convert");
const list = require("../controllers/jobs/list");
const listRequestSchema = require("../controllers/jobs/list/request-schema");

const router = new Router();

router.post("/", authentication, create);
router.get("/", requestValidate(listRequestSchema), list);
router.post("/convert", convert);

module.exports = router;
