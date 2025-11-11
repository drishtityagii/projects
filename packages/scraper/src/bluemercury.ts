import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import { prisma } from '@layers/db';
import { inferTags } from '@layers/core';

async function scrapeBM(productUrl: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(productUrl, { waitUntil: 'domcontentloaded' });
  const $ = cheerio.load(await page.content());

  const name = $('h1, .product-title').first().text().trim();
  const brand = $('.product-vendor, [data-test="brand-name"]').first().text().trim() || 'Unknown';
  const priceTxt = $('[data-test="product-price"], .price').first().text();
  const price = parseFloat(priceTxt.replace(/[^0-9.]/g,'') || '0');
  const imageUrl = $('img[src*="cdn"], .product-gallery img').first().attr('src') ?? null;

  // Ingredients are often under tabs or accordion
  const ingredients =
    $('*:contains("Ingredients")').last().closest('div,section,li').next().text().trim()
    || $('div:contains("Ingredients")').next().text().trim()
    || null;

  const tags = inferTags(ingredients, name);

  await prisma.product.upsert({
    where: { source_sourceId: { source: 'bluemercury', sourceId: productUrl } },
    update: { brand, name, price: isFinite(price)?price:null, imageUrl, productUrl, ingredients, tags },
    create: { source:'bluemercury', sourceId: productUrl, brand, name, price: isFinite(price)?price:null, imageUrl, productUrl, ingredients, tags }
  });

  await browser.close();
}

if (process.argv[2]) scrapeBM(process.argv[2]).then(()=>console.log('Saved'));
else console.error('Usage: pnpm --filter @layers/scraper bluemercury <productUrl>');
