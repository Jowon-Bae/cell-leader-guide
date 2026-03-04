const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log('PAGE ERROR LOG:', msg.text());
            }
        });
        
        page.on('pageerror', error => {
            console.log('UNCAUGHT PAGE ERROR:', error.message);
        });

        await page.goto('https://jowon-bae.github.io/cell-leader-guide/app/', { waitUntil: 'networkidle0', timeout: 30000 });
        console.log('Page loaded successfully. Check errors above.');
        await browser.close();
    } catch (e) {
        console.log('Script execution failed:', e);
    }
})();
