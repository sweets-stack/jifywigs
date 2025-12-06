// server/src/services/SeoService.ts
import fs from 'fs';
import path from 'path';
import { Product } from '../schemas/Product';
import { Service } from '../schemas/Service';
import { Training } from '../schemas/Training';

export class SeoService {
  static async generateSitemap() {
    const baseUrl = process.env.APP_URL || 'https://jifywigs.com';
    const timestamp = new Date().toISOString();

    const products = await Product.find({}).select('slug updatedAt');
    const services = await Service.find({ isActive: true }).select('slug updatedAt');
    const trainings = await Training.find({ status: 'published' }).select('slug updatedAt');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/shop</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/training</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  ${products
    .map(
      (p) => `
  <url>
    <loc>${baseUrl}/shop/${p.slug}</loc>
    <lastmod>${p.updatedAt?.toISOString() || timestamp}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}

  ${services
    .map(
      (s) => `
  <url>
    <loc>${baseUrl}/services/${s.slug}</loc>
    <lastmod>${s.updatedAt?.toISOString() || timestamp}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}

  ${trainings
    .map(
      (t) => `
  <url>
    <loc>${baseUrl}/training/${t.slug}</loc>
    <lastmod>${t.updatedAt?.toISOString() || timestamp}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  }

  static generateRobotsTxt() {
    const robots = `User-agent: *
Allow: /

Sitemap: ${process.env.APP_URL}/sitemap.xml`;
    fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), robots);
  }
}