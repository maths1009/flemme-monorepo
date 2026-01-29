import { createContext } from '@radix-ui/react-context';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { SearchIcon } from 'lucide-react';
import type React from 'react';
import { TextField } from '@/components/TextField';

interface FilterBarContextValue {
  selectedTag: string | null | undefined;
  setSelectedTag: (tag: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const [FilterBarProvider, useFilterBarContext] = createContext<FilterBarContextValue>('FilterBar');

interface FilterBarProps {
  children: React.ReactNode;
  selectedTag?: string | null;
  defaultSelectedTag?: string | null;
  onSelectedTagChange?: (tag: string | null) => void;
  searchQuery?: string;
  defaultSearchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function FilterBar({
  children,
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

  return (
    <FilterBarProvider
      searchQuery={searchQuery}
      selectedTag={selectedTag}
      setSearchQuery={setSearchQuery}
      setSelectedTag={setSelectedTag}
    >
      <div className="mb-12 flex flex-col gap-6">{children}</div>
    </FilterBarProvider>
  );
}

// Sub-components
FilterBar.Search = function FilterBarSearch({ placeholder = 'Rechercher...' }: { placeholder?: string }) {
  const { searchQuery, setSearchQuery } = useFilterBarContext('FilterBar.Search');

  return (
    <div className="mx-auto w-full max-w-lg">
      <TextField variant="default">
        <TextField.Slot>
          <SearchIcon className="h-5 w-5" />
        </TextField.Slot>
        <TextField.Input onChange={e => setSearchQuery(e.target.value)} placeholder={placeholder} value={searchQuery} />
      </TextField>
    </div>
  );
};

FilterBar.Tags = function FilterBarTags({ tags }: { tags: string[] }) {
  const { selectedTag, setSelectedTag } = useFilterBarContext('FilterBar.Tags');

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        className={`px-4 py-2 rounded-lg text-sm font-black uppercase tracking-wider transition-all border-2 border-black ${
          selectedTag === null || selectedTag === undefined
            ? 'bg-black text-white shadow-[4px_4px_0px_#fea3b2] -translate-y-0.5'
            : 'bg-white text-black hover:bg-slate-50 hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 shadow-none'
        }`}
        onClick={() => setSelectedTag(null)}
        type="button"
      >
        Tous
      </button>
      {tags.map(tag => (
        <button
          className={`px-4 py-2 rounded-lg text-sm font-black uppercase tracking-wider transition-all border-2 border-black capitalize ${
            selectedTag === tag
              ? 'bg-brand-yellow text-black shadow-[4px_4px_0px_#000] -translate-y-0.5'
              : 'bg-white text-black hover:bg-slate-50 hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 shadow-none'
          }`}
          key={tag}
          onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
          type="button"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
