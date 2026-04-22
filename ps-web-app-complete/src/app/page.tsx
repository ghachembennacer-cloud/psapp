"use client";
import { useEffect, useState } from "react";

export default function PSApp() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/psn")
      .then(res => res.json())
      .then(json => {
        if (json.error) setError(json.message);
        else setData(json);
      })
      .catch(err => setError("Could not connect to API"));
  }, []);

  if (error) return (
    <div className="bg-black text-red-500 h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-2xl font-bold mb-4">Connection Failed</h1>
      <p className="bg-gray-900 p-4 rounded border border-red-900">{error}</p>
      <p className="mt-4 text-gray-500 text-sm text-center">
        Note: Sony often blocks Vercel IPs. <br/> 
        If you see "invalid_grant", run this project on your local PC.
      </p>
    </div>
  );

  if (!data) return <div className="bg-black text-white h-screen flex items-center justify-center italic">LOADING GAME BASE...</div>;

  return (
    <div className="bg-black text-white min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black italic mb-8 border-l-4 border-blue-600 pl-4 uppercase">PlayStation Game Base</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section>
            <h2 className="text-blue-500 font-bold mb-4 uppercase tracking-tighter">Friends List</h2>
            <div className="space-y-2">
              {data.friends?.map((f: any) => (
                <div key={f.accountId} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                  <img src={f.avatarUrl} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-bold text-sm">{f.onlineId}</p>
                    <p className="text-[10px] text-gray-500 uppercase">{f.onlineStatus}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-blue-500 font-bold mb-4 uppercase tracking-tighter">Recent Games</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.games?.slice(0, 4).map((g: any) => (
                <div key={g.npCommunicationId} className="text-center">
                  <img src={g.trophyTitleIconUrl} className="rounded-xl border border-white/10 w-full mb-2" />
                  <p className="text-[10px] font-bold truncate uppercase">{g.trophyTitleName}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
