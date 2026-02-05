import type { BlogPosting, FAQPage, Organization, Person, Review, WebSite, WithContext } from 'schema-dts';
import type { BlogPost } from '@/data/blog-posts';
import { FAQ_DATA } from '@/data/faq';
import { TESTIMONIALS_DATA } from '@/data/testimonials';
import { USERS } from '@/data/users';
import { getFullName } from '@/utils/users';
import { getBaseUrl } from './seo';

export function getLandingSchema(): Array<WithContext<Organization | WebSite | FAQPage | Review | Person>> {
  const baseUrl = getBaseUrl();

  const organizationSchema: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    logo: `${baseUrl}/logo.png`,
    name: 'Flemme',
    sameAs: ['https://twitter.com/flemme', 'https://instagram.com/flemme'],
    url: baseUrl,
  };

  const websiteSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Flemme',
    potentialAction: {
      '@type': 'SearchAction',
      // @ts-expect-error - Google requires query-input but it might be missing in schema-dts types
      'query-input': 'required name=search_term_string',
      target: `${baseUrl}/search?q={search_term_string}`,
    },
    url: baseUrl,
  };

  const faqSchema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map(faq => ({
      '@type': 'Question',
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
      name: faq.question,
    })),
  };

  const reviewSchema: WithContext<Review>[] = TESTIMONIALS_DATA.map(testimonial => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.name,
    },
    reviewBody: testimonial.review,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating,
    },
  }));

  const personSchema: WithContext<Person>[] = USERS.map(user => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    description: user.bio,
    image: user.avatar,
    jobTitle: user.role,
    name: getFullName(user),
  }));

  return [organizationSchema, websiteSchema, faqSchema, ...reviewSchema, ...personSchema];
}

export function getBlogPostSchema(post: BlogPost): WithContext<BlogPosting> {
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    author: {
      '@type': 'Person',
      name: `${post.author.firstName} ${post.author.lastName}`,
    },
    datePublished: post.publishedAt,
    description: post.excerpt,
    headline: post.title,
    image: post.coverImage.startsWith('http') ? post.coverImage : `${baseUrl}${post.coverImage}`,
    mainEntityOfPage: {
      '@id': `${baseUrl}/blog/${post.slug}`,
      '@type': 'WebPage',
    },
    publisher: {
      '@type': 'Organization',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
      name: 'Flemme',
    },
  };
}
