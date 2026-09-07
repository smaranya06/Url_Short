const express = require("express");

const {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirect
} = require("../controller/url");

const router = express.Router();

router.post("/url", handleGenerateNewShortURL);

router.get("/url/:shortId", handleRedirect);

router.get("/url/analytics/:shortId", handleGetAnalytics);

module.exports = router;