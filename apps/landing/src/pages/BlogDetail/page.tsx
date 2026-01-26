import type { BlogPost } from '@/data/blog-posts';

interface BlogDetailPageProps {
  post: BlogPost;
}

export function BlogDetailPage({ post }: BlogDetailPageProps) {
  return (
    <article className="min-h-screen bg-black text-white">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        <img alt={post.title} className="h-full w-full object-cover" src={post.coverImage} />
        <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-12">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  className="bg-brand-yellow text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mb-6 font-serif text-4xl font-black leading-tight md:text-6xl lg:text-7xl">{post.title}</h1>
            <div className="flex items-center gap-4">
              <img
                alt={post.author.name}
                className="h-12 w-12 rounded-full border-2 border-white/20"
                src={post.author.avatar}
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg">{post.author.name}</span>
                <span className="text-white/60 text-sm">
                  {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}{' '}
                  • {post.readTime} de lecture
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div
            className="prose prose-lg prose-invert prose-headings:font-serif prose-headings:font-bold prose-a:text-brand-yellow hover:prose-a:text-brand-yellow/80 prose-img:rounded-xl"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: because we are using blog markdown content
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </article>
  );
}
