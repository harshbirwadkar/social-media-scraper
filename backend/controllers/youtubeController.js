// const scrapeYouTubeData = require("../scrapers/youtubeScraper");

// const youtubeController = {
//     scrape: async (req, res) => {
//         const { url } = req.body;

//         if (!url) {
//             return res.status(400).json({ error: "You must provide a URL." });
//         }

//         try {
//             const data = await scrapeYouTubeData(url);
//             res.status(200).json(data);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// };

// module.exports = youtubeController;
const scrapeYoutubeData = require("../scrapers/youtubeScraper");

const youtubeController = {
    scrape: async (req, res) => {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "You must provide a URL." });
        }

        try {
            const data = await scrapeYoutubeData(url);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = youtubeController;