import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FixtureConfigurationProps {
  fixtureType: string;
  teamCount: number;
  teams: { name: string; id: string }[];
  formErrors: { [key: string]: string };
  isGeneratingFixture: boolean;
  showTeamManagement: boolean;
  onFixtureTypeChange: (type: string) => void;
  onTeamCountChange: (count: number) => void;
  onAddTeam: (name: string) => void;
  onRemoveTeam: (id: string) => void;
  onGenerateRandomTeams: () => void;
  onToggleTeamManagement: () => void;
  onSubmit: () => void;
  onReset: () => void;
}

export default function FixtureConfiguration({
  fixtureType,
  teamCount,
  teams,
  formErrors,
  isGeneratingFixture,
  showTeamManagement,
  onFixtureTypeChange,
  onTeamCountChange,
  onAddTeam,
  onRemoveTeam,
  onGenerateRandomTeams,
  onToggleTeamManagement,
  onSubmit,
  onReset
}: FixtureConfigurationProps) {
  return (
    <div className="space-y-8 flex-1 animate-in fade-in duration-300">
      <h3 className="text-[20px] font-bold text-[#444]">Fixture Configuration</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[600px]">
        {/* Type Selection */}
        <div className="space-y-4">
          <label className="text-[14px] text-[#777] font-medium">Tournament Type</label>
          <div className="relative">
            <select
              value={fixtureType}
              onChange={(e) => {
                onFixtureTypeChange(e.target.value);
              }}
              className={`w-full appearance-none bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 pl-4 pr-10 rounded focus:ring-0 cursor-pointer font-medium ${
                formErrors.fixtureType ? 'ring-2 ring-red-400' : ''
              }`}
            >
              <option value="">Select Fixture Type</option>
              <option value="knock-out">Knock out</option>
              <option value="league-cum-knock-out">League cum knock out</option>
              <option value="league-grand-finale">League cum knock out cum Grand finale</option>
              <option value="round-robin">Round robin league</option>
              <option value="knock-out-cum-league">Knock out cum league</option>
            </select>
            <ChevronDownIcon className="w-4 h-4 text-[#4b4b4b] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
          </div>
          {formErrors.fixtureType && (
            <p className="text-[12px] text-red-500 font-medium">{formErrors.fixtureType}</p>
          )}
        </div>

        {/* Team no. Selection */}
        <div className="space-y-4">
          <label className="text-[14px] text-[#777] font-medium">Number of Teams</label>
          <div className="relative">
            <select
              value={teamCount}
              onChange={(e) => {
                onTeamCountChange(Number(e.target.value));
              }}
              className={`w-full appearance-none bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 pl-4 pr-10 rounded focus:ring-0 cursor-pointer font-medium ${
                formErrors.teamCount ? 'ring-2 ring-red-400' : ''
              }`}
            >
              <option value="">Select Team Count</option>
              {[16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 4, 3, 2].map((num) => (
                <option key={num} value={num}>{num} Teams</option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 text-[#4b4b4b] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
          </div>
          {formErrors.teamCount && (
            <p className="text-[12px] text-red-500 font-medium">{formErrors.teamCount}</p>
          )}
        </div>
      </div>

      {/* Team Management Section */}
      <div className="max-w-[600px] space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[14px] text-[#777] font-medium">Team Management</label>
          <button
            type="button"
            onClick={onToggleTeamManagement}
            className="text-[12px] text-[#666] hover:text-[#444] font-medium underline underline-offset-2"
          >
            {showTeamManagement ? 'Hide' : 'Show'} Team Setup
          </button>
        </div>
        
        {showTeamManagement && (
          <div className="bg-[#f9f9f9] border border-[#e8e8e8] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter team name"
                  className="bg-white border border-[#ddd] text-[14px] py-2.5 px-4 rounded focus:ring-2 focus:ring-[#4b4b4b] focus:border-transparent placeholder:text-[#aaa] font-medium"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      onAddTeam((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={onGenerateRandomTeams}
                  className="bg-[#666] hover:bg-[#555] text-white text-[12px] px-4 py-2.5 rounded font-medium transition-all"
                >
                  Generate Random Teams
                </button>
              </div>
              <span className="text-[12px] text-[#888] font-medium">
                {teams.length} / {teamCount} teams
              </span>
            </div>
            
            {teams.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {teams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between bg-white border border-[#ddd] rounded px-3 py-2">
                    <span className="text-[13px] font-medium text-[#555] truncate">{team.name}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveTeam(team.id)}
                      className="text-red-500 hover:text-red-700 text-[16px] font-bold ml-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center max-w-[600px] pt-4">
        <div className="text-[12px] text-[#888] font-medium">
          {fixtureType && teamCount && (
            <span>Configuring: {teamCount} teams • {fixtureType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          )}
        </div>
        <div className="flex gap-4">
          <button 
            className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#777] text-[14px] px-8 py-2.5 rounded font-bold transition-all"
            onClick={onReset}
          >
            Reset
          </button>
          <button
            onClick={onSubmit}
            disabled={isGeneratingFixture}
            className={`bg-[#4b4b4b] hover:bg-[#333] text-white text-[14px] px-10 py-2.5 rounded font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
              isGeneratingFixture ? 'animate-pulse' : ''
            }`}
          >
            {isGeneratingFixture ? 'Generating...' : 'Generate Fixture'}
          </button>
        </div>
      </div>
    </div>
  );
}
