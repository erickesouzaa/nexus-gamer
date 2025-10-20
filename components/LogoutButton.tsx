// components/LogoutButton.tsx
'use client'; 
import { logout } from '@/utils/authActions'; // Importa a ação de logout (que vamos criar)

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button 
        type="submit" 
        className="text-red-400 hover:text-red-300 font-medium transition duration-150"
      >
        Sair (Logout)
      </button>
    </form>
  );
}