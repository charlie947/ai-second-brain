#!/usr/bin/env node
process.env.PUPPETEER_SKIP_CHROME_DOWNLOAD = '1';
const puppeteer = require('/Users/charliehills/Desktop/infographic-generator/node_modules/puppeteer');
const path = require('path');

(async () => {
  const htmlPath = path.resolve(__dirname, 'social-preview.html');
  const outPath = path.resolve(__dirname, 'social-preview.png');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 640, deviceScaleFactor: 2 });
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const element = await page.$('.canvas');
  await element.screenshot({ path: outPath, omitBackground: false });

  await browser.close();
  console.log('Rendered:', outPath);
})();
