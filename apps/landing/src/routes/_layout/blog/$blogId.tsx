import { createFileRoute, redirect } from '@tanstack/react-router';
import { BLOG_POSTS } from '@/data/blog-posts';
import { BlogDetailPage } from '@/pages/BlogDetail/page';

// biome-ignore assist/source/useSortedKeys: because loader call before component and head
export const Route = createFileRoute('/_layout/blog/$blogId')({
  loader: ({ params }) => {
    const post = BLOG_POSTS.find(p => p.id === params.blogId);
    if (!post) {
      throw redirect({ to: '/404' });
    }
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const schemaOrgJSONLD = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      author: [
        {
          '@type': 'Person',
          name: post.author.name,
        },
      ],
      datePublished: post.publishedAt,
      headline: post.title,
      image: [post.coverImage],
    };

    return {
      meta: [
        { title: `${post.title} | Flemme` },
        { content: post.excerpt, name: 'description' },
        { content: post.title, property: 'og:title' },
        { content: post.excerpt, property: 'og:description' },
        { content: post.coverImage, property: 'og:image' },
        { content: 'article', property: 'og:type' },
        { content: 'summary_large_image', name: 'twitter:card' },
      ],
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
