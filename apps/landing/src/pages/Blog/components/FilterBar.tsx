import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { SearchIcon } from 'lucide-react';
import { TextField } from '@/components/TextField';

interface FilterBarProps {
  tags: string[];
  selectedTag?: string | null;
  defaultSelectedTag?: string | null;
  onSelectedTagChange?: (tag: string | null) => void;
  searchQuery?: string;
  defaultSearchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function FilterBar({
  tags,
  selectedTag: selectedTagProp,
  defaultSelectedTag = null,
  onSelectedTagChange,
  searchQuery: searchQueryProp,
  defaultSearchQuery = '',
  onSearchChange,
}: FilterBarProps) {
  const [selectedTag, setSelectedTag] = useControllableState<string | null>({
    defaultProp: defaultSelectedTag,
    onChange: onSelectedTagChange,
    prop: selectedTagProp,
  });

  const [searchQuery, setSearchQuery] = useControllableState<string>({
    defaultProp: defaultSearchQuery,
    onChange: onSearchChange,
    prop: searchQueryProp,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="mb-12 flex flex-col gap-6">
      {/* Search Input */}
      <div className="mx-auto w-full max-w-lg">
        <TextField variant="soft">
          <TextField.Slot>
            <SearchIcon className="h-5 w-5" />
          </TextField.Slot>
          <TextField.Input onChange={handleSearch} placeholder="Rechercher un article..." value={searchQuery} />
        </TextField>
      </div>

      {/* Tags Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedTag === null || selectedTag === undefined
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
          onClick={() => setSelectedTag(null)}
          type="button"
        >
          Tous
        </button>
        {tags.map(tag => (
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
              selectedTag === tag
                ? 'bg-brand-yellow text-slate-900 shadow-md transform scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
