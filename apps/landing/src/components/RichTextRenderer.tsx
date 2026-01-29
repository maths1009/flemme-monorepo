export function RichTextRenderer({ content }: { content: string }) {
  return (
    <div
      className="
        prose 
        prose-lg 
        prose-slate 
        max-w-none
        
        /* Headings */
        prose-headings:font-serif 
        prose-headings:font-black 
        prose-headings:text-slate-900 
        prose-h2:text-3xl 
        prose-h2:mt-12 
        prose-h2:mb-6
        md:prose-h2:text-4xl
        prose-h3:text-2xl 
        prose-h3:mt-8 
        prose-h3:mb-4
        
        /* Paragraphs */
        prose-p:text-slate-600 
        prose-p:leading-relaxed 
        prose-p:mb-6
        
        /* Links */
        prose-a:text-brand-yellow 
        prose-a:no-underline 
        prose-a:border-b-2 
        prose-a:border-brand-yellow/30 
        hover:prose-a:border-brand-yellow 
        prose-a:transition-colors
        
        /* Blockquotes */
        prose-blockquote:border-l-4 
        prose-blockquote:border-brand-yellow 
        prose-blockquote:bg-slate-50 
        prose-blockquote:px-6 
        prose-blockquote:py-4 
        prose-blockquote:rounded-r-lg
        prose-blockquote:not-italic 
        prose-blockquote:font-serif 
        prose-blockquote:text-xl 
        prose-blockquote:text-slate-800
        
        /* Images */
        prose-img:rounded-2xl 
        prose-img:shadow-lg 
        prose-img:my-10
        
        /* Mobile Adjustments */
        prose:text-base 
        md:prose:text-lg
      "
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Blog content is trusted
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
