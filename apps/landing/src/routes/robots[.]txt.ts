import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: ({ request }) => {
        const rules = import.meta.env.PROD
          ? ['User-agent: *', 'Allow: /', `Sitemap: ${new URL(request.url).origin}/sitemap.xml`]
          : ['User-agent: *', 'Disallow: /'];

        return new Response(rules.join('\n'), {
          headers: { 'Content-Type': 'text/plain' },
        });
      },
    },
  },
});
