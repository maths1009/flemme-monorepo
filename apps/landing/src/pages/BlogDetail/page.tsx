import type { BlogPost } from '@/data/blog-posts';
import { ModernCleanTemplate } from './templates/ModernClean';
import { VisualImmersiveTemplate } from './templates/VisualImmersive';

interface BlogDetailPageProps {
  post: BlogPost;
}

export function BlogDetailPage({ post }: BlogDetailPageProps) {
  // Mock layout selection if not provided (default to modern-clean)
  const LayoutComponent = post.layout === 'visual-immersive' ? VisualImmersiveTemplate : ModernCleanTemplate;

  return <LayoutComponent {...post} />;
}
