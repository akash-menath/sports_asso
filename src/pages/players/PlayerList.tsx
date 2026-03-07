import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';
import { PlusIcon } from '@heroicons/react/24/outline';
import { playerStore, type Player } from '../../lib/playerStore';

export default function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPlayers(playerStore.getPlayers());
  }, []);

  return (
    <div className="max-w-[1200px] pb-10">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-[28px] font-bold text-[#444] tracking-tight">Player List</h1>
          <p className="mt-1 text-sm text-[#666]">
            View all registered players
          </p>
        </div>
        <Button onClick={() => navigate('/players/registration')}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Player
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#eaeaea]">
                <th className="py-4 px-6 text-[13px] font-medium text-[#666]">Name</th>
                <th className="py-4 px-6 text-[13px] font-medium text-[#666]">Level</th>
                <th className="py-4 px-6 text-[13px] font-medium text-[#666]">District</th>
                <th className="py-4 px-6 text-[13px] font-medium text-[#666]">Phone</th>
                <th className="py-4 px-6 text-[13px] font-medium text-[#666]">Status</th>
              </tr>
            </thead>
            <tbody>
              {players.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[13px] text-[#666]">No players found.</td>
                </tr>
              ) : (
                players.map((player) => (
                  <tr key={player.id} className="border-b border-[#eaeaea] last:border-0 hover:bg-[#fafafa] transition-colors">
                    <td className="py-4 px-6 text-[14px] text-[#444] font-medium">{player.name}</td>
                    <td className="py-4 px-6 text-[13px] text-[#666]">{player.level}</td>
                    <td className="py-4 px-6 text-[13px] text-[#666]">{player.district}</td>
                    <td className="py-4 px-6 text-[13px] text-[#666]">{player.phone}</td>
                    <td className="py-4 px-6">
                      <span className={`text-[12px] font-bold ${player.status === 'Approved' ? 'text-[#555]' : 'text-[#888]'
                        }`}>
                        {player.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
