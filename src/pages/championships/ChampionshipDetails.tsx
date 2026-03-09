import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronUpIcon, ChevronDownIcon, PlusIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import SlideOver from '../../components/ui/SlideOver';
import { championshipStore, type Championship } from '../../lib/championshipStore';
import { 
  FixtureConfiguration, 
  KnockoutBracket
} from '../../components/championships';

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
    title: '26th Senior State Championship - Upcoming',
    groundName: 'Thodupuzha Ground',
    place: 'Thodupuzha',
    district: 'Idukki',
  },
  'mock-2': {
    title: '26th Senior State Championship - Ongoing',
    groundName: 'Trivandrum Ground',
    place: 'Thodupuzha',
    district: 'Idukki',
  }
};

// Generate match orders based on fixture type
const generateMatchOrders = (teams: {name: string; id: string}[], fixtureType: string) => {
  if (!teams.length || !fixtureType) return [];
  
  const matches = [];
  let matchId = 1;
  
  if (fixtureType === 'knock-out') {
    // Simple knockout bracket
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffledTeams.length - 1; i += 2) {
      const isCompleted = matchId <= 2; // First 2 matches are completed
      matches.push({
        id: matchId++,
        team1: shuffledTeams[i]?.name || `Team ${i + 1}`,
        team2: shuffledTeams[i + 1]?.name || `Team ${i + 2}`,
        round: 'Quarter Final',
        time: `10:${String(matchId * 2).padStart(2, '0')} AM`,
        pitch: `Pitch ${Math.ceil(matchId / 2)}`,
        status: isCompleted ? 'Completed' : 'Upcoming',
        score: isCompleted ? '7-0' : undefined,
        playerOfMatch: isCompleted ? 'John Doe' : undefined
      });
    }
  } else if (fixtureType === 'round-robin') {
    // Round robin - each team plays every other team
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const isCompleted = matchId <= 3; // First 3 matches are completed
        matches.push({
          id: matchId++,
          team1: teams[i]?.name || `Team ${i + 1}`,
          team2: teams[j]?.name || `Team ${j + 1}`,
          round: `Pool Match ${matchId}`,
          time: `${9 + Math.floor(matchId / 3)}:${String((matchId % 3) * 20).padStart(2, '0')} AM`,
          pitch: `Pitch ${((matchId - 1) % 4) + 1}`,
          status: isCompleted ? 'Completed' : 'Upcoming',
          score: isCompleted ? `${Math.floor(Math.random() * 5)}-${Math.floor(Math.random() * 3)}` : undefined,
          playerOfMatch: isCompleted ? ['John Doe', 'Jane Smith', 'Mike Johnson'][Math.min(matchId - 1, 2)] : undefined
        });
      }
    }
  } else if (fixtureType.includes('league')) {
    // League stages with pools
    const teamsPerPool = Math.ceil(teams.length / 4);
    const pools = ['A', 'B', 'C', 'D'];
    
    for (let p = 0; p < 4 && p * teamsPerPool < teams.length; p++) {
      const poolTeams = teams.slice(p * teamsPerPool, (p + 1) * teamsPerPool);
      
      // Round robin within each pool
      for (let i = 0; i < poolTeams.length; i++) {
        for (let j = i + 1; j < poolTeams.length; j++) {
          const isCompleted = matchId <= 2; // First 2 matches are completed
          matches.push({
            id: matchId++,
            team1: poolTeams[i]?.name || `Team ${i + 1}`,
            team2: poolTeams[j]?.name || `Team ${j + 1}`,
            round: `Pool ${pools[p]}`,
            time: `${9 + Math.floor(matchId / 3)}:${String((matchId % 3) * 20).padStart(2, '0')} AM`,
            pitch: `Pitch ${((matchId - 1) % 4) + 1}`,
            status: isCompleted ? 'Completed' : 'Upcoming',
            score: isCompleted ? `${Math.floor(Math.random() * 6)}-${Math.floor(Math.random() * 2)}` : undefined,
            playerOfMatch: isCompleted ? ['John Doe', 'Jane Smith'][Math.min(matchId - 1, 1)] : undefined
          });
        }
      }
    }
    
    // Add knockout matches if format includes it
    if (fixtureType.includes('knock-out') && teams.length >= 4) {
      // Get winners and runners from pools for more realistic matchups
      const poolWinners = [];
      const poolRunners = [];
      
      for (let p = 0; p < 4 && p * teamsPerPool < teams.length; p++) {
        const poolTeams = teams.slice(p * teamsPerPool, (p + 1) * teamsPerPool);
        if (poolTeams.length >= 2) {
          poolWinners.push(poolTeams[0]?.name || `Winner Pool ${String.fromCharCode(65 + p)}`);
          poolRunners.push(poolTeams[1]?.name || `Runner Pool ${String.fromCharCode(65 + p)}`);
        }
      }
      
      // Create quarter final matches with actual team names
      if (poolWinners.length >= 2 && poolRunners.length >= 2) {
        matches.push({
          id: matchId++,
          team1: poolWinners[0] || 'Winner Pool A',
          team2: poolRunners[2] || 'Runner Pool C',
          round: 'Quarter Final',
          time: '2:00 PM',
          pitch: 'Main Pitch',
          status: 'Upcoming'
        });
        matches.push({
          id: matchId++,
          team1: poolWinners[3] || 'Winner Pool D',
          team2: poolRunners[1] || 'Runner Pool B',
          round: 'Quarter Final',
          time: '2:30 PM',
          pitch: 'Main Pitch',
          status: 'Upcoming'
        });
      }
    }
  }
  
  return matches;
};

