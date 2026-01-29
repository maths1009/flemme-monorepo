import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
