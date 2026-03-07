"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);

    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      // Redirect to profile to complete setup
      router.push('/profile');
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6 text-white uppercase font-black">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-5xl text-brand italic text-center">ACEPOINT</h1>
        
        <form onSubmit={handleAuth} className="space-y-4">
          {error && <p className="text-red-500 text-xs lowercase">{error}</p>}
          
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 border-b-2 border-brand p-4 outline-none focus:bg-zinc-800"
            required
          />
          
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border-b-2 border-brand p-4 outline-none focus:bg-zinc-800"
            required
          />

          <button type="submit" className="w-full bg-brand text-black p-4 font-bold hover:brightness-110">
            {isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>
        </form>

        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-zinc-500 text-sm hover:text-brand transition-colors"
        >
          {isSignUp ? 'ALREADY HAVE AN ACCOUNT? SIGN IN' : 'NEW PLAYER? CREATE ACCOUNT'}
        </button>
      </div>
    </main>
  );
}
