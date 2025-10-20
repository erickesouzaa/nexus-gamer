// hooks/useSearch.tsx
'use client';
import { create } from 'zustand'; // Instale: npm install zustand

interface SearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const useSearch = create<SearchState>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useSearch;