import { Link } from '@tanstack/react-router';
import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Container';
import { RichTextRenderer } from '@/components/RichTextRenderer';
import { Tag } from '@/components/Tag';
import type { BlogPost } from '@/data/blog-posts';
import { calculateReadTime, formatDate } from '@/utils/date';
import { getFullName, getSlug } from '@/utils/users';

export function VisualImmersiveTemplate(post: BlogPost) {
  return (
    <article className="min-h-screen bg-slate-50 text-slate-900 pt-20 md:pt-24 pb-24">
      <Container className="mb-12 md:mb-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[60vh]">
          <div className="flex flex-col justify-center order-2 lg:order-1 w-full">
            <div className="mb-4 md:mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Tag intent="secondary" key={tag}>
                  {tag}
                </Tag>
              ))}
            </div>

            <h1 className="mb-6 md:mb-8 font-serif text-4xl md:text-5xl font-black leading-tight text-slate-900 lg:text-7xl">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-6 md:mb-8 font-medium leading-relaxed">{post.excerpt}</p>

            <div className="flex items-center gap-4 border-t border-slate-200 pt-6 md:pt-8 w-fit">
              <Link
                className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                params={{ slug: getSlug(post.author) }}
                to="/team/$slug"
              >
                <Avatar
                  alt={getFullName(post.author)}
                  className="border-2 border-white shadow-sm"
                  size="lg"
                  src={post.author.avatar}
                />
                <div className="flex flex-col">
                  <span className="font-bold text-base md:text-lg text-slate-900">{getFullName(post.author)}</span>
                  <span className="text-slate-500 text-xs md:text-sm">
                    {formatDate(post.publishedAt)} • {calculateReadTime(post.content)} de lecture
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="h-[40vh] md:h-[50vh] w-full relative order-1 lg:order-2">
            <div className="hidden lg:block absolute inset-0 bg-brand-yellow rounded-[2rem] rotate-3 opacity-20 transform translate-x-4 translate-y-4" />
            <div className="hidden lg:block absolute inset-0 bg-slate-900 rounded-[2rem] -rotate-2 opacity-10 transform -translate-x-2 -translate-y-2" />
            <div className="h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.01]">
              <img
                alt={post.title}
                className="h-full w-full object-cover"
                fetchPriority="high"
                loading="eager"
                src={post.coverImage}
              />
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="mx-auto max-w-3xl bg-white p-6 md:p-12 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
          <RichTextRenderer content={post.content} />
        </div>
      </Container>
    </article>
  );
}
