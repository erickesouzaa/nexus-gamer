// components/SearchBar.tsx
'use client';
import useSearch from '@/hooks/useSearch';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redireciona para o catálogo com o termo de busca
      router.push(`/produtos?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/produtos');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-grow max-w-lg hidden md:block">
      <div className="relative">
        <input
          type="text"
          placeholder="Digite o que você procura..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-nexus-accent rounded-full bg-gray-900 text-white placeholder-gray-500 focus:ring-nexus-primary focus:border-nexus-primary"
        />
        <button type="submit" className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-nexus-primary transition duration-150 rounded-r-full">
          {/* Ícone de Busca */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
    </form>
  );
}