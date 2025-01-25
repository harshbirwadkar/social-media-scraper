const scrapeInstagramData = require("../scrapers/instagramScraper");

const instagramController = {
    scrape: async (req, res) => {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "You must provide a URL." });
        }

        try {
            const data = await scrapeInstagramData(url);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = instagramController;
