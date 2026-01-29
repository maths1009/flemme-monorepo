import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import './index.css';

export function createRouter() {
  const router = createTanStackRouter({
    defaultPreload: 'intent',
    routeTree,
    scrollRestoration: true,
  });

  return router;
}

// TanStack Start expects getRouter
export const getRouter = createRouter;

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
