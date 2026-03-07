import Link from 'next/link';
import { User, Trophy, Home } from 'lucide-react';

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-md border-t border-white/10 p-4 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center text-zinc-500 hover:text-brand transition-colors">
          <Home size={20} />
          <span className="text-[10px] mt-1 font-black uppercase">Home</span>
        </Link>
        <Link href="/match/live" className="flex flex-col items-center text-brand">
          <div className="bg-brand text-black p-2 rounded-full -mt-8 shadow-[0_0_15px_rgba(204,255,0,0.5)]">
            <Trophy size={24} />
          </div>
          <span className="text-[10px] mt-1 font-black uppercase">Match</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-zinc-500 hover:text-brand transition-colors">
          <User size={20} />
          <span className="text-[10px] mt-1 font-black uppercase">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
