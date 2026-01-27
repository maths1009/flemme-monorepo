import type { BlogPost } from '@/data/blog-posts';

interface BlogDetailPageProps {
  post: BlogPost;
}

export function BlogDetailPage({ post }: BlogDetailPageProps) {
  return (
    <article className="min-h-screen bg-white text-slate-900 pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center mb-12">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {post.tags.map((tag: string) => (
              <span
                className="bg-brand-yellow text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-8 font-serif text-4xl font-black leading-tight text-slate-900 md:text-6xl lg:text-7xl">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-4">
            <img
              alt={post.author.name}
              className="h-12 w-12 rounded-full border border-slate-200"
              src={post.author.avatar}
            />
            <div className="flex flex-col text-left">
              <span className="font-bold text-lg text-slate-900">{post.author.name}</span>
              <span className="text-slate-500 text-sm">
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

        {/* Hero Image */}
        <div className="mx-auto max-w-5xl mb-16 px-4">
          <div className="aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-2xl">
            <img alt={post.title} className="h-full w-full object-cover" src={post.coverImage} />
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto max-w-3xl">
          <div
            className="prose prose-lg prose-slate prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-brand-yellow hover:prose-a:text-brand-yellow/80 prose-img:rounded-xl"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: because we are using blog markdown content
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </article>
  );
}
