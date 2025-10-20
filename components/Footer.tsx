// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 border-t border-nexus-blue/50 p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

        {/* Informação Principal */}
        <div className="text-center md:text-left">
          <Link href="/" className="text-3xl font-extrabold text-nexus-primary hover:text-white transition duration-150">
            NEXUS
          </Link>
          <p className="text-sm mt-2">© {year} NEXUS Gamer. Todos os direitos reservados.</p>
          <p className="text-xs mt-1 text-gray-600">Desenvolvimento com Next.js & Supabase.</p>
        </div>

        {/* Links Rápidos */}
        <div className="flex space-x-6 text-sm">
          <Link href="/minha-conta" className="hover:text-nexus-blue transition duration-150">
            Minha Conta
          </Link>
          <Link href="/politica" className="hover:text-nexus-blue transition duration-150">
            Política de Privacidade
          </Link>
          <Link href="mailto:contato@nexusgamer.com" className="hover:text-nexus-blue transition duration-150">
            Contato
          </Link>
        </div>

        {/* Redes Sociais/Slogans */}
        <div className="text-right">
          <p className="text-nexus-secondary font-bold text-lg">
            Seu Próximo Upgrade Digital.
          </p>
        </div>

      </div>
    </footer>
  );
}