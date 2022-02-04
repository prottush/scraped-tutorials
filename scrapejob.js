// const redis = require("redis");
// const { json } = require("express");
// const request = require('request');
// const cjson = require('compressed-json');
// const puppeteer = require(`puppeteer-extra`);
// const pluginStealth = require(`puppeteer-extra-plugin-stealth`)(); // https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth
// const cheerio = require("cheerio");
// pluginStealth.enabledEvasions.delete(`chrome.runtime`);
// pluginStealth.enabledEvasions.delete(`iframe.contentWindow`);
// // console.log(pluginStealth.availableEvasions);
// // puppeteer-extra is a drop-in replacement for puppeteer,
// // it augments the installed puppeteer with plugin functionality

// // add stealth plugin and use defaults (all evasion techniques)
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// puppeteer.use(StealthPlugin());

// const teamPlays = [];

// const urls = [
//     "https://www.nba.com/stats/teams/transition/?sort=TEAM_NAME&dir=-1",
//     "https://www.nba.com/stats/teams/isolation/?sort=TEAM_NAME&dir=-1",
//     "https://www.nba.com/stats/teams/ball-handler/?sort=TEAM_NAME&dir=-1",
//     "https://www.nba.com/stats/teams/roll-man/?sort=TEAM_NAME&dir=-1",
//     "https://www.nba.com/stats/teams/playtype-post-up/?sort=TEAM_NAME&dir=-1",
//     "https://www.nba.com/stats/teams/spot-up/?sort=TEAM_NAME&dir=-1",
//     "https://www.nba.com/stats/teams/hand-off/?sort=TEAM_NAME&dir=-1",
//     "https://www.nba.com/stats/teams/cut/?sort=TEAM_NAME&dir=-1",
//     "https://www.nba.com/stats/teams/off-screen/?sort=TEAM_NAME&dir=-1",
//     "https://www.nba.com/stats/teams/putbacks/?sort=TEAM_NAME&dir=-1",
//     "https://www.nba.com/stats/teams/playtype-misc/?sort=TEAM_NAME&dir=-1",
// ];
// const namesSet = false;

// // puppeteer usage as normal


// const scrapePBPTOT = async (data) => {
//     const client = redis.createClient({
//         url: "redis://:p1aec2448c6cc8395f111ebaefbd5e52d9f19ed4fb6af0d09d44e2b93271090ee@ec2-54-147-216-178.compute-1.amazonaws.com:19739",
//         socket: {
//             tls: true,
//             rejectUnauthorized: false,
//         },
//     });

//     client.on("error", (err) => console.log("Redis Client Error", err));
//     await client.connect();

    
            
            
//             const compressedString = cjson.compress.toString(data);
//             console.log(compressedString);
//             await client.set("teamPlayType", compressedString);

//             await client.quit();
//             return newJ;
      
// };

// puppeteer
//     .launch({
//         // headless: false,
//         headless: true,

//         devtools: false,
//         // devtools: true,

//         timeout: 60000,
//         slowMo: 0,

//         ignoreHTTPSErrors: true,

//         defaultViewport: null,

//         pipe: false,
//         dumpio: false,

//         handleSIGINT: true,
//         handleSIGTERM: true,
//         handleSIGHUP: true,

//         args: [
//             // chrome://gpu
//             // `--single-process`,

//             `--no-zygote`,
//             `--no-sandbox`,
//             `--disable-setuid-sandbox`,
//             `--disable-web-security`,
//             `--ignore-certifcate-errors`,
//             `--ignore-certifcate-errors-spki-list`,
//             `--disable-features=IsolateOrigins,site-per-process`,
//             `--disable-site-isolation-trials`,

//             `--disable-blink-features`,
//             `--disable-blink-features=AutomationControlled`,

//             `--no-default-browser-check`,
//             `--no-first-run`,
//             `--disable-infobars`,
//             `--disable-notifications`,
//             `--disable-desktop-notifications`,
//             `--hide-scrollbars`,
//             `--mute-audio`,

//             `--window-position=0,0`,
//             `--window-size=1920,1080`,

//             `--font-render-hinting=none`,
//             `--disable-gpu`,
//             `--disable-gpu-sandbox`,
//             `--disable-dev-shm-usage`,
//             `--disable-software-rasterizer`,
//             `--enable-low-res-tiling`,
//             `--disable-accelerated-2d-canvas`,
//             `--disable-canvas-aa`,
//             `--disable-2d-canvas-clip-aa`,
//             `--disable-gl-drawing-for-tests`,

//             // `--kiosk`,

//             `--disable-background-timer-throttling`,
//             `--disable-backgrounding-occluded-windows`,
//             `--disable-breakpad`,
//             `--disable-client-side-phishing-detection`,
//             `--disable-component-extensions-with-background-pages`,
//             `--disable-default-apps`,
//             `--disable-dev-shm-usage`,
//             `--disable-extensions`,
//             `--disable-features=TranslateUI`,
//             `--disable-hang-monitor`,
//             `--disable-ipc-flooding-protection`,
//             `--disable-popup-blocking`,
//             `--disable-prompt-on-repost`,
//             `--disable-renderer-backgrounding`,
//             `--disable-sync`,
//             `--force-color-profile=srgb`,
//             `--metrics-recording-only`,

//             `--disable-webgl`,
//             `--disable-webgl2`,
//             `--disable-gpu-compositing`,
//         ],

//         ignoreDefaultArgs: [`--enable-automation`],
//     })
//     .then(async (browser) => {
//         console.log("Running tests..");
//         let page = await browser.newPage();
//         await page.setViewport({
//             width: 1920 - 0,
//             height: 1080 - 74,
//         });
//         const override = {
//             userAgent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36`,
//             acceptLanguage: `en-US,en;q=0.9`,
//             platform: `Win32`,
//         };
//         for (let j = 0; j < urls.length; j++) {
//             const pt = urls[j].split("teams/")[1].split("/")[0].replace("-", "_").replace("-", "_");
            
//             await page._client.send(`Network.setUserAgentOverride`, override);

//             await page.goto(urls[j]);

//             await page.waitForSelector(".nba-stat-table", { timeout: 10000 });

//             const bodyO = await page.evaluate(() => {
//                 return document.querySelector(".nba-stat-table__overflow").innerHTML;
//             });

//             const $ = cheerio.load(bodyO);

//             // '<!DOCTYPE html><p>Bye moon</p>'

//             $("tr").each(function (index, element) {
//                 const teamValues = {};
//                 var colSize = $(element).find("td").length;
//                 const main = index - 1;
//                 if (index !== 0) {
//                     $(element)
//                         .find("td")
//                         .each(function (index2, element) {
//                             var colVal = $(element).text();
//                             if (index2 === 0 && teamPlays.length < 30) {
//                                 teamPlays.push({ name: colVal.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, "") });
//                             }
//                             if (index2 === 3) {
//                                 teamPlays[main][pt + "Freq"] = colVal;
//                             }
//                             if (index2 === 15) {
//                                 teamPlays[main][pt + "Perc"] = colVal;
//                             }
//                         });
//                 }
//             });
//             console.log(teamPlays);
//             if (j === urls.length-1) {
//                 scrapePBPTOT(teamPlays);
//             }
//         }
//     });
// console.log(teamPlays);
