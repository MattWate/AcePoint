"use client";
import { useState, useEffect } from 'react';
import { profileService } from '@/features/profile/profileService';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    username: '',
    full_name: '',
    handness: 'right'
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await profileService.getMyProfile();
        if (data) setProfile(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await profileService.updateProfile(profile);
    setLoading(false);
    alert('Profile Updated!');
  };

  if (loading) return <div className="p-8 text-brand">Loading...</div>;

  return (
    <main className="min-h-screen bg-black p-6 text-white uppercase font-black">
      <h1 className="text-4xl text-brand mb-8 italic">Player Profile</h1>
      
      <form onSubmit={handleSave} className="space-y-6 max-w-md">
        <div>
          <label className="block text-xs opacity-50 mb-1">Username</label>
          <input 
            value={profile.username}
            onChange={e => setProfile({...profile, username: e.target.value})}
            className="w-full bg-zinc-900 border-b-2 border-brand p-3 outline-none focus:bg-zinc-800"
          />
        </div>

        <div>
          <label className="block text-xs opacity-50 mb-1">Handedness</label>
          <div className="flex gap-4">
            {['left', 'right'].map(h => (
              <button
                key={h}
                type="button"
                onClick={() => setProfile({...profile, handness: h})}
                className={`flex-1 p-3 border-2 ${profile.handness === h ? 'border-brand bg-brand text-black' : 'border-zinc-700'}`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-brand text-black p-4 mt-8 hover:brightness-110 active:scale-95 transition-all"
        >
          Save Profile
        </button>
      </form>
    </main>
  );
}
