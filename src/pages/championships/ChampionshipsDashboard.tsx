import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { championshipStore, type Championship } from '../../lib/championshipStore';

const MOCK_CHAMPIONSHIPS = [
  {
    id: 'mock-1',
    title: '26th Senior State Championship',
    venue: 'Thodupuzha, Idukki',
    date: '02 - 09 - 2025',
    status: 'Ongoing' as const,
    isLarge: true
  },
  {
    id: 'mock-2',
    title: '26th Senior State Championship',
    venue: 'Thodupuzha, Idukki',
    date: '14 - 09 - 2025',
    status: 'Upcoming' as const,
    countdown: { days: 12, hours: '08', minutes: 30 }
  }
];

export default function ChampionshipsDashboard() {
  const [realChampionships, setRealChampionships] = useState<Championship[]>([]);

  useEffect(() => {
    const data = championshipStore.getChampionships();
    setRealChampionships(data);
  }, []);

  // Merge mock and real data
  const allChampionships = [...MOCK_CHAMPIONSHIPS, ...realChampionships.map(c => ({
    id: c.id,
    title: c.title,
    venue: `${c.place}, ${c.district}`,
    date: c.dateDisplay,
    status: c.status
  }))];

  const ongoing = allChampionships.find(c => c.status === 'Ongoing');
  const rest = allChampionships.filter(c => c.id !== ongoing?.id);

  return (
    <div className="max-w-[1200px] pb-10">

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-[#444] tracking-tight">Championships</h1>
      </div>

      <div className="flex gap-6 mb-6">
        {/* Large Ongoing Card */}
        {ongoing && (
          <Link
            to={`/dashboard/championships/${ongoing.id}`}
            className="bg-[#e0f8e9] rounded-xl p-8 flex-1 relative flex flex-col cursor-pointer hover:bg-[#dcfce7] transition-colors"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-[14px] font-bold text-[#444]">{ongoing.status}</span>
              {(ongoing as any).date && (
                <span className="text-[14px] font-bold text-[#444]">{(ongoing as any).date}</span>
              )}
            </div>
            <div className="mt-auto">
              <h2 className="text-[24px] font-bold text-[#22c55e] tracking-tight leading-snug mb-2">{ongoing.title}</h2>
              <p className="text-[13px] text-[#6b7280] font-medium">Venue: {ongoing.venue}</p>
            </div>
          </Link>
        )}

        {/* Create New Block */}
        <Link
          to="/dashboard/championships/create"
          className="w-[300px] shrink-0 flex items-center justify-between px-2 cursor-pointer group"
        >
          <div className="pl-4">
            <span className="text-[20px] font-bold text-[#555] leading-tight block group-hover:text-[#22c55e] transition-colors">Create New<br />Championship</span>
          </div>
          <div className="w-[45px] h-[45px] border-[1.5px] border-[#ddd] rounded-sm flex items-center justify-center bg-white group-hover:border-[#22c55e] transition-colors shrink-0 mr-4">
            <PlusIcon className="w-6 h-6 text-[#555] group-hover:text-[#22c55e] stroke-2" />
          </div>
        </Link>
      </div>

      {/* Grid of Other Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((championship: any) => (
          <Link
            key={championship.id}
            to={`/dashboard/championships/${championship.id}`}
            className={`${championship.status === 'Upcoming' ? 'bg-[#e0f2fe] hover:bg-[#bae6fd]' : 'bg-[#f4f4f4] hover:bg-[#eaeaea]'} rounded-xl p-6 relative flex flex-col h-[180px] cursor-pointer transition-colors`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[13px] font-bold text-[#444]">{championship.status}</span>
              {championship.date && (
                <span className="text-[13px] font-bold text-[#444]">{championship.date}</span>
              )}
            </div>

            <div className="mt-auto flex justify-between items-end">
              <div className="pr-4">
                <h2 className={`text-[20px] font-bold ${championship.status === 'Upcoming' ? 'text-[#3b82f6]' : 'text-[#444]'} leading-tight mb-2 tracking-tight`}>{championship.title}</h2>
                <p className="text-[12px] text-[#6b7280] font-medium">Venue: {championship.venue}</p>
              </div>

              {/* Countdown timers for Upcoming */}
              {championship.countdown && (
                <div className="flex gap-[6px] shrink-0">
                  <div className="flex flex-col items-center">
                    <div className="bg-[#fff] rounded-sm px-2 py-1 text-[13px] font-bold text-[#3b82f6] shadow-sm mb-[2px]">{championship.countdown.days}</div>
                    <span className="text-[8px] text-[#888] font-medium">days</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-[#fff] rounded-sm px-2 py-1 text-[13px] font-bold text-[#3b82f6] shadow-sm mb-[2px]">{championship.countdown.hours}</div>
                    <span className="text-[8px] text-[#888] font-medium">hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-[#fff] rounded-sm px-2 py-1 text-[13px] font-bold text-[#3b82f6] shadow-sm mb-[2px]">{championship.countdown.minutes}</div>
                    <span className="text-[8px] text-[#888] font-medium">mins</span>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
