import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Container';
import { RichTextRenderer } from '@/components/RichTextRenderer';
import { Tag } from '@/components/Tag';
import type { BlogPost } from '@/data/blog-posts';
import { calculateReadTime, formatDate } from '@/utils/date';

export function ModernCleanTemplate(post: BlogPost) {
  return (
    <article className="min-h-screen bg-white text-slate-900 pt-24 md:pt-32 pb-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center mb-8 md:mb-12">
          <div className="mb-4 md:mb-6 flex flex-wrap justify-center gap-2">
            {post.tags.map((tag: string) => (
              <Tag intent="primary" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
          <h1 className="mb-6 md:mb-8 font-serif text-4xl font-black leading-tight text-slate-900 md:text-6xl lg:text-7xl">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-3 md:gap-4">
            <Avatar alt={post.author.name} className="border border-slate-200" size="md" src={post.author.avatar} />
            <div className="flex flex-col text-left">
              <span className="font-bold text-base md:text-lg text-slate-900">{post.author.name}</span>
              <span className="text-slate-500 text-xs md:text-sm">
                {formatDate(post.publishedAt)} • {calculateReadTime(post.content)} de lecture
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl mb-12 md:mb-16">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl">
            <img
              alt={post.title}
              className="h-full w-full object-cover"
              fetchPriority="high"
              loading="eager"
              src={post.coverImage}
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <RichTextRenderer content={post.content} />
        </div>
      </Container>
    </article>
  );
}
