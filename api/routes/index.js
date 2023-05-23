const express = require("express");
const router = express.Router();

function customController(request, response) {
  return response.status(200);
}

router.get("/", customController);

module.exports = { router };
