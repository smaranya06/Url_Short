const shortid = require("shortid");
const URL = require("../model/url");

async function handleGenerateNewShortURL(req, res) {

    const body = req.body;

    if (!body.url) {
        return res.status(400).json({
            error: "URL is required"
        });
    }

    const shortId = shortid.generate();

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    if (req.headers["accept"] && req.headers["accept"].includes("application/json") && !req.headers["content-type"]?.includes("application/x-www-form-urlencoded")) {
        return res.json({
            id: shortId
        });
    }

    return res.redirect(`/?id=${shortId}`);
}

async function handleGetAnalytics(req, res) {

    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({
            error: "URL not found"
        });
    }

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

async function handleRedirect(req, res) {

    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        },
        {
            returnDocument: 'after'
        }
    );

    if (!entry) {
        return res.status(404).send("URL not found");
    }

    let targetURL = entry.redirectURL;
    if (!targetURL.startsWith("http://") && !targetURL.startsWith("https://")) {
        targetURL = `https://${targetURL}`;
    }

    return res.redirect(targetURL);
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirect
};