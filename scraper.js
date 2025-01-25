const puppeteer = require('puppeteer');

async function scrapeYouTubeData(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Go to the YouTube URL and wait for the page to load completely
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }); // Increased timeout

    console.log('Page loaded, waiting for selectors...');

    try {
        // Wait for the channel name and subscriber count
        // await page.waitForSelector('yt-formatted-string.ytd-channel-name', { timeout: 60000 });
        // await page.waitForSelector('span.yt-subscription-button-subscriber-count-branded', { timeout: 60000 });

        // console.log('Selectors found, extracting data...');

        // Extracting the required data from the page using XPath
        const userData = await page.evaluate(() => {
            // Channel name
            const nameElement = document.querySelector("#page-header > yt-page-header-renderer > yt-page-header-view-model > div > div.page-header-view-model-wiz__page-header-headline > div > yt-dynamic-text-view-model > h1 > span");
            const name = nameElement ? nameElement.innerText.trim() : 'Name not found';
            // const nameElement = Array.from(document.querySelectorAll("#text > a")).map(x => x.textContent);
            // const name = nameElement ? nameElement.innerText.trim() : 'Name not found';


            // Subscriber count
            const subscriberElement = document.querySelector("#page-header > yt-page-header-renderer > yt-page-header-view-model > div > div.page-header-view-model-wiz__page-header-headline > div > yt-content-metadata-view-model > div:nth-child(3) > span:nth-child(1)")
            const subscriberCount = subscriberElement ? subscriberElement.innerText.trim() : 'Subscribers not found';

            // Returning the data as an object
            return {
                name,
                subscriberCount
            };
        });

        console.log(userData); // This will print the extracted data
    } catch (error) {
        console.error('Error while extracting data:', error);
    } finally {
        await browser.close();
    }
}

// Example YouTube URL
// scrapeYouTubeData('https://www.youtube.com/c/Google');
scrapeYouTubeData('https://www.youtube.com/@AminJaz');
