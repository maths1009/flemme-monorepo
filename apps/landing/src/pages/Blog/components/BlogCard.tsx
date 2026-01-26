import { Link } from '@tanstack/react-router';
import type { BlogPost } from '@/data/blog-posts';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#1a1a1a] transition-all hover:-translate-y-1 hover:shadow-2xl"
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
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
              key={tag}
            >
              {tag}
            </span>
          ))}
          <span className="text-xs font-medium text-white/40">• {post.readTime}</span>
        </div>
        <h3 className="mb-2 font-serif text-2xl font-bold leading-tight text-white group-hover:text-brand-yellow transition-colors">
          {post.title}
        </h3>
        <p className="mb-6 line-clamp-3 text-sm text-white/60">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 pt-6 border-t border-white/10">
          <img
            alt={post.author.name}
            className="h-8 w-8 rounded-full bg-white/10 object-cover"
            src={post.author.avatar}
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">{post.author.name}</span>
            <span className="text-xs text-white/40">
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
