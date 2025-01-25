const puppeteer = require("puppeteer");
const { launchBrowser } = require("../utils/browser");

const scrapeYouTubeData = async (url) => {
    // const browser = await puppeteer.launch({ headless: true });
    const browser = await launchBrowser();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

        const data = await page.evaluate(() => {
            const nameElement = document.querySelector(
                "#page-header > yt-page-header-renderer > yt-page-header-view-model > div > div.page-header-view-model-wiz__page-header-headline > div > yt-dynamic-text-view-model > h1 > span"
            );
            const subscriberElement = document.querySelector(
                "#page-header > yt-page-header-renderer > yt-page-header-view-model > div > div.page-header-view-model-wiz__page-header-headline > div > yt-content-metadata-view-model > div:nth-child(3) > span:nth-child(1)"
            );

            return {
                name: nameElement ? nameElement.innerText.trim() : "Name not found",
                subscriberCount: subscriberElement ? subscriberElement.innerText.trim() : "Subscribers not found",
            };
        });

        return data;
    } catch (error) {
        throw new Error(`Error scraping YouTube: ${error.message}`);
    } finally {
        await browser.close();
    }
};

module.exports = scrapeYouTubeData;
