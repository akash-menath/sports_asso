import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const MOCK_CLAIMS = [
  { id: 1, title: 'Claim title and Date #1', date: '21-09-2025' },
  { id: 2, title: 'Claim title and Date #2', date: '22-09-2025' },
  { id: 3, title: 'Claim title and Date #3', date: '23-09-2025' },
  { id: 4, title: 'Claim title and Date #4', date: '24-09-2025' },
  { id: 5, title: 'Claim title and Date #5', date: '25-09-2025' }
];

const SelectDropdown = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-[13px] text-[#666] font-medium">{label}</span>
    <div className="relative">
      <select className="appearance-none bg-[#f4f4f4] border-none text-[#555] text-[13px] py-2 pl-4 pr-10 rounded-sm focus:ring-0 cursor-pointer min-w-[140px] font-medium">
        <option>Select</option>
      </select>
      <ChevronDownIcon className="w-4 h-4 text-[#888] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-2" />
    </div>
  </div>
);

export default function ClaimsDashboard() {
  const [selectedClaimId, setSelectedClaimId] = useState<number>(5);

  const selectedClaim = MOCK_CLAIMS.find(c => c.id === selectedClaimId);

  return (
    <div className="max-w-[1200px] pb-10 flex flex-col h-full">
      {/* Top Header Row */}
      <div className="flex justify-between items-center mb-8 pr-2">
        <h1 className="text-[28px] font-bold text-[#444] tracking-tight">Claims</h1>

        <div className="flex items-center gap-6">
          <SelectDropdown label="Filter" />

          <button className="bg-[#555] hover:bg-[#444] text-white text-[13px] px-8 py-2 rounded-sm font-medium transition-colors ml-2 shadow-sm">
            Add
          </button>
        </div>
      </div>

      <div className="flex gap-8 flex-1">
        {/* Left Column: Claim List */}
        <div className="w-[320px] shrink-0 flex flex-col gap-2">
          {MOCK_CLAIMS.map((claim) => (
            <button
              key={claim.id}
              onClick={() => setSelectedClaimId(claim.id)}
              className={`w-full text-left px-5 py-3.5 rounded-sm transition-colors text-[14px] font-medium ${selectedClaimId === claim.id
                  ? 'bg-[#ccc] text-[#333]'
                  : 'bg-[#f4f4f4] text-[#666] hover:bg-[#eaeaea]'
                }`}
            >
              {claim.title}
            </button>
          ))}
        </div>

        {/* Right Column: Claim Details */}
        {selectedClaim && (
          <div className="flex-1 flex flex-col pl-4">
            {/* Detail Header */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-[22px] font-bold text-[#444] tracking-tight pt-1">
                Claim Title #{selectedClaim.id}
              </h2>
              <div className="flex gap-3">
                <button className="bg-[#555] hover:bg-[#444] text-white text-[13px] px-6 py-2 rounded-sm font-medium transition-colors shadow-sm">
                  Download
                </button>
                <button className="bg-[#555] hover:bg-[#444] text-white text-[13px] px-6 py-2 rounded-sm font-medium transition-colors shadow-sm">
                  Share
                </button>
              </div>
            </div>

            <p className="text-[14px] text-[#666] font-medium mb-6">
              Date: {selectedClaim.date}
            </p>

            <div className="space-y-4 pr-12">
              <p className="text-[13px] text-[#666] leading-[1.6]">
                Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing, design and blogging tools. Explore the origins, history and meaning of the famous passage, and learn how Lorem Ipsum went from Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing, design and blogging tools. Explore the origins, history and meaning of the famous passage, and learn how Lorem Ipsum went from
              </p>
              <p className="text-[13px] text-[#666] leading-[1.6]">
                Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing, design and blogging tools. Explore the origins, history and meaning of the famous passage, and learn how Lorem Ipsum went from Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing,
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
