import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface MatchOrderProps {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
}

export default function MatchOrder({ selectedGender, onGenderChange }: MatchOrderProps) {
  const [expandedMatches, setExpandedMatches] = useState<number[]>([1]);

  const toggleMatch = (matchId: number) => {
    setExpandedMatches(prev =>
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-end border-b border-[#eee] pb-2">
        <h3 className="text-[20px] font-bold text-[#444]">Match Order</h3>
        <div className="flex gap-6">
          {['Men', 'Women'].map((gender) => (
            <button
              key={gender}
              onClick={() => onGenderChange(gender)}
              className={`text-[15px] font-bold transition-all ${selectedGender === gender
                ? 'text-[#444] border-b-2 border-[#444] mb-[-9px] pb-[7px]'
                : 'text-[#bbb] hover:text-[#888]'
                }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-0 border border-[#eee] rounded-sm overflow-hidden">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="group flex flex-col border-b border-[#eee] last:border-b-0">
            <div 
              className="flex items-center justify-between py-4 px-4 hover:bg-[#fcfcfc] transition-colors cursor-pointer"
              onClick={() => toggleMatch(i)}
            >
              <div className="flex items-center gap-4 flex-1">
                <span className="text-[14px] text-[#888] font-medium w-6">{i}.</span>
                <span className="text-[14px] text-[#555] font-bold">Team Name</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-[14px] font-black text-[#555] tracking-widest">VS</span>
              </div>
              <div className="flex items-center justify-between flex-1">
                <span className="text-[14px] text-[#555] font-bold">Team Name</span>
                {i === 1 ? (
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-3 h-[2px] bg-[#bbb]" />
                  </div>
                ) : (
                  <PlusIcon className="w-5 h-5 text-[#bbb]" />
                )}
              </div>
            </div>

            {/* Expanded Section */}
            {expandedMatches.includes(i) && (
              <div className="bg-[#d9d9d9] py-3 px-10 flex gap-12">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-[#666] font-bold">Score:</span>
                  <span className="text-[14px] text-[#444] font-black">7 - 0</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-[#666] font-bold">Player of the Match:</span>
                  <span className="text-[14px] text-[#444] font-black">John Doe</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-5 pt-4">
        <button className="bg-[#f2f2f2] hover:bg-[#e8e8e8] text-[#777] text-[14px] px-12 py-3 rounded-md font-bold transition-all">
          Share
        </button>
        <button className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[14px] px-12 py-3 rounded-md font-bold transition-all shadow-md">
          Download
        </button>
      </div>
    </div>
  );
}
