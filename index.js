const puppeteer = require('puppeteer');
// const http = require('http')
var async = require("async");
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.zhuzi.com.cn');
    // await page.screenshot({path: 'example_' + Date.now() + '.png'});
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio,
        };
    });
    console.log('Dimensions:', dimensions);
    await browser.close();
})();

//
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'})
//     res.end('hello world')
// }).listen(8081)
//
// console.log('server test')



