// const puppeteer = require("puppeteer");

// const launchBrowser = async () => {
//     return puppeteer.launch({
//         headless: true,
//         args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });
// };

// module.exports = { launchBrowser };
const puppeteer = require("puppeteer");

const launchBrowser = async () => {
    return await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    });
};
module.exports = { launchBrowser };