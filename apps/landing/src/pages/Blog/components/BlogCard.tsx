import { Link } from '@tanstack/react-router';
import { Avatar } from '@/components/Avatar';
import { Tag } from '@/components/Tag';
import type { BlogPost } from '@/data/blog-posts';
import { calculateReadTime, formatDate } from '@/utils/date';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-1 border-2 border-black"
      params={{ slug: post.slug }}
      to="/blog/$slug"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={post.coverImage}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {post.tags.map(tag => (
            <Tag intent="muted" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
        <h3 className="mb-2 font-serif text-2xl font-bold leading-tight text-slate-900 group-hover:text-brand-blue transition-colors">
          {post.title}
        </h3>
        <p className="mb-6 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 pt-6 border-t border-slate-100">
          <Avatar alt={post.author.name} className="bg-slate-100" size="sm" src={post.author.avatar} />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">{post.author.name}</span>
            <span className="text-xs text-slate-500">{formatDate(post.publishedAt)}</span>
          </div>
          <span className="ml-auto text-xs font-medium text-slate-500">{calculateReadTime(post.content)}</span>
        </div>
      </div>
    </Link>
  );
}
