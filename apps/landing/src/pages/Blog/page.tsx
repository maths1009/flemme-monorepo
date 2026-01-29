import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';
import { Button } from '@/components/Button';
import { BLOG_POSTS } from '@/data/blog-posts';
import { BlogCard } from './components/BlogCard';
import { FilterBar } from './components/FilterBar';

const POSTS_PER_PAGE = 6;

export function BlogPage() {
  const [selectedTag, setSelectedTag] = useQueryState('tag');
  const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString.withDefault(''));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const allTags = useMemo(() => {
    const uniqueTags = new Set(BLOG_POSTS.flatMap(post => post.tags));
    return Array.from(uniqueTags).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [selectedTag, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query || null);
    setPage(1);
  };

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-24 pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-5xl font-black text-slate-900 md:text-7xl">
            Le Blog de la <span className="text-brand-blue">Flemme</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Conseils, astuces et philosophie de vie pour ceux qui ont compris que moins, c'est mieux.
          </p>
        </div>

        {BLOG_POSTS.length > 0 && (
          <FilterBar
            onSearchChange={handleSearchChange}
            onSelectedTagChange={handleTagChange}
            searchQuery={searchQuery}
            selectedTag={selectedTag}
          >
            <FilterBar.Search placeholder="Rechercher un article..." />
            <FilterBar.Tags tags={allTags} />
          </FilterBar>
        )}

        {BLOG_POSTS.length === 0 ? (
          <div className="relative mx-auto mt-20 max-w-2xl">
            <div className="absolute -top-6 -right-6 rotate-12 transform">
              <div className="bg-brand-yellow border-4 border-black px-6 py-2 font-black uppercase tracking-widest text-lg shadow-[8px_8px_0px_#000]">
                Bientôt !
              </div>
            </div>
            <div className="border-4 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_#000]">
              <div className="mb-6 text-6xl">🧘‍♂️</div>
              <h3 className="mb-4 font-serif text-3xl font-black md:text-5xl uppercase tracking-tighter">
                En pleine <span className="text-brand-blue">réflexion</span>
              </h3>
              <p className="text-xl leading-relaxed text-slate-600">
                On est en train de préparer des articles incroyables (quand on aura fini de procrastiner). Revenez d'ici
                quelques jours pour découvrir nos meilleures astuces !
              </p>
            </div>
          </div>
        ) : paginatedPosts.length > 0 ? (
          <>
            <div className="grid gap-8 mb-12 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <Button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, (p ?? 1) - 1))} variant="default">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>
                <span className="text-sm font-medium text-slate-600">
                  Page {page} sur {totalPages}
                </span>
                <Button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, (p ?? 1) + 1))}
                  variant="default"
                >
                  Suivant
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-4xl">🤔</div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">Aucun article trouvé</h3>
            <p className="text-slate-500">Essayez une autre recherche ou détendez-vous, ça viendra.</p>
            <button
              className="mt-6 font-medium text-brand-orange hover:underline"
              onClick={() => {
                setSelectedTag(null);
                setSearchQuery('');
                setPage(1);
              }}
              type="button"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
