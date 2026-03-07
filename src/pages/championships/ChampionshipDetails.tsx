import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronUpIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import SlideOver from '../../components/ui/SlideOver';
import { championshipStore, type Championship } from '../../lib/championshipStore';

const LIVE_TABS = [
  'Ground Confirmation',
  'Fixture',
  'Match Order',
  'Attendance',
  'Live Match Updates',
  'Reporting',
  'Final updates'
];

const POST_TABS = [
  'Championship Results',
  'Comprehensive Report.',
  'Team Photos Album.',
  'Roster Forms',
  'Selection List'
];

const MOCK_DATA: Record<string, Partial<Championship>> = {
  'mock-1': {
    title: '26th Senior State Championship',
    groundName: 'Thodupuzha Ground',
    place: 'Thodupuzha',
    district: 'Idukki',
  },
  'mock-2': {
    title: '26th Senior State Championship',
    groundName: 'Trivandrum Ground',
    place: 'Thodupuzha',
    district: 'Idukki',
  }
};

export default function ChampionshipDetails() {
  const { id } = useParams();
  const [championship, setChampionship] = useState<Partial<Championship> | null>(null);
  const [expandedCategories, setExpandedCategories] = useState(['Live']);
  const [selectedTab, setSelectedTab] = useState('Ground Confirmation');
  const [isFixtureSubmitted, setIsFixtureSubmitted] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Men');
  const [selectedAttendanceTab, setSelectedAttendanceTab] = useState('State observer');
  const [editingMatchId, setEditingMatchId] = useState<number | null>(1);
  const [isReportingOpen, setIsReportingOpen] = useState(false);
  const [isFinalResultsOpen, setIsFinalResultsOpen] = useState(false);
  const [isBestPlayerOpen, setIsBestPlayerOpen] = useState(false);
  const [fixtureType, setFixtureType] = useState('');
  const [teamCount, setTeamCount] = useState(16);

  const refreshData = () => {
    if (id && !id.startsWith('mock-')) {
      const data = championshipStore.getChampionshipById(id);
      if (data) setChampionship(data);
    }
  };

  useEffect(() => {
    if (id) {
      if (id.startsWith('mock-')) {
        setChampionship(MOCK_DATA[id] || null);
      } else {
        const data = championshipStore.getChampionshipById(id);
        if (data) setChampionship(data);
      }
    }
  }, [id]);

  const handleUpdateScore = (matchId: number, score1: string, score2: string) => {
    if (!id || !championship) return;
    const matches = [...(championship.matches || [])];
    const matchIdx = matches.findIndex(m => m.id === matchId);
    if (matchIdx > -1) {
      matches[matchIdx] = { ...matches[matchIdx], score1, score2, status: 'Completed' };
    } else {
      matches.push({ id: matchId, team1: 'Team A', team2: 'Team B', score1, score2, status: 'Completed' });
    }
    championshipStore.updateChampionship(id, { matches });
    refreshData();
    setEditingMatchId(null);
  };

  const handleAddReport = (type: string, msg: string) => {
    if (!id || !championship) return;
    const reports = [...(championship.reports || [])];
    reports.push({
      id: Date.now().toString(),
      type,
      msg,
      status: 'Logged',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    championshipStore.updateChampionship(id, { reports });
    refreshData();
    setIsReportingOpen(false);
  };

  const handleToggleAttendance = (target: 'observer' | 'referee', index?: number) => {
    if (!id || !championship) return;
    const attendance = { ...(championship.attendance || { observerMarked: false, referees: [] }) };
    if (target === 'observer') {
      attendance.observerMarked = !attendance.observerMarked;
    } else if (index !== undefined) {
      if (!attendance.referees[index]) {
        attendance.referees[index] = { name: 'Referee Name', marked: false };
      }
      attendance.referees[index].marked = !attendance.referees[index].marked;
    }
    championshipStore.updateChampionship(id, { attendance });
    refreshData();
  };

  const handleAddSelection = (name: string, team: string) => {
    if (!id || !championship) return;
    const selectionList = [...(championship.selectionList || [])];
    selectionList.push({ name, team });
    championshipStore.updateChampionship(id, { selectionList });
    refreshData();
  };

  const handleAddBestPlayer = (name: string, match: string) => {
    if (!id || !championship) return;
    const matches = [...(championship.matches || [])];
    // For simplicity, we'll just log it or update a match
    const matchIdx = matches.findIndex(m => m.time === match);
    if (matchIdx > -1) {
      matches[matchIdx] = { ...matches[matchIdx], bestPlayer: name };
    }
    championshipStore.updateChampionship(id, { matches });
    refreshData();
    setIsBestPlayerOpen(false);
  };

  const handleAddResult = (type: string, team: string, score: string) => {
    if (!id || !championship) return;
    // For simplicity, we'll store this in a 'results' field if it existed, 
    // but for now we'll just log success and close
    console.log('Result Added:', { type, team, score });
    setIsFinalResultsOpen(false);
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const isExpanded = (cat: string) => expandedCategories.includes(cat);

  const getKnockoutStageName = (count: number) => {
    if (count > 8) return 'Pre Quarter Final';
    if (count > 4) return 'Quarter Final';
    if (count > 2) return 'Semi Final';
    return 'Final';
  };

  if (!championship) {
    return <div className="p-10 text-center text-gray-500">Loading championship details...</div>;
  }

  return (
    <div className="max-w-[1200px] w-full pt-4 pb-20 px-4">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-[32px] font-bold text-[#444] tracking-tight">{championship.title}</h1>
      </div>

      <div className="flex gap-12 items-start">
        {/* Sidebar */}
        <div className="w-[280px] shrink-0 space-y-2">

          {/* Live Championship Category */}
          <div className="space-y-1">
            <button
              onClick={() => toggleCategory('Live')}
              className="w-full flex items-center justify-between py-3 px-2 text-[#444] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <h2 className="text-[20px] font-bold">Live Championship</h2>
              {isExpanded('Live') ? (
                <ChevronUpIcon className="w-5 h-5 text-[#555] stroke-[2.5]" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-[#555] stroke-[2.5]" />
              )}
            </button>

            {isExpanded('Live') && (
              <div className="space-y-1.5 pl-1">
                {LIVE_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setSelectedTab(tab);
                      if (tab !== 'Fixture') setIsFixtureSubmitted(false);
                    }}
                    className={`w-full text-left py-3 px-5 rounded-lg text-[14px] font-medium transition-all ${selectedTab === tab
                      ? 'bg-[#d1d1d1] text-[#4a4a4a]'
                      : 'text-[#888] hover:bg-[#f6f6f6] hover:text-[#555]'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Post-Championship Category */}
          <div className="pt-2">
            <button
              onClick={() => toggleCategory('Post')}
              className="w-full flex items-center justify-between py-3 px-2 text-[#444] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <h2 className="text-[20px] font-bold">Post-Championship</h2>
              {isExpanded('Post') ? (
                <ChevronUpIcon className="w-5 h-5 text-[#555] stroke-[2.5]" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-[#555] stroke-[2.5]" />
              )}
            </button>
            {isExpanded('Post') && (
              <div className="space-y-1.5 pl-1">
                {POST_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setSelectedTab(tab);
                      setIsFixtureSubmitted(false);
                    }}
                    className={`w-full text-left py-3 px-5 rounded-lg text-[14px] font-medium transition-all ${selectedTab === tab
                      ? 'bg-[#d1d1d1] text-[#4a4a4a]'
                      : 'text-[#888] hover:bg-[#f6f6f6] hover:text-[#555]'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-h-[600px] bg-white pt-2 flex flex-col">
          <div className="flex-1">
            {selectedTab === 'Ground Confirmation' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-[16px] font-bold text-[#444]">{championship.groundName || 'Ground name'}</h3>
                  <p className="text-[14px] text-[#777] font-medium">{championship.place}, {championship.district}</p>
                </div>

                {/* Box Placeholder */}
                <div className="w-full max-w-[450px] aspect-[4/3] bg-[#f5f5f5] rounded-sm border border-[#eee] flex items-center justify-center">
                  <span className="text-[#888] text-[16px] font-medium tracking-wide">Ground Pictures</span>
                </div>

                {/* Map Link */}
                <div className="pt-2">
                  <a
                    href="#"
                    className="text-[14px] text-[#666] font-medium underline underline-offset-2 decoration-[#bbb] hover:text-[#333] transition-colors"
                  >
                    Location on google map
                  </a>
                </div>
              </div>
            )}

            {selectedTab === 'Fixture' && !isFixtureSubmitted && (
              <div className="space-y-8 flex-1 animate-in fade-in duration-300">
                <h3 className="text-[20px] font-bold text-[#444]">Fixture</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[800px]">
                  {/* Type Selection */}
                  <div className="space-y-4">
                    <label className="text-[14px] text-[#777] font-medium">Type</label>
                    <div className="relative">
                      <select
                        value={fixtureType}
                        onChange={(e) => setFixtureType(e.target.value)}
                        className="w-full appearance-none bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 pl-4 pr-10 rounded focus:ring-0 cursor-pointer font-medium"
                      >
                        <option value="">Select Fixture Type</option>
                        <option value="knock-out">Knock out</option>
                        <option value="league-cum-knock-out">League cum knock out</option>
                        <option value="league-grand-finale">League cum knock out cum Grand finale system</option>
                        <option value="round-robin">Round robin league</option>
                        <option value="knock-out-cum-league">knock out cum league</option>
                      </select>
                      <ChevronDownIcon className="w-4 h-4 text-[#4b4b4b] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Team no. Selection */}
                  <div className="space-y-4">
                    <label className="text-[14px] text-[#777] font-medium">Team no.</label>
                    <div className="relative">
                      <select
                        value={teamCount}
                        onChange={(e) => setTeamCount(Number(e.target.value))}
                        className="w-full appearance-none bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 pl-4 pr-10 rounded focus:ring-0 cursor-pointer font-medium"
                      >
                        <option value="">Select Team</option>
                        {[16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6].map((num) => (
                          <option key={num} value={num}>{num} Teams</option>
                        ))}
                      </select>
                      <ChevronDownIcon className="w-4 h-4 text-[#4b4b4b] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 max-w-[800px] pt-4">
                  <button className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#777] text-[14px] px-8 py-2.5 rounded font-bold transition-all">
                    Add Group
                  </button>
                  <button
                    onClick={() => setIsFixtureSubmitted(true)}
                    className="bg-[#4b4b4b] hover:bg-[#333] text-white text-[14px] px-10 py-2.5 rounded font-bold transition-all shadow-md active:scale-95"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {selectedTab === 'Fixture' && isFixtureSubmitted && (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-start">
                  <h3 className="text-[20px] font-bold text-[#444]">Fixture</h3>
                  <div className="flex gap-4 border-b border-[#eee]">
                    {['Men', 'Women'].map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setSelectedGender(gender)}
                        className={`pb-2 px-1 text-[15px] font-bold transition-all ${selectedGender === gender
                          ? 'text-[#444] border-b-2 border-[#444]'
                          : 'text-[#bbb] hover:text-[#888]'
                          }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bracket Visualization */}
                <div className="relative py-16 flex justify-center items-center overflow-x-auto min-w-[800px]">
                  <div className="flex items-center gap-4">

                    {/* Left side bracket - Level 1 (Pre-QF) to Level 3 (Finalist) */}
                    <div className="flex items-center gap-0">
                      {/* Round of 16 / Pre-QF */}
                      <div className="flex flex-col gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div key={`l1-${i}`} className="w-8 h-8 border-r-2 border-t-2 border-b-2 border-[#444] rounded-r-sm" />
                        ))}
                      </div>
                      {/* Quarter Final */}
                      <div className="flex flex-col gap-12 ml-0">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={`l2-${i}`} className="w-8 h-12 border-r-2 border-t-2 border-b-2 border-[#444] rounded-r-sm" />
                        ))}
                      </div>
                      {/* Semi Final */}
                      <div className="flex flex-col gap-28 ml-0">
                        {[1, 2].map((i) => (
                          <div key={`l3-${i}`} className="w-12 h-24 border-r-2 border-t-2 border-b-2 border-[#444] rounded-r-sm" />
                        ))}
                      </div>
                      {/* Connector to Final */}
                      <div className="w-12 h-[2px] bg-[#444]" />
                    </div>

                    {/* Center Trophy */}
                    <div className="flex flex-col items-center mx-8">
                      <div className="w-[140px] h-[150px] relative flex flex-col items-center justify-center">
                        {/* Trophy Cup SVG */}
                        <svg className="w-[100px] h-[100px] text-[#f1c40f]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 5h-2V3H7v2H5C3.9 5 3 5.9 3 7v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                        </svg>

                        {/* Pedestal / Base */}
                        <div className="w-28 h-12 bg-[#444] rounded-sm mt-[-4px] relative flex flex-col items-center justify-center shadow-lg border-b-4 border-[#333]">
                          <div className="w-16 h-[2px] bg-[#666] mb-2" />
                          <div className="w-12 h-1 bg-[#555] opacity-50" />
                        </div>
                      </div>
                      <div className="text-[14px] font-bold text-[#444] tracking-widest uppercase mt-6">
                        {fixtureType.includes('league') ? 'Grand Final' : 'Final'}
                      </div>
                    </div>

                    {/* Right side bracket - Level 3 to Level 1 */}
                    <div className="flex items-center gap-0">
                      {/* Connector to Final */}
                      <div className="w-12 h-[2px] bg-[#444]" />
                      {/* Semi Final */}
                      <div className="flex flex-col gap-28 ml-0">
                        {[1, 2].map((i) => (
                          <div key={`r3-${i}`} className="w-12 h-24 border-l-2 border-t-2 border-b-2 border-[#444] rounded-l-sm" />
                        ))}
                      </div>
                      {/* Quarter Final */}
                      <div className="flex flex-col gap-12 ml-0">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={`r2-${i}`} className="w-8 h-12 border-l-2 border-t-2 border-b-2 border-[#444] rounded-l-sm" />
                        ))}
                      </div>
                      {/* Round of 16 / Pre-QF */}
                      <div className="flex flex-col gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div key={`r1-${i}`} className="w-8 h-8 border-l-2 border-t-2 border-b-2 border-[#444] rounded-l-sm" />
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Match Order Table */}
                <div className="space-y-4">
                  <h4 className="text-[14px] font-bold text-[#444]">
                    {fixtureType === 'league-cum-knock-out'
                      ? 'Quarter Final Match Order'
                      : `${getKnockoutStageName(teamCount)} match order`
                    }
                  </h4>
                  <div className="max-w-[700px] border border-[#eee] rounded-md overflow-hidden">
                    <table className="w-full text-left text-[13px]">
                      <tbody className="divide-y divide-[#eee]">
                        {(fixtureType === 'league-cum-knock-out' || fixtureType === 'league-grand-finale') ? (
                          <>
                            {[
                              { p1: 'Winner of Pool A', p2: 'Runner of Pool C' },
                              { p1: 'Winner of Pool D', p2: 'Runner of Pool B' },
                              { p1: 'Winner of Pool C', p2: 'Runner of Pool A' },
                              { p1: 'Winner of Pool B', p2: 'Runner of Pool D' },
                            ].map((match, idx) => (
                              <tr key={idx} className="group hover:bg-[#f9f9f9] transition-colors">
                                <td className="py-2.5 px-4 font-bold text-[#555] bg-[#fdfdfd] w-[35%]">{match.p1}</td>
                                <td className="py-2.5 px-4 border-x border-[#eee] bg-white w-[50px]"></td>
                                <td className="py-2.5 px-4 font-bold text-[#555] text-center w-[10%]">Vs</td>
                                <td className="py-2.5 px-4 border-x border-[#eee] bg-white w-[50px]"></td>
                                <td className="py-2.5 px-4 font-bold text-[#555] bg-[#fdfdfd] w-[35%]">{match.p2}</td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <>
                            {Array.from({ length: Math.min(4, Math.floor(teamCount / 2)) }).map((_, idx) => (
                              <tr key={idx} className="group hover:bg-[#f9f9f9] transition-colors">
                                <td className="py-2.5 px-4 font-bold text-[#555] bg-[#fdfdfd] w-[35%]">Team {idx * 2 + 1}</td>
                                <td className="py-2.5 px-4 border-x border-[#eee] bg-white w-[50px]"></td>
                                <td className="py-2.5 px-4 font-bold text-[#555] text-center w-[10%]">Vs</td>
                                <td className="py-2.5 px-4 border-x border-[#eee] bg-white w-[50px]"></td>
                                <td className="py-2.5 px-4 font-bold text-[#555] bg-[#fdfdfd] w-[35%]">Team {idx * 2 + 2}</td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* League Specific Stages Info */}
                {fixtureType.includes('league') && (
                  <div className="flex gap-12 py-4 px-6 bg-[#f9f9f9] rounded-lg border border-[#eee] max-w-[700px]">
                    <div className="flex-1">
                      <h5 className="text-[12px] font-bold text-[#444] mb-2 uppercase tracking-wide">Next Stages</h5>
                      <div className="flex gap-4">
                        <span className="text-[12px] py-1 px-3 bg-white border border-[#ddd] rounded font-bold text-[#666]">Semi Final</span>
                        <span className="text-[12px] py-1 px-3 bg-white border border-[#ddd] rounded font-bold text-[#666]">Losers Final</span>
                        <span className="text-[12px] py-1 px-3 bg-[#444] text-white rounded font-bold">Grand Final</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Signatories Section */}
                <div className="pt-12 grid grid-cols-2 gap-20">
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-[14px] font-bold text-[#444] mb-1">Name</h5>
                      <p className="text-[12px] text-[#888] font-medium">Technical committee Chairman</p>
                    </div>
                    <div className="pt-4">
                      <p className="text-[12px] text-[#aaa] font-bold italic tracking-wide">Signature:</p>
                      <div className="h-[1px] w-full bg-[#eee] mt-8" />
                    </div>
                  </div>
                  <div className="space-y-6 text-right">
                    <div>
                      <h5 className="text-[14px] font-bold text-[#444] mb-1">Name</h5>
                      <p className="text-[12px] text-[#888] font-medium">Secretary</p>
                    </div>
                    <div className="pt-4">
                      <p className="text-[12px] text-[#aaa] font-bold italic tracking-wide">Signature:</p>
                      <div className="h-[1px] w-full bg-[#eee] mt-8" />
                    </div>
                  </div>
                </div>

                {/* Final Actions */}
                <div className="pt-12 flex justify-end gap-4 border-t border-[#f0f0f0]">
                  <button className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] text-[14px] px-10 py-2.5 rounded-lg font-bold transition-all active:scale-95">
                    Share
                  </button>
                  <button className="bg-[#4b4b4b] hover:bg-[#333] text-white text-[14px] px-10 py-2.5 rounded-lg font-bold transition-all shadow-md active:scale-95">
                    Download
                  </button>
                </div>
              </div>
            )}

            {selectedTab === 'Match Order' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex justify-between items-end border-b border-[#eee] pb-2">
                  <h3 className="text-[20px] font-bold text-[#444]">Match Order</h3>
                  <div className="flex gap-6">
                    {['Men', 'Women'].map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setSelectedGender(gender)}
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
                      <div className="flex items-center justify-between py-4 px-4 hover:bg-[#fcfcfc] transition-colors cursor-pointer">
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

                      {/* Expanded Section (Hardcoded for first item to match design) */}
                      {i === 1 && (
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
            )}

            {selectedTab === 'Attendance' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex justify-between items-end border-b border-[#eee] pb-2">
                  <h3 className="text-[20px] font-bold text-[#444]">Attendance Logs</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-6 border-b border-[#eee]">
                    {['State observer', 'Referees'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setSelectedAttendanceTab(tab)}
                        className={`pb-2 px-0 text-[15px] font-bold transition-all ${selectedAttendanceTab === tab
                          ? 'text-[#444] border-b-2 border-[#444]'
                          : 'text-[#bbb] hover:text-[#888]'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="py-2">
                    {selectedAttendanceTab === 'State observer' ? (
                      <div className="flex justify-between items-center group">
                        <span className="text-[14px] text-[#777] font-medium">{championship.observerDetails?.observerName || 'Observer Name'}</span>
                        <button
                          onClick={() => handleToggleAttendance('observer')}
                          className={`text-[14px] font-bold ${championship.attendance?.observerMarked ? 'text-green-500' : 'text-[#bbb] hover:text-[#888]'}`}
                        >
                          {championship.attendance?.observerMarked ? 'Marked' : 'Mark attendance'}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {[0, 1, 2].map((idx) => {
                          const ref = championship.attendance?.referees?.[idx];
                          return (
                            <div key={idx} className="flex justify-between items-center group">
                              <span className="text-[14px] text-[#777] font-medium">{ref?.name || `Referee ${idx + 1}`}</span>
                              <button
                                onClick={() => handleToggleAttendance('referee', idx)}
                                className={`text-[14px] font-bold ${ref?.marked ? 'text-green-500' : 'text-[#bbb] hover:text-[#888]'}`}
                              >
                                {ref?.marked ? 'Marked' : 'Mark attendance'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'Live Match Updates' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex justify-between items-end border-b border-[#eee] pb-2">
                  <h3 className="text-[20px] font-bold text-[#444]">Live Match Updates</h3>
                </div>

                <div className="space-y-0">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const matchId = i + 1;
                    const match = (championship.matches || []).find(m => m.id === matchId);
                    return (
                      <div key={matchId} className="py-4 border-b border-[#eee] last:border-b-0">
                        {editingMatchId === matchId ? (
                          <div className="flex items-start justify-between">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleUpdateScore(matchId, formData.get('s1') as string, formData.get('s2') as string);
                              }}
                              className="flex items-center gap-8"
                            >
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-[13px] text-[#888] font-bold">{match?.team1 || 'Team A'}</span>
                                <input
                                  name="s1"
                                  defaultValue={match?.score1}
                                  type="text"
                                  placeholder="Score"
                                  className="w-[120px] bg-[#f4f4f4] border-none text-[14px] py-2.5 px-4 rounded focus:ring-0 placeholder:text-[#ccc] font-medium"
                                />
                              </div>
                              <span className="text-[14px] font-black text-[#555] mt-8">VS</span>
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-[13px] text-[#888] font-bold">{match?.team2 || 'Team B'}</span>
                                <input
                                  name="s2"
                                  defaultValue={match?.score2}
                                  type="text"
                                  placeholder="Score"
                                  className="w-[120px] bg-[#f4f4f4] border-none text-[14px] py-2.5 px-4 rounded focus:ring-0 placeholder:text-[#ccc] font-medium"
                                />
                              </div>
                              <div className="flex gap-2 mt-8 ml-4">
                                <button
                                  type="button"
                                  onClick={() => setEditingMatchId(null)}
                                  className="bg-[#d9d9d9] hover:bg-[#ccc] text-[#666] text-[13px] px-6 py-2 rounded font-bold transition-all"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="bg-[#444] hover:bg-[#333] text-white text-[13px] px-8 py-2 rounded font-bold transition-all"
                                >
                                  Save
                                </button>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-12">
                              <div className="flex items-center gap-4">
                                <span className="text-[14px] text-[#555] font-bold w-[100px] text-right">{match?.team1 || 'Team A'}</span>
                                <span className="text-[18px] font-black text-[#444]">{match?.score1 || '-'}</span>
                              </div>
                              <span className="text-[14px] font-black text-[#555] tracking-widest opacity-20">VS</span>
                              <div className="flex items-center gap-4">
                                <span className="text-[18px] font-black text-[#444]">{match?.score2 || '-'}</span>
                                <span className="text-[14px] text-[#555] font-bold w-[100px] text-left">{match?.team2 || 'Team B'}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => setEditingMatchId(matchId)}
                              className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all"
                            >
                              {match?.score1 ? 'Edit Score' : 'Add Score'}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedTab === 'Reporting' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex justify-between items-center border-b border-[#eee] pb-4">
                  <h3 className="text-[20px] font-bold text-[#444]">Reporting</h3>
                  <button
                    onClick={() => setIsReportingOpen(true)}
                    className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all"
                  >
                    Add Report
                  </button>
                </div>

                <div className="space-y-6">
                  {(championship.reports || [
                    { id: '1', type: 'Rule issues logging', msg: 'Placeholder report...', status: 'Logged', time: '10:00' },
                    { id: '2', type: 'Technical delays.', msg: 'Placeholder report...', status: 'Logged', time: '11:00' }
                  ]).map((report) => (
                    <div key={report.id} className="flex justify-between items-start pt-2 border-b border-[#eee] pb-6 last:border-b-0">
                      <div className="space-y-2 flex-1 pr-12">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[14px] font-bold text-[#444]">{report.type}</h4>
                          <span className="text-[11px] text-[#aaa]">{report.time}</span>
                        </div>
                        <p className="text-[13px] text-[#888] leading-relaxed max-w-[600px]">
                          {report.msg}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (report.status === 'Logged') {
                            const newReports = (championship.reports || []).map(r =>
                              r.id === report.id ? { ...r, status: 'Solved' as const } : r
                            );
                            championshipStore.updateChampionship(id!, { reports: newReports });
                            refreshData();
                          }
                        }}
                        className={`text-[13px] px-8 py-2 rounded font-bold transition-all ${report.status === 'Solved'
                          ? 'bg-[#d9d9d9] text-[#aaa] cursor-default'
                          : 'bg-[#4d4d4d] hover:bg-[#333] text-white'
                          }`}
                      >
                        {report.status === 'Solved' ? 'Solved' : 'Resolve'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'Final updates' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b border-[#eee] pb-4">
                  <h3 className="text-[20px] font-bold text-[#444]">Final Updates</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Results Card - Full Width */}
                  <div className="col-span-2 bg-[#f6f6f6] rounded-xl p-8 space-y-6">
                    <h4 className="text-[14px] font-bold text-[#555]">Championship Final Results.</h4>
                    <button
                      onClick={() => setIsFinalResultsOpen(true)}
                      className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all"
                    >
                      Add Results
                    </button>
                  </div>

                  {/* Best Player Card */}
                  <div className="bg-[#f6f6f6] rounded-xl p-8 space-y-6">
                    <h4 className="text-[14px] font-bold text-[#555]">Best Player Awards</h4>
                    <button
                      onClick={() => setIsBestPlayerOpen(true)}
                      className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all"
                    >
                      Add Best player
                    </button>
                  </div>

                  {/* Guest Recognitions Card */}
                  <div className="bg-[#f6f6f6] rounded-xl p-8 space-y-6">
                    <h4 className="text-[14px] font-bold text-[#555]">Guest recognitions & mementos.</h4>
                    <button className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all">
                      Add Guest
                    </button>
                  </div>

                  {/* Attendance Logs Card */}
                  <div className="bg-[#f6f6f6] rounded-xl p-8 space-y-6">
                    <h4 className="text-[14px] font-bold text-[#555]">Referees & Committee attendance logs.</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-[20px] font-bold text-[#444]">Referee name</span>
                      <button className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all">
                        Add Attendance
                      </button>
                    </div>
                  </div>

                  {/* Selection List Card */}
                  <div className="bg-[#f6f6f6] rounded-xl p-8 space-y-6">
                    <h4 className="text-[14px] font-bold text-[#555]">Selection List</h4>
                    <button className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all">
                      Add Players
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'Championship Results' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex justify-between items-center border-b border-[#eee] pb-4">
                  <h3 className="text-[20px] font-bold text-[#444]">Championship Results</h3>
                  <div className="flex gap-4">
                    <button className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all">
                      Download
                    </button>
                    <button className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all">
                      Create Post
                    </button>
                  </div>
                </div>

                <div className="space-y-0 divide-y divide-[#eee] border-b border-[#eee]">
                  {[
                    { label: 'Winner', team: 'Team Name' },
                    { label: 'Runner-up', team: 'Team Name' },
                    { label: 'First Runner-up', team: 'Team Name' },
                    { label: '4th Position', team: 'Team Name' }
                  ].map((result, idx) => (
                    <div key={idx} className="flex py-6 px-2">
                      <div className="w-[180px]">
                        <span className="text-[14px] text-[#888] font-medium">{result.team}</span>
                      </div>
                      <div>
                        <span className="text-[14px] text-[#444] font-black">{result.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'Comprehensive Report.' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b border-[#eee] pb-4">
                  <h3 className="text-[20px] font-bold text-[#444]">Comprehensive Report</h3>
                </div>

                <div className="space-y-0 divide-y divide-[#eee] border-b border-[#eee]">
                  {[
                    'Championship Report #1',
                    'Championship Report #2'
                  ].map((report, idx) => (
                    <div key={idx} className="py-6 px-2">
                      <span className="text-[14px] text-[#888] font-medium">{report}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'Team Photos Album.' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b border-[#eee] pb-4">
                  <h3 className="text-[20px] font-bold text-[#444]">Team Photos Album</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { name: 'Team Idukki', img: 'file:///C:/Users/aakas/.gemini/antigravity/brain/e01d6a3f-8308-4c2f-aabb-4c03bbabb864/team_photo_1_1772874268914.png' },
                    { name: 'Team Kannur', img: 'file:///C:/Users/aakas/.gemini/antigravity/brain/e01d6a3f-8308-4c2f-aabb-4c03bbabb864/team_photo_2_1772874293583.png' },
                    { name: 'Team Thrissur', img: null },
                    { name: 'Team Ernakulam', img: null }
                  ].map((team, idx) => (
                    <div key={idx} className="bg-[#f6f6f6] rounded-xl p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[14px] text-[#555] font-bold">{team.name}</span>
                        <button className="text-[11px] font-black text-[#aaa] hover:text-[#444] uppercase tracking-widest">Upload</button>
                      </div>
                      <div className="aspect-video bg-white rounded-lg border-2 border-dashed border-[#eee] overflow-hidden flex items-center justify-center relative group">
                        {team.img ? (
                          <img src={team.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={team.name} />
                        ) : (
                          <PlusIcon className="w-10 h-10 text-[#eee] group-hover:text-[#ccc] transition-colors" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'Roster Forms' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b border-[#eee] pb-4">
                  <h3 className="text-[20px] font-bold text-[#444]">Roster Forms</h3>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} className="bg-[#f6f6f6] rounded-xl p-6 space-y-4 flex flex-col items-start aspect-square">
                      <span className="text-[14px] text-[#555] font-bold">Match Name</span>
                      <div className="flex-1 w-full flex items-center justify-center py-4 text-[#bfbfbf]">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'Selection List' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex justify-between items-center border-b border-[#eee] pb-4">
                  <h3 className="text-[20px] font-bold text-[#444]">Selection List</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        const name = prompt('Enter Player Name:');
                        const team = prompt('Enter Team Name:');
                        if (name && team) handleAddSelection(name, team);
                      }}
                      className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all"
                    >
                      Add Player
                    </button>
                    <button className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all">
                      Download
                    </button>
                  </div>
                </div>

                <div className="space-y-0 divide-y divide-[#eee] border-b border-[#eee]">
                  {(championship.selectionList || [
                    { name: 'John Doe', team: 'Team Idukki' },
                    { name: 'Jane Smith', team: 'Team Kannur' }
                  ]).map((player, idx) => (
                    <div key={idx} className="py-5 px-2">
                      <span className="text-[14px] text-[#888] font-medium italic">{player.name} - <span className="not-italic">{player.team}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!LIVE_TABS.concat(POST_TABS).includes(selectedTab) && (
              <div className="flex flex-col items-center justify-center py-40 bg-[#f9f9f9] rounded-xl border border-[#ececec] flex-1">
                <p className="text-[#888] font-medium">{selectedTab} Information</p>
                <p className="text-[13px] text-[#aaa] mt-1">This module is currently being implemented.</p>
              </div>
            )}
          </div>

          {/* Disclaimer Footer - Only show in Fixture tab */}
          {selectedTab === 'Fixture' && (
            <div className="mt-20 pt-10 border-t border-transparent">
              <p className="text-[11px] text-[#777] leading-relaxed max-w-[750px] font-medium">
                <span className="font-bold uppercase tracking-tight">Disclaimer:</span> Organizing committee has the right to change the match order, venue and time without notice. teams will be informed through email and whatsapp if such requirement occurs. Disputed / Protests or officiating calls shall be raised with proof in writing to the Chairman, Technical committee/ Chairman Referees Board / Secretary / Championship Director in written within 1 hour of the completion of match through our website by submitting a Protest fee of Rs.2000/- which will not be refunded if the protest turn down by the concern committee.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reporting SlideOver */}
      <SlideOver isOpen={isReportingOpen} onClose={() => setIsReportingOpen(false)} width="max-w-[400px]">
        <div className="space-y-8">
          <h2 className="text-[24px] font-bold text-[#444]">Reporting</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddReport(formData.get('type') as string, formData.get('details') as string);
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="relative">
                <select name="type" className="w-full appearance-none bg-[#f4f4f4] border-none text-[15px] py-3.5 pl-4 pr-10 rounded focus:ring-0 cursor-pointer font-medium">
                  <option value="">Select Reporting</option>
                  <option value="Rule problems">Rule issues logging</option>
                  <option value="Technical Delay">Technical delays</option>
                  <option value="Match conduct">Match conduct updates</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon className="w-4 h-4 text-[#aaa]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#444]">Details</label>
              <textarea
                name="details"
                placeholder="Enter report details"
                className="w-full h-40 bg-[#f4f4f4] border-none text-[15px] py-4 px-4 rounded focus:ring-0 placeholder:text-[#aaa] font-medium resize-none"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-[#444] hover:bg-[#333] text-white text-[14px] px-14 py-3 rounded font-bold transition-all shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </SlideOver>

      {/* Final Results SlideOver */}
      <SlideOver isOpen={isFinalResultsOpen} onClose={() => setIsFinalResultsOpen(false)} width="max-w-[400px]">
        <div className="space-y-8">
          <h2 className="text-[24px] font-bold text-[#444]">Final Results</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddResult(formData.get('res') as string, formData.get('team') as string, formData.get('score') as string);
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#777]">Results</label>
              <div className="relative">
                <select name="res" className="w-full appearance-none bg-[#f4f4f4] border-none text-[15px] py-3.5 pl-4 pr-10 rounded focus:ring-0 cursor-pointer font-medium">
                  <option value="">Select Result</option>
                  <option value="winner">Winner</option>
                  <option value="runner">Runner Up</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon className="w-4 h-4 text-[#aaa]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#777]">Team</label>
              <div className="relative">
                <select name="team" className="w-full appearance-none bg-[#f4f4f4] border-none text-[15px] py-3.5 pl-4 pr-10 rounded focus:ring-0 cursor-pointer font-medium">
                  <option value="">Select Team</option>
                  <option value="team1">Team A</option>
                  <option value="team2">Team B</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon className="w-4 h-4 text-[#aaa]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#777]">Score</label>
              <input
                name="score"
                type="text"
                placeholder="Enter Score"
                className="w-full bg-[#f4f4f4] border-none text-[15px] py-4 px-4 rounded focus:ring-0 placeholder:text-[#ccc] font-medium"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-[#444] hover:bg-[#333] text-white text-[14px] px-14 py-3 rounded font-bold transition-all shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </SlideOver>

      {/* Add Best Player SlideOver */}
      <SlideOver isOpen={isBestPlayerOpen} onClose={() => setIsBestPlayerOpen(false)} width="max-w-[400px]">
        <div className="space-y-8">
          <h2 className="text-[24px] font-bold text-[#444]">Add Best Player</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddBestPlayer(formData.get('name') as string, formData.get('match') as string);
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#777]">Player Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter Player"
                className="w-full bg-[#f4f4f4] border-none text-[15px] py-4 px-4 rounded focus:ring-0 placeholder:text-[#ccc] font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#777]">Select match/ Championship</label>
              <div className="relative">
                <select name="match" className="w-full appearance-none bg-[#f4f4f4] border-none text-[15px] py-3.5 pl-4 pr-10 rounded focus:ring-0 cursor-pointer font-medium">
                  <option value="">Select Result</option>
                  <option value="Final Match">Final Match</option>
                  <option value="Whole Championship">Whole Championship</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon className="w-4 h-4 text-[#aaa]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#777]">Position</label>
              <div className="relative">
                <select name="pos" className="w-full appearance-none bg-[#f4f4f4] border-none text-[15px] py-3.5 pl-4 pr-10 rounded focus:ring-0 cursor-pointer font-medium">
                  <option value="">Select Position</option>
                  <option value="1">1st Place</option>
                  <option value="2">2nd Place</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon className="w-4 h-4 text-[#aaa]" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-[#444] hover:bg-[#333] text-white text-[14px] px-14 py-3 rounded font-bold transition-all shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </SlideOver>
    </div>
  );
}
