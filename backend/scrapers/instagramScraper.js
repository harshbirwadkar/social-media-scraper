// const puppeteer = require("puppeteer");
// const {launchBrowser} = require("../utils/browser");

// const scrapeInstagramData = async (url) => {
//     // const browser = await puppeteer.launch({ headless: true });
//     const browser = await launchBrowser();
//     const page = await browser.newPage();

//     try {
//         // Go to the Instagram URL and wait for the page to load
//         await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

//         // Channel name selector
//         // const nameSelector = " h2 ";  // Adjust this based on Instagram's page structure
//         // const name = await page.$eval(nameSelector, (el) => el.innerText.trim());
//         // const name = " "

//         // // Follower count selector
//         // // const followerSelector = "li:nth-child(2) span > span";  // Adjust this based on Instagram's page structure
//         // // const followerSelector = "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(2) > div > button > span > span";  // Adjust this based on Instagram's page structure
//         // // const followerCount = await page.$eval(followerSelector, (el) => el.innerText.trim());
//         // const followerCount = document.querySelector(
//         //     "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(2) > div > button > span > span"
//         // );

//         // // Following count selector
//         // // const followingSelector = "li:nth-child(3) span > span";  // Adjust this based on Instagram's page structure
//         // // const followingSelector = "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(3) > div > button > span > span";  // Adjust this based on Instagram's page structure
//         // // const followingCount = await page.$eval(followingSelector, (el) => el.innerText.trim());
//         // const followingCount = document.querySelector(
//         //     "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(3) > div > button > span > span"
//         // );

//         let yo;
//         let yoyo;
        
//         const data = await page.evaluate(() => {
//             const name = " "

        
//             const followerCount = document.querySelector(
//                 "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(2) > div > button > span > span"
//             );

//             const followingCount = document.querySelector(
//                 "section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(3) > div > button > span > span"
//             );
//             yo= followerCount;
//             yoyo = followingCount;
//             return {
//                 // name: nameElement ? nameElement.innerText.trim() : "Name not found",
//                 name:  "Name not found",
//                 followerCount: followerCount ? followerCount.innerText.trim() : "Followers not found",
//                 followingCount: followingCount ? followingCount.innerText.trim() : "Following not found",
//             };
//         });
//         console.log("following count :" , yoyo)
//         console.log("followers count :" , yo)
//         // Return the scraped data
//         // return {
//         //     name,
//         //     followerCount,
//         //     followingCount
//         // };
//         console.log(data);
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
        // Go to the Instagram URL and wait for the page to load
        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

        const data = await page.evaluate(() => {
            // Name of the Instagram user (can be updated with actual selector)
            const nameElement = document.querySelector("h2"); 
            const name = nameElement ? nameElement.innerText.trim() : "Name not found";

            // Follower count
            const followerElement = document.querySelector("section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(2) > div > button > span > span");
            const followerCount = followerElement ? followerElement.innerText.trim() : "Followers not found";

            // Following count
            const followingElement = document.querySelector("section > main > div > header > section > div:nth-child(2) > ul > li:nth-child(3) > div > button > span > span");
            const followingCount = followingElement ? followingElement.innerText.trim() : "Following not found";

            return {
                name,
                followerCount,
                followingCount
            };
        });

        // Return the scraped data
        return data;

    } catch (error) {
        console.error("Error while extracting data:", error);
        throw error;
    } finally {
        await browser.close();
    }
};

module.exports = scrapeInstagramData;
