import { createFileRoute, redirect } from '@tanstack/react-router';
import { BLOG_POSTS } from '@/data/blog-posts';
import { BlogDetailPage } from '@/pages/BlogDetail/page';
import { getBlogPostSchema } from '@/utils/schema';
import { generateMeta } from '@/utils/seo';

// biome-ignore assist/source/useSortedKeys: because loader call before component and head
export const Route = createFileRoute('/_layout/blog/$slug')({
  loader: ({ params }) => {
    const post = BLOG_POSTS.find(p => p.slug === params.slug);
    if (!post) throw redirect({ to: '/404' });

    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const schemaOrgJSONLD = getBlogPostSchema(post);

    return {
      meta: generateMeta({
        description: post.excerpt,
        image: post.coverImage,
        title: `${post.title} | Flemme`,
        type: 'article',
      }).concat([
        { content: post.tags.join(', '), name: 'keywords' },
        { content: 'summary_large_image', name: 'twitter:card' },
      ]),
      scripts: [
        {
          children: JSON.stringify(schemaOrgJSONLD),
          type: 'application/ld+json',
        },
      ],
    };
  },
  component: BlogPostWrapper,
});

function BlogPostWrapper() {
  const { post } = Route.useLoaderData();
  return <BlogDetailPage post={post} />;
}
