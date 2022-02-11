var assert = require('assert');
const path = require('path');
const async = require("async");

function resolve(dir) {
    return path.join(__dirname, dir);
}

const handle = require(resolve('utils/handle.js'));

async function login() {
    return new Promise(async (resolve, reject) => {
        try {
            await handle.goto('http://inv.lmrone.top');
            const userSelector = '.login_form .el-form-item input';
            const pwdSelector = '.login_form > div:nth-child(3)   input';
            const btnSelector = '.login_form > div.el-form-item.btn  button';

            await handle.inputText(userSelector, 'admin')
            await handle.inputText(pwdSelector, 'lmrlmr', {delay: 100})

            const btn = await handle.findElement(btnSelector);
            if (btn) {
                btn.click();
            }
            setTimeout(() => {
                resolve()
            }, 3000)
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}

describe('Array', function () {
    describe('#indexOf()', async function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
        it('login action', async function () {
            await login();
            await handle.screenshot('1');
        });

        it('get menuItem length', async function () {
            await visitPages();
        })
    });
});


async function visitPages() {
    console.log('visitPages start:')
    const elms = await handle.findElements('.el-menu-item:not(.is-active)', true);
    console.log('elements', elms)
    let p = []
    // 循环访问每个页面(类似爬虫抓取数据)
    // 点击”display:none“的元素 click无法生效,需要用原生的dom的点击时间
    // 打开一个页面抓取，
    for (let i = 0; i < elms.length; i++) {
        setTimeout(async () => {
            const item = elms[i];
            console.log('i:', i)
            try {
                item.click();
            } catch (err) {
                console.error('element click err:', err)
            }
            // await handle.clickNav(item)
        }, i * 3000)
    }
    // console.log('p；', p)
    // await Promise.all(p)
}


