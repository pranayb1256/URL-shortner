const express = require("express");
const { connectmongodb } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
const Port = 8000;

app.use(express.json());

// Connect to MongoDB
connectmongodb("mongodb://localhost:27017/short-url").then(() => console.log("Connected to MongoDB"));

// Use the URL routes
app.use("/url", urlRoute);

// Route for redirecting based on shortId
app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;

        // Find the entry and update visit history
        const entry = await URL.findOneAndUpdate(
            { shortId }, // Find the document with the shortId
            {
                $push: {
                    visitHistory: { // Ensure visitHistory exists in the model as an array
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true } // Return the updated document
        );

        // Check if entry exists
        if (!entry) {
            return res.status(404).json({ error: "URL not found" });
        }

        // Redirect to the original URL
        return res.redirect(entry.redirectURL);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
app.listen(Port, () => {
    console.log(`Server started at port ${Port}`);
});
