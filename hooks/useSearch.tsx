// hooks/useSearch.tsx (CÓDIGO CORRIGIDO - FINAL)
'use client';
import { create } from 'zustand';

interface SearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  // NOVO: Estado para a visibilidade mobile
  isMobileSearchVisible: boolean;
  setIsMobileSearchVisible: (visible: boolean) => void;
}

const useSearch = create<SearchState>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  // NOVO: Inicialização do estado mobile
  isMobileSearchVisible: false,
  setIsMobileSearchVisible: (visible) => set({ isMobileSearchVisible: visible }),
}));

export default useSearch;