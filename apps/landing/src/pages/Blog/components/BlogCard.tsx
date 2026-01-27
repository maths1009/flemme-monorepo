import { Link } from '@tanstack/react-router';
import type { BlogPost } from '@/data/blog-posts';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-1 hover:shadow-xl border border-slate-100"
      params={{ blogId: post.id }}
      to="/blog/$blogId"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={post.coverImage}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center gap-2">
          {post.tags.map(tag => (
            <span
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700"
              key={tag}
            >
              {tag}
            </span>
          ))}
          <span className="text-xs font-medium text-slate-500">• {post.readTime}</span>
        </div>
        <h3 className="mb-2 font-serif text-2xl font-bold leading-tight text-slate-900 group-hover:text-brand-yellow transition-colors">
          {post.title}
        </h3>
        <p className="mb-6 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 pt-6 border-t border-slate-100">
          <img
            alt={post.author.name}
            className="h-8 w-8 rounded-full bg-slate-100 object-cover"
            src={post.author.avatar}
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">{post.author.name}</span>
            <span className="text-xs text-slate-500">
              {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
