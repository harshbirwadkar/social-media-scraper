// // const puppeteer = require("puppeteer");
// // const {launchBrowser} = require("../utils/browser");

// // const scrapeInstagramData = async (url) => {
// //     // const browser = await puppeteer.launch({ headless: true });
// //     const browser = await launchBrowser();
// //     const page = await browser.newPage();

// //     try {
// //         // Go to the Instagram URL and wait for the page to load
// //         await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

// //         // Channel name selector
// //         // const nameSelector = " h2 ";  // Adjust this based on Instagram's page structure
// //         // const name = await page.$eval(nameSelector, (el) => el.innerText.trim());
// //         // const name = " "

// //         // // Follower count selector
// //         // // const followerSelector = "li:nth-child(2) span > span";  // Adjust this based on Instagram's page structure
// //         // // const followerSelector = "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(2) > div > button > span > span";  // Adjust this based on Instagram's page structure
// //         // // const followerCount = await page.$eval(followerSelector, (el) => el.innerText.trim());
// //         // const followerCount = document.querySelector(
// //         //     "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(2) > div > button > span > span"
// //         // );

// //         // // Following count selector
// //         // // const followingSelector = "li:nth-child(3) span > span";  // Adjust this based on Instagram's page structure
// //         // // const followingSelector = "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(3) > div > button > span > span";  // Adjust this based on Instagram's page structure
// //         // // const followingCount = await page.$eval(followingSelector, (el) => el.innerText.trim());
// //         // const followingCount = document.querySelector(
// //         //     "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(3) > div > button > span > span"
// //         // );

// //         let yo;
// //         let yoyo;
        
// //         const data = await page.evaluate(() => {
// //             const name = " "

        
// //             const followerCount = document.querySelector(
// //                 "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(2) > div > button > span > span"
// //             );

// //             const followingCount = document.querySelector(
// //                 "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(3) > div > button > span > span"
// //             );
// //             yo= followerCount;
// //             yoyo = followingCount;
// //             return {
// //                 // name: nameElement ? nameElement.innerText.trim() : "Name not found",
// //                 name:  "Name not found",
// //                 followerCount: followerCount ? followerCount.innerText.trim() : "Followers not found",
// //                 followingCount: followingCount ? followingCount.innerText.trim() : "Following not found",
// //             };
// //         });
// //         console.log("following count :" , yoyo)
// //         console.log("followers count :" , yo)
// //         // Return the scraped data
// //         // return {
// //         //     name,
// //         //     followerCount,
// //         //     followingCount
// //         // };
// //         console.log(data);
// //         return data;
// //     } catch (error) {
// //         console.error("Error while extracting data:", error);
// //         throw error;
// //     } finally {
// //         await browser.close();
// //     }
// // };

// // module.exports = scrapeInstagramData;


// const puppeteer = require("puppeteer");
// const { launchBrowser } = require("../utils/browser");

// const scrapeInstagramData = async (url) => {
//     const browser = await launchBrowser();
//     const page = await browser.newPage();

//     try {
//         // Go to the Instagram URL and wait for the page to load
//         await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

//         const data = await page.evaluate(() => {
//             // Name of the Instagram user (can be updated with actual selector)
//             // const nameElement = document.querySelector("h2"); 
//             // const nameElement = document.querySelector("div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div:nth-child(2) > div > div.x10o80wk.x14k21rp.xh8yej3.x8vgawa > section > main > div > header > section > div.x7a106z.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xdt5ytf.x2lah0s.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x11njtxf.xskmkbu.x1pjya6o.x14cbv0q.x7wvtww.x9v3v6d.x17eookw.x1q548z6 > div.x9f619.xjbqb8w.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x1oa3qoh.x6s0dn4.x1amjocr.x78zum5.xl56j7k > span"); 
//             const nameElement = document.querySelector("span[style='----base-line-clamp-line-height: 18px; --lineHeight: 18px;']"); 
//             const name = nameElement ? nameElement.innerText.trim() : "Name not found";

//             // Follower count
//             // const followerElement = document.querySelectorAll("button");
//             const followerElement = document.querySelector("section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(2) > div > button > span > span");
//             const followerCount = followerElement ? followerElement.innerText.trim() : "Followers not found";

//             // Following count
//             const followingElement = document.querySelector("section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(3) > div > button > span > span"); 
//             const followingCount = followingElement ? followingElement.innerText.trim() : "Following not found";
//             // const followingCount = followingElement ? followingElement : "Following not found";
        
//             return {
//                 name,
//                 followerCount,
//                 followingCount
//             };
//         });
        
//         console.log(data);
//         // Return the scraped data
//         return data;

//     } catch (error) {
//         console.error("Error while extracting data:", error);
//         throw error;
//     } finally {
//         await browser.close();
//     }
// };

// module.exports = scrapeInstagramData;
const puppeteer = require("puppeteer");
const { launchBrowser } = require("../utils/browser");

const scrapeInstagramData = async (url) => {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    
    try {
        // Set viewport and user agent for better reliability
        await page.setViewport({ width: 1280, height: 800 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

        // Determine page type
        const pageType = await determinePageType(page);

        let data;
        switch(pageType) {
            case 'profile':
                data = await scrapeProfilePage(page);
                break;
            case 'post':
                data = await scrapePostPage(page);
                break;
            default:
                throw new Error('Unsupported page type');
        }

        return data;
    } catch (error) {
        console.error("Error while extracting data:", error);
        throw error;
    } finally {
        await browser.close();
    }
};

const determinePageType = async (page) => {
    // Check URL pattern and page structure to determine type
    const url = page.url();
    if (url.includes('/p/')) return 'post';
    return 'profile';
};

const scrapeProfilePage = async (page) => {
    // Wait for key elements to load
    await page.waitForSelector('header section', { timeout: 5000 });

    return await page.evaluate(() => {
        const getData = (selector) => {
            const element = document.querySelector(selector);
            return element ? element.innerText.trim() : null;
        };

        const getFollowData = (index) => {
            const selector = `section > main > div > header > section > ul > li:nth-child(${index}) > div > span > span`;
            const element = document.querySelector(selector);
            return element ? element.innerText.trim() : null;
        };

        return {
            name: getData('header section span.x1lliihq'),
            bio: getData('header section div._aa_c'),
            followerCount: getFollowData(2),
            followingCount: getFollowData(3),
            postsCount: getFollowData(1),
            isPrivate: !!document.querySelector('header section div._aa_c[title="Private"]'),
            profilePicUrl: document.querySelector('header img')?.src,
            lastActive: new Date().toISOString() // Current time as last active
        };
    });
};

const scrapePostPage = async (page) => {
    await page.waitForSelector('article', { timeout: 5000 });

    return await page.evaluate(() => {
        const comments = Array.from(document.querySelectorAll('ul > li span.x1lliihq')).map(el => ({
            username: el.innerText,
            timestamp: el.closest('li')?.querySelector('time')?.dateTime,
            text: el.closest('li')?.querySelector('div._a9zs')?.innerText
        }));

        return {
            postType: 'post',
            likesCount: document.querySelector('section span a span')?.innerText,
            comments,
            postDate: document.querySelector('time')?.dateTime,
            caption: document.querySelector('div._a9zs')?.innerText
        };
    });
};

module.exports = scrapeInstagramData;