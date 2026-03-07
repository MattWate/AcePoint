import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <h1 className="text-brand text-6xl font-black mb-8 italic">ACEPOINT</h1>
      <Link 
        href="/match/test-match"
        className="bg-brand text-black px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform"
      >
        START NEW MATCH
      </Link>
    </main>
  );
}
