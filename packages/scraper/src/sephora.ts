import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import { prisma } from '@layers/db';
import { inferTags } from '@layers/core';

async function scrapeSephoraProduct(productUrl: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(productUrl, { waitUntil: 'domcontentloaded' });
  const $ = cheerio.load(await page.content());

  const name = $('h1').first().text().trim();
  const brand =
    $('[data-at="brand_name"]').text().trim() ||
    $('[data-comp="BrandName"]').text().trim() || 'Unknown';
  const priceTxt = $('[data-at="price"]').first().text();
  const price = parseFloat(priceTxt.replace(/[^0-9.]/g,'') || '0');
  const imageUrl = $('img').first().attr('src') ?? null;
  const ingredients =
    $('*:contains("Ingredients")').last().next().text().trim() ||
    $('section:contains("Ingredients")').text().trim() || null;

  const tags = inferTags(ingredients, name);

  await prisma.product.upsert({
    where: { source_sourceId: { source: 'sephora', sourceId: productUrl } },
    update: { brand, name, price: isFinite(price)?price:null, imageUrl, productUrl, ingredients, tags },
    create: { source:'sephora', sourceId: productUrl, brand, name, price: isFinite(price)?price:null, imageUrl, productUrl, ingredients, tags }
  });

  await browser.close();
}

if (process.argv[2]) scrapeSephoraProduct(process.argv[2]).then(()=>console.log('Saved'));
else console.error('Usage: pnpm --filter @layers/scraper sephora <productUrl>');
