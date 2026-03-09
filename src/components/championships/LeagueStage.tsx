import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface LeagueStageProps {
  teams: { name: string; id: string }[];
  teamCount: number;
  fixtureType: string;
}

export default function LeagueStage({ teams, teamCount, fixtureType }: LeagueStageProps) {
  return (
    <div className="space-y-10">
      {/* ── GROUP STAGE ── */}
      <div>
        <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-widest mb-4">Group Stage</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Placeholder for 4 group tables */}
          {Array.from({ length: 4 }).map((_, pi) => {
            const teamsPerGroup = Math.ceil(teamCount / 4);
            const pool = String.fromCharCode(65 + pi); // A, B, C, D
            return (
              <div key={pool} className="border border-[#e8e8e8] rounded-lg overflow-hidden">
                <div className="bg-[#f4f4f4] px-4 py-2 flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#444]">Pool {pool}</span>
                  <span className="text-[11px] text-[#aaa] font-medium">{teamsPerGroup} teams</span>
                </div>
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#f0f0f0]">
                      <th className="text-left px-4 py-2 text-[#bbb] font-bold w-6">#</th>
                      <th className="text-left px-4 py-2 text-[#bbb] font-bold">Team</th>
                      <th className="px-3 py-2 text-[#bbb] font-bold text-center">P</th>
                      <th className="px-3 py-2 text-[#bbb] font-bold text-center">W</th>
                      <th className="px-3 py-2 text-[#bbb] font-bold text-center">L</th>
                      <th className="px-3 py-2 text-[#bbb] font-bold text-center">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5f5f5]">
                    {Array.from({ length: teamsPerGroup }).map((_, ti) => {
                      const globalIndex = pi * teamsPerGroup + ti;
                      const teamName = globalIndex < teams.length ? teams[globalIndex].name : `Team ${globalIndex + 1}`;
                      const isWinner = ti === 0;
                      const isRunner = ti === 1;
                      return (
                        <tr key={ti} className={`${isWinner ? 'bg-[#f0fdf4]' : isRunner ? 'bg-[#fffbf0]' : 'hover:bg-[#fafafa]'} transition-colors`}>
                          <td className="px-4 py-2.5 text-[#bbb] font-medium">{ti + 1}</td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#555]">
                                {teamName}
                              </span>
                              {isWinner && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">W</span>}
                              {isRunner && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">R</span>}
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-center text-[#888]">—</td>
                          <td className="px-3 py-2.5 text-center text-[#888]">—</td>
                          <td className="px-3 py-2.5 text-center text-[#888]">—</td>
                          <td className="px-3 py-2.5 text-center font-bold text-[#555]">—</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── KNOCKOUT BRACKET (Tabular Card Layout) ── */}
      <div>
        <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-widest mb-5">Knockout Stage</p>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 lg:gap-8 overflow-x-auto pb-4">
          {/* Quarter Finals */}
          <div className="flex flex-col items-center space-y-4 w-full lg:w-auto">
            <h4 className="text-[12px] font-bold text-[#bbb] uppercase tracking-widest">Quarter Final</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`qf-${i}`} className="w-full lg:w-[200px] bg-[#f7f7f7] border border-[#e0e0e0] rounded-lg p-3 space-y-2 shadow-sm">
                  <p className="text-[10px] text-[#888] font-medium">Match {i + 1}</p>
                  <div className="flex justify-between items-center text-[13px] font-bold text-[#444] gap-2">
                    <span className="truncate flex-1 min-w-0" title={teams[0]?.name || 'Winner Pool A'}>{teams[0]?.name || 'Winner Pool A'}</span>
                    <span className="text-[#bbb] flex-shrink-0">vs</span>
                    <span className="truncate flex-1 min-w-0" title={teams[1]?.name || 'Runner Pool B'}>{teams[1]?.name || 'Runner Pool B'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows to Semi Finals */}
          <div className="flex flex-col justify-around h-[300px] md:h-[unset] md:mt-10">
            {Array.from({ length: 2 }).map((_, i) => (
              <ChevronRightIcon key={`arrow-qf-sf-${i}`} className="w-6 h-6 text-[#ccc] stroke-[2.5] rotate-90 md:rotate-0" />
            ))}
          </div>

          {/* Semi Finals */}
          <div className="flex flex-col items-center space-y-16 w-full lg:w-auto">
            <h4 className="text-[12px] font-bold text-[#bbb] uppercase tracking-widest">Semi Final</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={`sf-${i}`} className="w-full lg:w-[200px] bg-[#f0f0f0] border border-[#ddd] rounded-lg p-3 space-y-2 shadow-sm">
                  <p className="text-[10px] text-[#888] font-medium">Match {i + 5}</p>
                  <div className="flex justify-between items-center text-[13px] font-bold text-[#666] gap-2">
                    <span className="truncate flex-1 min-w-0" title={`Winner QF${i * 2 + 1}`}>Winner QF{i * 2 + 1}</span>
                    <span className="text-[#bbb] flex-shrink-0">vs</span>
                    <span className="truncate flex-1 min-w-0" title={`Winner QF${i * 2 + 2}`}>Winner QF{i * 2 + 2}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-[#888] mt-1">
                    <span>⏰ 10:00 AM</span>
                    <span>🏟️ Pitch {i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow to Final */}
          <div className="flex flex-col justify-center h-[150px] md:h-[unset] md:mt-10">
            <ChevronRightIcon className="w-6 h-6 text-[#ccc] stroke-[2.5] rotate-90 md:rotate-0" />
          </div>

          {/* Final */}
          <div className="flex flex-col items-center space-y-4 w-full lg:w-auto">
            <h4 className="text-[12px] font-bold text-[#bbb] uppercase tracking-widest">Final</h4>
            <div className="w-full lg:w-[200px] bg-[#444] border border-[#333] rounded-lg p-3 space-y-2 text-white shadow-md">
              <p className="text-[10px] text-[#ccc] font-medium">Match 7</p>
              <div className="flex justify-between items-center text-[13px] font-bold gap-2">
                <span className="truncate flex-1 min-w-0" title="Winner SF1">Winner SF1</span>
                <span className="text-[#bbb] flex-shrink-0">vs</span>
                <span className="truncate flex-1 min-w-0" title="Winner SF2">Winner SF2</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-[#ccc] mt-1">
                <span>⏰ 3:00 PM</span>
                <span>🏟️ Main Pitch</span>
              </div>
            </div>
            <p className="text-[10px] text-[#aaa] font-medium mt-1">Winner</p>
          </div>
        </div>

        {fixtureType === 'league-grand-finale' && (
          <div className="flex gap-3 pt-4 justify-center">
            <span className="text-[11px] py-1 px-3 bg-[#f4f4f4] border border-[#e0e0e0] rounded font-bold text-[#666]">→ Semi Final</span>
            <span className="text-[11px] py-1 px-3 bg-[#f4f4f4] border border-[#e0e0e0] rounded font-bold text-[#666]">→ Losers Final</span>
            <span className="text-[11px] py-1 px-3 bg-[#444] text-white rounded font-bold">→ Grand Final</span>
          </div>
        )}
      </div>
    </div>
  );
}
