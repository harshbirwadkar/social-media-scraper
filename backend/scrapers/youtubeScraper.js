// const puppeteer = require("puppeteer");
// const { launchBrowser } = require("../utils/browser");

// const scrapeYouTubeData = async (url) => {
//     // const browser = await puppeteer.launch({ headless: true });
//     const browser = await launchBrowser();
//     const page = await browser.newPage();

//     try {
//         await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

//         const data = await page.evaluate(() => {
//             const nameElement = document.querySelector(
//                 "#page-header > yt-page-header-renderer > yt-page-header-view-model > div > div.page-header-view-model-wiz__page-header-headline > div > yt-dynamic-text-view-model > h1 > span"
//             );
//             const subscriberElement = document.querySelector(
//                 "#page-header > yt-page-header-renderer > yt-page-header-view-model > div > div.page-header-view-model-wiz__page-header-headline > div > yt-content-metadata-view-model > div:nth-child(3) > span:nth-child(1)"
//             );

//             return {
//                 name: nameElement ? nameElement.innerText.trim() : "Name not found",
//                 subscriberCount: subscriberElement ? subscriberElement.innerText.trim() : "Subscribers not found",
//             };
//         });

//         return data;
//     } catch (error) {
//         throw new Error(`Error scraping YouTube: ${error.message}`);
//     } finally {
//         await browser.close();
//     }
// };

// module.exports = scrapeYouTubeData;

// const { launchBrowser } = require("../utils/browser");

// const scrapeYoutubeData = async (url) => {
//     const browser = await launchBrowser();
//     const page = await browser.newPage();
    
//     try {
//         await page.setViewport({ width: 1280, height: 800 });
//         await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        
//         await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
        
//         const pageType = await determineYoutubePageType(page);
        
//         let data;
//         switch(pageType) {
//             case 'channel':
//                 data = await scrapeChannelPage(page);
//                 break;
//             case 'video':
//                 data = await scrapeVideoPage(page);
//                 break;
//             default:
//                 throw new Error('Unsupported YouTube page type');
//         }
        
//         return data;
//     } catch (error) {
//         console.error("Error scraping YouTube:", error);
//         throw error;
//     } finally {
//         await browser.close();
//     }
// };

// const determineYoutubePageType = async (page) => {
//     const url = page.url();
//     if (url.includes('/channel/') || url.includes('/c/') || url.includes('/@')) {
//         return 'channel';
//     }
//     if (url.includes('/watch?v=')) {
//         return 'video';
//     }
//     throw new Error('Unsupported YouTube URL type');
// };

// const scrapeChannelPage = async (page) => {
//     await page.waitForSelector('#channel-header', { timeout: 5000 });
    
//     return await page.evaluate(() => {
//         return {
//             channelName: document.querySelector('#channel-name')?.textContent?.trim(),
//             subscriberCount: document.querySelector('#subscriber-count')?.textContent?.trim(),
//             totalVideos: document.querySelector('#videos-count')?.textContent?.trim(),
//             description: document.querySelector('#description')?.textContent?.trim(),
//             lastActive: document.querySelector('#date')?.textContent?.trim()
//         };
//     });
// };

// const scrapeVideoPage = async (page) => {
//     await page.waitForSelector('#content', { timeout: 5000 });
    
//     return await page.evaluate(() => {
//         const comments = Array.from(document.querySelectorAll('#comments #content-text')).map(comment => ({
//             text: comment.textContent.trim(),
//             author: comment.closest('#comment')?.querySelector('#author-text')?.textContent?.trim(),
//             timestamp: comment.closest('#comment')?.querySelector('.published-time-text')?.textContent?.trim()
//         }));
        
//         return {
//             title: document.querySelector('.title')?.textContent?.trim(),
//             viewCount: document.querySelector('.view-count')?.textContent?.trim(),
//             likes: document.querySelector('#top-level-buttons-computed #text')?.textContent?.trim(),
//             comments: comments
//         };
//     });
// };

// module.exports = scrapeYoutubeData;

const { launchBrowser } = require("../utils/browser");

const scrapeYoutubeData = async (url) => {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    
    try {
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (['document', 'script', 'xhr', 'fetch'].includes(request.resourceType())) {
                request.continue();
            } else {
                request.abort();
            }
        });

        await page.setViewport({ width: 1280, height: 800 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log('Navigating to URL:', url);
        await page.goto(url, { 
            waitUntil: "networkidle0",
            timeout: 30000 
        });

        // Initial wait for content
        await delay(5000);

        // Get tab list
        const tabList = await page.$$('tp-yt-paper-tab');
        
        // Find and click the "About" tab
        for (let tab of tabList) {
            const text = await page.evaluate(el => el.textContent.trim(), tab);
            if (text.toLowerCase().includes('about')) {
                await tab.click();
                break;
            }
        }

        // Wait for about section to load
        await delay(2000);

        const data = await page.evaluate(() => {
            // Updated selectors based on current YouTube structure
            const getTextContent = (selector) => {
                const element = document.querySelector(selector);
                return element ? element.textContent.trim() : null;
            };

            // Get subscriber count (new selector)
            const subCount = document.querySelector('#subscriber-count-text');
            // Alternative selector for subscriber count
            const altSubCount = document.querySelector('yt-formatted-string#subscriber-count');

            // Get channel name (new selector)
            const channelNameElement = document.querySelector('#channel-name #text');
            const altChannelName = document.querySelector('#channel-header-container #channel-name');

            // Get about section (new selector)
            const aboutElement = document.querySelector('#description-container #description');
            const altAbout = document.querySelector('yt-formatted-string#description');

            // Get metadata container
            const metadataContainer = document.querySelector('ytd-channel-about-metadata-renderer');

            return {
                channelName: channelNameElement?.textContent?.trim() || 
                           altChannelName?.textContent?.trim(),
                subscriberCount: subCount?.textContent?.trim() || 
                                altSubCount?.textContent?.trim(),
                about: aboutElement?.textContent?.trim() || 
                       altAbout?.textContent?.trim(),
                // Stats section
                joinDate: getTextContent('ytd-channel-about-metadata-renderer #right-column yt-formatted-string') ||
                         metadataContainer?.querySelector('.style-scope:nth-child(2)')?.textContent?.trim(),
                totalViews: getTextContent('ytd-channel-about-metadata-renderer #right-column yt-formatted-string:nth-child(3)') ||
                           metadataContainer?.querySelector('.style-scope:nth-child(3)')?.textContent?.trim(),
                location: getTextContent('#details-container yt-formatted-string') ||
                         metadataContainer?.querySelector('#details-container')?.textContent?.trim(),
                debug: {
                    url: window.location.href,
                    html: document.documentElement.innerHTML.substring(0, 1000), // First 1000 chars for debugging
                    elementsCounts: {
                        subscriberElements: document.querySelectorAll('#subscriber-count-text, #subscriber-count').length,
                        channelNameElements: document.querySelectorAll('#channel-name, #text').length,
                        aboutElements: document.querySelectorAll('#description-container, #description').length
                    }
                }
            };
        });

        console.log('Scraped data:', data);
        
        // Take a screenshot if data is missing
        if (!data.channelName && !data.subscriberCount) {
            await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
        }

        return data;

    } catch (error) {
        console.error("Error scraping YouTube:", error);
        await page.screenshot({ path: 'error-screenshot.png' });
        throw error;
    } finally {
        await browser.close();
    }
};

// Helper function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = scrapeYoutubeData;