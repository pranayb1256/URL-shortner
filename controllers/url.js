const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewshortURL(req, res) {
    try {
        // Log the request body for debugging
        console.log("Request body:", req.body);

        const body = req.body;
        
        // Check if the URL is provided
        if (!body || !body.url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // Generate a short ID using shortid
        const shortID = shortid.generate();

        // Save the URL to the database with the short ID and the original URL
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitedhistory: [],
        });

        // Return the short ID to the client
        return res.json({ id: shortID });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function handleGeTAnalytics(req,res)
{
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({totalClicks:result.visitHistory.length,
        analytics: result.visitHistory
    });
}
module.exports = {
    handleGenerateNewshortURL,
    handleGeTAnalytics,
};
