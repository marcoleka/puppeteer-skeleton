import puppeteer from 'puppeteer-core';
import { conn, logger } from '#config';
import { ActionManager } from '#src/actions/ActionManager';

(async () => {
  const db = conn;

  try {
    let bot_loop = true;
    const browser = await puppeteer.launch({ headless: false, executablePath: "/home/marco/.cache/puppeteer/chrome/linux-1108766/chrome-linux/chrome" });
    const am = new ActionManager(browser);

    while (bot_loop) {
      await am.init();
      bot_loop = false;
    }

    browser.close();
  } catch (error) {
    logger.error('Error:' + error);
  } finally {
    await db.end();
  }
})();



/*(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false, executablePath: "/home/marco/.cache/puppeteer/chrome/linux-1108766/chrome-linux/chrome" });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://webscraper.io/test-sites/e-commerce/static');

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Wait and click on first result
  const searchResultSelector = '::-p-xpath(/html/body/div[1]/div[2]/div/div/div/h1)';
  const textSelector = await page.waitForSelector(searchResultSelector);

  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();

})();*/