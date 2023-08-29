import puppeteer from 'puppeteer-core';
import { conn, logger } from '#config';
import { ActionManager } from '#src/actions/ActionManager';

(async () => {
  const db = conn;

  try {
    let bot_loop = true;
    const headlessArg = process.argv.slice(2)[0];
    const headless = headlessArg ? headlessArg !== 'false' : true;

    const browser = await puppeteer.launch({ headless: headless, executablePath: "/usr/bin/google-chrome", args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'] });
    //const browser = await puppeteer.launch({ headless: headless, executablePath: "/home/marco/.cache/puppeteer/chrome/linux-1108766/chrome-linux/chrome" });
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