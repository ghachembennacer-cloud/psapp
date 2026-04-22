"use client";
import { useEffect, useState } from "react";
import { MessageSquare, Users, Gamepad2, MicOff, Send } from "lucide-react";

export default function GameBaseApp() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/psn");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white italic tracking-widest">
        CONNECTING TO PLAYSTATION NETWORK...
      </div>
    );
  }

  return (
    <main className="flex h-screen bg-black text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-[#121212] border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold flex items-center gap-2 italic">
            <div className="w-2 h-6 bg-[#00439c]"></div>
            GAME BASE
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {data?.friends?.map((friend: any) => (
            <div 
              key={friend.accountId} 
              onClick={() => setSelectedFriend(friend)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedFriend?.accountId === friend.accountId ? 'bg-[#00439c]/20 border border-[#00439c]/50' : 'hover:bg-white/5 border border-transparent'}`}
            >
              <div className="relative">
                <img src={friend.avatarUrl} className="w-11 h-11 rounded-full bg-gray-800" alt="" />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#121212] ${friend.onlineStatus === 'online' ? 'bg-green-500' : 'bg-gray-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate text-sm">{friend.onlineId}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{friend.onlineStatus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#050505]">
        <header className="h-16 border-b border-gray-800 flex items-center px-8 justify-between">
          <div className="flex items-center gap-4">
            <Gamepad2 className="text-[#00439c]" size={24} />
            <span className="font-bold uppercase tracking-tighter">PlayStation Web</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-bold text-gray-400">
            <MicOff size={14} className="text-red-500" /> VOICE RESTRICTED
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          {selectedFriend ? (
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-6 mb-8 bg-white/5 p-6 rounded-3xl border border-white/10">
                <img src={selectedFriend.avatarUrl} className="w-24 h-24 rounded-full border-4 border-[#00439c]" alt="" />
                <h2 className="text-4xl font-black italic uppercase">{selectedFriend.onlineId}</h2>
              </div>
              <div className="flex-1 bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col justify-center items-center text-gray-500">
                 <MessageSquare size={48} className="mb-4 opacity-20" />
                 <p className="uppercase text-xs tracking-widest">Select a friend to view details</p>
              </div>
            </div>
          ) : (
            <div>
               <h2 className="text-2xl font-black italic mb-6 uppercase">Recent Games</h2>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {data?.games?.slice(0, 10).map((game: any) => (
                    <div key={game.npCommunicationId} className="group cursor-pointer">
                      <div className="aspect-square overflow-hidden rounded-2xl mb-3 border border-white/10 group-hover:border-[#00439c] transition-all">
                         <img src={game.trophyTitleIconUrl} className="object-cover w-full h-full group-hover:scale-110 transition-all" alt="" />
                      </div>
                      <p className="text-xs font-bold truncate uppercase">{game.trophyTitleName}</p>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
