import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '@/pages/404/page';

export const Route = createFileRoute('/404')({
  component: NotFound,
});
