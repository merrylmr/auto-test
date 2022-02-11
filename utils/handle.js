const async = require("async");
const puppeteer = require('puppeteer');

let browser = null
let page = null
const dir = 'img/'


module.exports = {
    goto: async function (url) {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
        await page.goto(url);
    },
    // 获取元素
    findElement: async function (selector, timeout = 3000) {
        const dom = await page.$(selector)
        return dom
    },
    // 获取元素组
    findElements: async function (selector, native = false) {
        if (!native) {
            return await page.$$(selector)
        } else {
            const dom = await page.evaluate((x) => {
                return document.querySelectorAll(x)
            }, selector)
            console.log('dom:', dom);
            return dom
        }
    },
    // 点击某个元素
    click: async function (element, timeout = 3000) {
        element.click()
    },
    clickNav: async function (element) {
        await Promise.all([
            page.waitForNavigation(),
            element.click(),
        ]);
        // await page.screenshot({path: dir + Date.now() + '.png'})
    },
    // 输入框：输入内容
    inputText: async function (selector, text) {
        await page.type(selector, text);
    },
    // 生成截图
    screenshot: async function (path) {
        await page.screenshot({path: dir + path + '.png'})
    }
}