export default function ChampionshipDetails() {
  const { id } = useParams();
  const [championship, setChampionship] = useState<Partial<Championship> | null>(null);
  const [expandedCategories, setExpandedCategories] = useState(['Live']);
  const [selectedTab, setSelectedTab] = useState<string>('Match Order');
  const [isFixtureSubmitted, setIsFixtureSubmitted] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Men');
  const [selectedAttendanceTab, setSelectedAttendanceTab] = useState('State observer');
  const [editingMatchId, setEditingMatchId] = useState<number | null>(1);
  const [isReportingOpen, setIsReportingOpen] = useState(false);
  const [isFinalResultsOpen, setIsFinalResultsOpen] = useState(false);
  const [isBestPlayerOpen, setIsBestPlayerOpen] = useState(false);
  const [fixtureType, setFixtureType] = useState('');
  const [teamCount, setTeamCount] = useState(16);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isGeneratingFixture, setIsGeneratingFixture] = useState(false);
  const [teams, setTeams] = useState<{name: string; id: string}[]>([]);
  const [showTeamManagement, setShowTeamManagement] = useState(false);
  const [matchOrders, setMatchOrders] = useState<{id: number; team1: string; team2: string; round: string; time: string; pitch: string; status: string; score?: string; playerOfMatch?: string}[]>([]);
  const [expandedMatchId, setExpandedMatchId] = useState<number | null>(null);

  const refreshData = () => {
    if (id && !id.startsWith('mock-')) {
      const data = championshipStore.getChampionshipById(id);
      if (data) setChampionship(data);
    }
  };

  useEffect(() => {
    if (id) {
      if (id.startsWith('mock-')) {
        const mockChamp = MOCK_DATA[id] || null;
        // Initialize attendance data for mock championships
        if (mockChamp) {
          setChampionship({
            ...mockChamp,
            attendance: {
              observerMarked: false,
              referees: [
                { name: 'Referee 1', marked: false },
                { name: 'Referee 2', marked: false },
                { name: 'Referee 3', marked: false }
              ]
            }
          });
        }
      } else {
        const data = championshipStore.getChampionshipById(id);
        if (data) {
          // Initialize attendance data if not present
          const championshipWithAttendance = {
            ...data,
            attendance: data.attendance || {
              observerMarked: false,
              referees: [
                { name: 'Referee 1', marked: false },
                { name: 'Referee 2', marked: false },
                { name: 'Referee 3', marked: false }
              ]
            }
          };
          setChampionship(championshipWithAttendance);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    // Auto-set fixture configuration for ongoing championships
    if (!fixtureType && !isFixtureSubmitted && championship?.title?.includes('Ongoing')) {
      setFixtureType('knock-out');
      setTeamCount(16);
      // Generate random teams automatically for ongoing championships
      const teamNames = [
        'Idukki Eagles', 'Kannur Kings', 'Thrissur Tigers', 'Ernakulam Warriors',
        'Kozhikode Knights', 'Palakkad Panthers', 'Malappuram Mavericks', 'Kollam Cobras',
        'Alappuzha Archers', 'Pathanamthitta Patriots', 'Wayanad Wolves', 'Kottayam Crusaders',
        'Thiruvananthapuram Titans', 'Kasaragod Giants', 'Chennai Champions', 'Bangalore Blazers'
      ];
      
      const newTeams = teamNames.slice(0, 16).map((name, index) => ({
        id: (index + 1).toString(),
        name
      }));
      
      setTeams(newTeams);
      setIsFixtureSubmitted(true);
      
      // Store fixture configuration
      if (id && championship) {
        championshipStore.updateChampionship(id, {
          fixtureConfig: {
            type: 'knock-out',
            teamCount: 16,
            generatedAt: new Date().toISOString()
          }
        });
      }
    }
  }, [fixtureType, isFixtureSubmitted, id, championship]);

  useEffect(() => {
    setMatchOrders(generateMatchOrders(teams, fixtureType));
  }, [teams, fixtureType]);

  const handleUpdateScore = (matchId: number, score1: string, score2: string) => {
    // Update matchOrders state for both new and existing scores
    setMatchOrders(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, score: `${score1}-${score2}`, status: 'Completed' }
        : match
    ));
    
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
    
    if (id.startsWith('mock-')) {
      // For mock championships, update local state directly
      setChampionship(prev => prev ? { ...prev, attendance } : null);
    } else {
      // For real championships, update store
      championshipStore.updateChampionship(id, { attendance });
      refreshData();
    }
  };

  const handleAddSelection = (name: string, team: string) => {
    if (!id || !championship) return;
    const selectionList = [...(championship.selectionList || [])];
    selectionList.push({ name, team });
    championshipStore.updateChampionship(id, { selectionList });
    refreshData();
  };

  const validateFixtureForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!fixtureType) {
      errors.fixtureType = 'Please select a fixture type';
    }
    
    if (!teamCount) {
      errors.teamCount = 'Please select number of teams';
    }
    
    if (fixtureType?.includes('league') && teamCount < 4) {
      errors.teamCount = 'League formats require at least 4 teams';
    }
    
    if (fixtureType?.includes('knock-out') && teamCount < 2) {
      errors.teamCount = 'Knockout formats require at least 2 teams';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFixtureSubmit = async () => {
    if (!validateFixtureForm()) return;
    
    setIsGeneratingFixture(true);
    
    // Simulate fixture generation
    setTimeout(() => {
      setIsGeneratingFixture(false);
      setIsFixtureSubmitted(true);
      
      // Store fixture configuration
      if (id && championship) {
        championshipStore.updateChampionship(id, {
          fixtureConfig: {
            type: fixtureType,
            teamCount,
            generatedAt: new Date().toISOString()
          }
        });
      }
    }, 1500);
  };

  const handleAddTeam = (name: string) => {
    if (!name.trim()) return;
    const newTeam = {
      id: Date.now().toString(),
      name: name.trim()
    };
    setTeams(prev => [...prev, newTeam]);
  };

  const handleRemoveTeam = (id: string) => {
    setTeams(prev => prev.filter(team => team.id !== id));
  };

  const generateRandomTeams = () => {
    const teamNames = [
      'Idukki Eagles', 'Kannur Kings', 'Thrissur Tigers', 'Ernakulam Warriors',
      'Kozhikode Knights', 'Palakkad Panthers', 'Malappuram Mavericks', 'Kollam Cobras',
      'Alappuzha Archers', 'Pathanamthitta Patriots', 'Wayanad Wolves', 'Kottayam Crusaders',
      'Thiruvananthapuram Titans', 'Kasaragod Giants', 'Chennai Champions', 'Bangalore Blazers'
    ];
    
    const newTeams = teamNames.slice(0, teamCount).map((name, index) => ({
      id: (index + 1).toString(),
      name
    }));
    
    setTeams(newTeams);
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
        <div className="w-[220px] shrink-0 space-y-2">

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
              <FixtureConfiguration
                fixtureType={fixtureType}
                teamCount={teamCount}
                teams={teams}
                formErrors={formErrors}
                isGeneratingFixture={isGeneratingFixture}
                showTeamManagement={showTeamManagement}
                onFixtureTypeChange={(value) => {
                  setFixtureType(value);
                  if (formErrors.fixtureType) {
                    setFormErrors(prev => ({ ...prev, fixtureType: '' }));
                  }
                }}
                onTeamCountChange={(value) => {
                  setTeamCount(value);
                  if (formErrors.teamCount) {
                    setFormErrors(prev => ({ ...prev, teamCount: '' }));
                  }
                }}
                onAddTeam={handleAddTeam}
                onRemoveTeam={handleRemoveTeam}
                onGenerateRandomTeams={generateRandomTeams}
                onToggleTeamManagement={() => setShowTeamManagement(!showTeamManagement)}
                onSubmit={handleFixtureSubmit}
                onReset={() => {
                  setFixtureType('');
                  setTeamCount(16);
                  setTeams([]);
                  setFormErrors({});
                }}
              />
            )}

            {selectedTab === 'Fixture' && isFixtureSubmitted && (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                {/* Header with gender toggle and edit button */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[20px] font-bold text-[#444]">Fixture</h3>
                    <button
                      onClick={() => {
                        setIsFixtureSubmitted(false);
                        setFormErrors({});
                      }}
                      className="text-[12px] text-[#666] hover:text-[#444] font-medium underline underline-offset-2"
                    >
                      Edit Configuration
                    </button>
                  </div>
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

                {/* ═══════════════════════════════════════════════════════════════
                    LEAGUE CUM KNOCK-OUT / LEAGUE GRAND FINALE
                    Shows: 4 Groups → QF → SF → Final bracket
                ═══════════════════════════════════════════════════════════════ */}
                {(fixtureType === 'league-cum-knock-out' || fixtureType === 'league-grand-finale') && (
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
                                <div className="flex justify-between items-center text-[13px] font-bold text-[#444]">
                                  <span className="truncate">{teams[0]?.name || 'Winner Pool A'}</span>
                                  <span className="text-[#bbb] flex-shrink-0">vs</span>
                                  <span className="truncate">{teams[1]?.name || 'Runner Pool B'}</span>
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
                                <div className="flex justify-between items-center text-[13px] font-bold text-[#666]">
                                  <span className="truncate">Winner QF{i * 2 + 1}</span>
                                  <span className="text-[#bbb] flex-shrink-0">vs</span>
                                  <span className="truncate">Winner QF{i * 2 + 2}</span>
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
                            <div className="flex justify-between items-center text-[13px] font-bold">
                              <span className="truncate">Winner SF1</span>
                              <span className="text-[#bbb] flex-shrink-0">vs</span>
                              <span className="truncate">Winner SF2</span>
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
                )}

                {/* ═══════════════════════════════════════════════════════════════
                    KNOCK-OUT — Classic visual bracket
                    Left side teams flow → center, right side ← center, trophy in middle
                ═══════════════════════════════════════════════════════════════ */}
                <KnockoutBracket teams={teams} teamCount={teamCount} />


                {/* ── SIGNATORIES ── */}
                <div className="pt-10 grid grid-cols-2 gap-20">
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

                {/* ── FINAL ACTIONS ── */}
                <div className="pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-[#f0f0f0]">
                  <div className="text-[12px] text-[#666] font-medium">
                    {championship.fixtureConfig && (
                      <span>Generated: {new Date(championship.fixtureConfig.generatedAt).toLocaleDateString()} • {championship.fixtureConfig.teamCount} teams</span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] text-[14px] px-10 py-2.5 rounded-lg font-bold transition-all active:scale-95"
                      onClick={() => {
                        // Share functionality
                        if (navigator.share) {
                          navigator.share({
                            title: `${championship.title} - Fixtures`,
                            text: `Check out the fixtures for ${championship.title}`,
                            url: window.location.href
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Link copied to clipboard!');
                        }
                      }}
                    >
                      Share
                    </button>
                    <button 
                      className="bg-[#4b4b4b] hover:bg-[#333] text-white text-[14px] px-10 py-2.5 rounded-lg font-bold transition-all shadow-md active:scale-95"
                      onClick={() => {
                        // Export functionality - create a simple text export
                        const fixtureData = {
                          championship: championship.title,
                          type: fixtureType,
                          teamCount: teamCount,
                          generatedAt: new Date().toISOString(),
                          teams: teams.map(t => t.name)
                        };
                        
                        const dataStr = JSON.stringify(fixtureData, null, 2);
                        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                        
                        const exportFileDefaultName = `${championship.title?.replace(/\s+/g, '_') || 'championship'}_fixtures.json`;
                        
                        const linkElement = document.createElement('a');
                        linkElement.setAttribute('href', dataUri);
                        linkElement.setAttribute('download', exportFileDefaultName);
                        linkElement.click();
                      }}
                    >
                      Download
                    </button>
                  </div>
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
                  {(matchOrders.length === 0 ? Array.from({ length: 8 }, (_, i) => ({
                    id: i + 1,
                    team1: 'Team Name',
                    team2: 'Team Name',
                    round: 'Match',
                    time: '10:00 AM',
                    pitch: 'Pitch 1',
                    status: 'Upcoming',
                    score: undefined,
                    playerOfMatch: undefined
                  })) : matchOrders).map((match) => (
                    <div key={match.id} className="group flex flex-col border-b border-[#eee] last:border-b-0">
                      <div 
                        className="flex items-center justify-between py-4 px-4 hover:bg-[#fcfcfc] transition-colors cursor-pointer"
                        onClick={() => setExpandedMatchId(expandedMatchId === match.id ? null : match.id)}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <span className="text-[14px] text-[#888] font-medium w-6">{match.id}.</span>
                          <span className="text-[14px] text-[#555] font-bold truncate" title={match.team1}>{match.team1}</span>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-[14px] font-black text-[#555] tracking-widest">VS</span>
                          <span className="text-[10px] text-[#aaa] font-medium mt-1">{match.round}</span>
                        </div>
                        <div className="flex items-center justify-between flex-1">
                          <span className="text-[14px] text-[#555] font-bold truncate" title={match.team2}>{match.team2}</span>
                          {expandedMatchId === match.id ? (
                            <div className="w-5 h-5 flex items-center justify-center">
                              <div className="w-3 h-[2px] bg-[#bbb]" />
                            </div>
                          ) : (
                            <PlusIcon className="w-5 h-5 text-[#bbb]" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Section */}
                      {expandedMatchId === match.id && (
                        <div className="bg-[#d9d9d9] py-3 px-10 flex gap-12">
                          {match.status === 'Completed' ? (
                            <>
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] text-[#666] font-bold">Score:</span>
                                <span className="text-[14px] text-[#444] font-black">{match.score || '7-0'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] text-[#666] font-bold">Player of the Match:</span>
                                <span className="text-[14px] text-[#444] font-black">{match.playerOfMatch || 'John Doe'}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] text-[#666] font-bold">Time:</span>
                                <span className="text-[14px] text-[#444] font-black">{match.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] text-[#666] font-bold">Pitch:</span>
                                <span className="text-[14px] text-[#444] font-black">{match.pitch}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] text-[#666] font-bold">Status:</span>
                                <span className="text-[14px] text-[#444] font-black">{match.status}</span>
                              </div>
                            </>
                          )}
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
                  {(matchOrders.length === 0 ? Array.from({ length: 7 }, (_, i) => ({
                    id: i + 1,
                    team1: 'Team Name',
                    team2: 'Team Name',
                    round: 'Match',
                    time: '10:00 AM',
                    pitch: 'Pitch 1',
                    status: 'Upcoming',
                    score: undefined,
                    playerOfMatch: undefined
                  })) : matchOrders.slice(0, 7)).map((match) => {
                    return (
                      <div key={match.id} className="py-4 border-b border-[#eee] last:border-b-0">
                        {editingMatchId === match.id ? (
                          <div className="flex items-start justify-between">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleUpdateScore(match.id, formData.get('s1') as string, formData.get('s2') as string);
                              }}
                              className="flex items-center gap-8"
                            >
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-[13px] text-[#888] font-bold">{match.team1}</span>
                                <input
                                  name="s1"
                                  defaultValue={match.score?.split('-')[0]}
                                  type="text"
                                  placeholder="Enter Score"
                                  className="w-[120px] bg-[#f4f4f4] border-none text-[14px] py-2.5 px-4 rounded focus:ring-0 placeholder:text-[#ccc] font-medium"
                                />
                              </div>
                              <span className="text-[14px] font-black text-[#555] mt-8">VS</span>
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-[13px] text-[#888] font-bold">{match.team2}</span>
                                <input
                                  name="s2"
                                  defaultValue={match.score?.split('-')[1]}
                                  type="text"
                                  placeholder="Enter Score"
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
                            <div className="flex items-center gap-8">
                              <div className="flex flex-col items-center">
                                <span className="text-[14px] text-[#555] font-bold">{match.team1}</span>
                                {match.score && <span className="text-[18px] font-black text-[#444] mt-1">{match.score?.split('-')[0]}</span>}
                              </div>
                              <span className="text-[14px] font-black text-[#555] tracking-widest opacity-20">VS</span>
                              <div className="flex flex-col items-center">
                                <span className="text-[14px] text-[#555] font-bold">{match.team2}</span>
                                {match.score && <span className="text-[18px] font-black text-[#444] mt-1">{match.score?.split('-')[1]}</span>}
                              </div>
                            </div>
                            <button
                              onClick={() => setEditingMatchId(match.id)}
                              className="bg-[#4d4d4d] hover:bg-[#333] text-white text-[13px] px-6 py-2 rounded font-bold transition-all"
                            >
                              {match.score ? 'Edit Score' : 'Add Score'}
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
