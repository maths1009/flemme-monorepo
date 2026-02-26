export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://flemme.life';
}

interface MetaParams {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  noIndex?: boolean;
}

export function generateMeta({
  title = 'Flemme | La productivité décomplexée',
  description = 'Flemme est la méthode ultime pour être productif sans se fatiguer.',
  image,
  type = 'website',
  noIndex = !import.meta.env.PROD,
}: MetaParams = {}) {
  const baseUrl = getBaseUrl();
  const imageUrl = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/og-image.jpg`;

  const meta = [
    { content: title, name: 'title' },
    { content: description, name: 'description' },
    { content: type, property: 'og:type' },
    { content: title, property: 'og:title' },
    { content: description, property: 'og:description' },
    { content: imageUrl, property: 'og:image' },
    { content: 'summary_large_image', name: 'twitter:card' },
    { attributes: { href: baseUrl, rel: 'canonical' }, tagName: 'link' },
  ];

  if (noIndex) {
    meta.push({ content: 'noindex, nofollow', name: 'robots' });
  }

  return meta;
}
