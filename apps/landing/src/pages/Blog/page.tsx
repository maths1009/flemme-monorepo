import { BLOG_POSTS } from '@/data/blog-posts';
import { BlogCard } from './components/BlogCard';

export function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-24 pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-5xl font-black text-slate-900 md:text-7xl">
            Le Blog de la <span className="text-brand-yellow">Flemme</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Conseils, astuces et philosophie de vie pour ceux qui ont compris que moins, c'est mieux.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
