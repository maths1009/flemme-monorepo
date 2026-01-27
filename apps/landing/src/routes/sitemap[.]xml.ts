import { createFileRoute } from '@tanstack/react-router';
import { BLOG_POSTS } from '@/data/blog-posts';

type SitemapRoute = {
  path: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
};

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: ({ request }) => {
        const baseUrl = new URL(request.url).origin;

        const routes: SitemapRoute[] = [
          { changefreq: 'daily', path: '/', priority: '1.0' },
          { changefreq: 'weekly', path: '/blog', priority: '0.8' },
          ...BLOG_POSTS.map(p => ({
            changefreq: 'monthly',
            lastmod: p.publishedAt,
            path: `/blog/${p.slug}`,
            priority: '0.6',
          })),
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${routes
            .map(
              r => `
            <url>
              <loc>${baseUrl}${r.path}</loc>
              <priority>${r.priority}</priority>
              <changefreq>${r.changefreq}</changefreq>${r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : ''}
            </url>`,
            )
            .join('')}
        </urlset>`;

        return new Response(sitemap, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});
