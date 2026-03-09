interface KnockoutBracketProps {
  teams: { name: string; id: string }[];
  teamCount: number;
}

export default function KnockoutBracket({ teams, teamCount }: KnockoutBracketProps) {
  // ── bracket size (next power of 2 ≥ teamCount) ──────────────
  const bracketSize = teamCount <= 2 ? 2 : teamCount <= 4 ? 4 : teamCount <= 8 ? 8 : 16;
  const halfSize = bracketSize / 2; // slots per side

  // ── fill slots with team names + BYEs ────────────────────────
  const allSlots: string[] = Array.from({ length: bracketSize }, (_, i) => {
    if (i < teams.length) {
      return teams[i].name;
    } else if (i < teamCount) {
      return `Team ${i + 1}`;
    } else {
      return 'BYE';
    }
  });
  const leftSlots = allSlots.slice(0, halfSize);
  const rightSlots = allSlots.slice(halfSize);

  // ── build rounds for one side (array of [t1,t2] pairs) ───────
  const buildSideRounds = (slots: string[]): [string, string][][] => {
    const rounds: [string, string][][] = [];
    let cur = [...slots];
    let matchIdx = 1;
    while (cur.length > 1) {
      const pairs: [string, string][] = [];
      for (let i = 0; i < cur.length; i += 2)
        pairs.push([cur[i], cur[i + 1] ?? 'BYE']);
      rounds.push(pairs);
      cur = pairs.map((_, i) => `W${matchIdx + i}`);
      matchIdx += pairs.length;
    }
    return rounds;
  };

  const leftRounds = buildSideRounds(leftSlots);   // e.g. 3 rounds for 8 slots
  const rightRounds = buildSideRounds(rightSlots);  // same

  // ── round labels ─────────────────────────────────────────────
  const allLabels = ['', '', '']; // ['Pre-QF', 'Quarter Final', 'Semi Final'] - commented out
  const startIdx = allLabels.length - leftRounds.length;
  const roundLabels = allLabels.slice(startIdx);

  // ── visual constants ─────────────────────────────────────────
  const SLOT_H = 28;       // px: height of one team slot
  const CONN_W = 12;       // px: width of the ']' connector arm
  const BETWEEN_W = 16;    // px: gap line between rounds
  // Total bracket height = firstRound matchCount × (2 slots + gap)
  const r1Count = leftRounds[0].length;
  const BRACKET_H = r1Count * (SLOT_H * 2 + SLOT_H); // match + equal gap

  // ── helpers ──────────────────────────────────────────────────
  // One team slot box
  const Slot = ({ name, top, isWinner = false }: { name: string; top?: boolean; isWinner?: boolean }) => {
    const bye = name === 'BYE';
    return (
      <div 
        style={{
          height: SLOT_H, display: 'flex', alignItems: 'center',
          paddingLeft: 8, paddingRight: 8,
          background: isWinner ? '#e8f5e8' : bye ? '#fafafa' : '#fff',
          borderTop: top ? `2px solid ${isWinner ? '#22c55e' : bye ? '#e8e8e8' : '#d0d0d0'}` : 'none',
          borderBottom: `2px solid ${isWinner ? '#22c55e' : bye ? '#e8e8e8' : '#d0d0d0'}`,
          borderLeft: `2px solid ${isWinner ? '#22c55e' : bye ? '#e8e8e8' : '#d0d0d0'}`,
          borderRight: `2px solid ${isWinner ? '#22c55e' : bye ? '#e8e8e8' : '#d0d0d0'}`,
          borderRadius: 4,
          boxShadow: isWinner ? '0 2px 4px rgba(34, 197, 94, 0.2)' : '0 1px 2px rgba(0,0,0,0.05)',
          transition: 'all 0.2s ease'
        }}
        title={name}
      >
        <span style={{ 
          fontSize: 11, 
          fontWeight: isWinner ? 800 : 700, 
          color: isWinner ? '#166534' : bye ? '#ccc' : '#444', 
          fontStyle: bye ? 'italic' : 'normal', 
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block',
          width: '100%'
        }}>
          {name}
        </span>
      </div>
    );
  };

  // One match (two slots) with optional right ']' or left '[' connector
  const Match = ({ t1, t2, side, label, isFinal = false }: { t1: string; t2: string; side: 'left' | 'right'; label?: string; isFinal?: boolean }) => (
    <div style={{ position: 'relative', width: isFinal ? 120 : 100 }}>
      {label && (
        <div style={{ position: 'absolute', top: -14, left: 0, fontSize: 9, fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: 1 }}>
          {label}
        </div>
      )}
      <Slot name={t1} top />
      <Slot name={t2} />
      {/* Right ']' connector for left side */}
      {side === 'left' && !isFinal && (
        <div style={{
          position: 'absolute', right: -CONN_W, top: SLOT_H / 2,
          width: CONN_W, bottom: SLOT_H / 2,
          borderTop: '2px solid #ccc', borderRight: '2px solid #ccc', borderBottom: '2px solid #ccc',
          borderRightWidth: 3, borderTopWidth: 3, borderBottomWidth: 3
        }} />
      )}
      {/* Left '[' connector for right side */}
      {side === 'right' && !isFinal && (
        <div style={{
          position: 'absolute', left: -CONN_W, top: SLOT_H / 2,
          width: CONN_W, bottom: SLOT_H / 2,
          borderTop: '2px solid #ccc', borderLeft: '2px solid #ccc', borderBottom: '2px solid #ccc',
          borderLeftWidth: 3, borderTopWidth: 3, borderBottomWidth: 3
        }} />
      )}
    </div>
  );

  // A full round column (all matches stacked with flex-1 equal spacing)
  const RoundCol = ({ matches, side, labels }: { matches: [string, string][]; side: 'left' | 'right'; labels?: string[] }) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: BRACKET_H, flexShrink: 0 }}>
      {matches.map((m, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Match t1={m[0]} t2={m[1]} side={side} label={labels?.[i]} />
        </div>
      ))}
    </div>
  );

  // Connector column: horizontal lines from the ']' exit to the next round's match center
  const ConnectorCol = ({ numLines, side }: { numLines: number; side: 'left' | 'right' }) => (
    <div style={{ width: CONN_W + BETWEEN_W, height: BRACKET_H, flexShrink: 0, position: 'relative' }}>
      {Array.from({ length: numLines }).map((_, i) => {
        const cellH = BRACKET_H / numLines;
        const yCenter = (i + 0.5) * cellH - 0.75;
        return (
          <div key={i} style={{
            position: 'absolute',
            top: yCenter,
            left: side === 'left' ? CONN_W : 0,
            width: BETWEEN_W,
            height: 1.5,
            background: '#ccc',
          }} />
        );
      })}
    </div>
  );

  // Round label header (shown above the left side only, right side mirrors)
  const RoundLabel = ({ label, width }: { label: string; width: number }) => (
    <div style={{ width, textAlign: 'center', flexShrink: 0, paddingBottom: 8 }}>
      <span style={{ fontSize: 10, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1.5 }}>{label}</span>
    </div>
  );

  const COL_W = 100 + CONN_W + CONN_W + BETWEEN_W; // total width per round column incl connectors

  return (
    <div className="space-y-6 overflow-x-auto">
      {/* ── ROUND HEADERS ── */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-center gap-2 lg:gap-0">
        {/* Left side labels */}
        {leftRounds.map((_, ri) => (
          <div key={`lh-${ri}`} className="w-full lg:w-auto flex justify-center lg:justify-start">
            <RoundLabel label={roundLabels[ri]} width={COL_W} />
          </div>
        ))}
        {/* Center label */}
        {/* <RoundLabel label="Final" width={110} /> */}
        {/* Right side labels (reversed) */}
        {[...leftRounds].reverse().map((_, ri) => (
          <div key={`rh-${ri}`} className="w-full lg:w-auto flex justify-center lg:justify-end">
            <RoundLabel label={roundLabels[leftRounds.length - 1 - ri]} width={COL_W} />
          </div>
        ))}
      </div>

      {/* ── BRACKET ── */}
      <div className="overflow-x-auto pb-2">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center min-w-max lg:min-w-0">

          {/* LEFT SIDE: R1 → … → SF (left to right) */}
          <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
            {leftRounds.map((matches, ri) => (
              <div key={`l-${ri}`} className="flex items-center w-full lg:w-auto">
                <div className="w-full lg:w-auto">
                  <RoundCol matches={matches} side="left" />
                </div>
                <div className="hidden lg:block w-4">
                  <ConnectorCol numLines={leftRounds[ri + 1]?.length ?? 1} side="left" />
                </div>
              </div>
            ))}
          </div>

          {/* CENTER FINAL */}
          <div className="flex flex-col items-center justify-center h-auto lg:h-full w-full lg:w-auto py-8 lg:py-0">
            <svg className="w-11 h-11 text-yellow-500 mb-1.5 lg:mb-1.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 5h-2V3H7v2H5C3.9 5 3 5.9 3 7v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
            </svg>
            <div className="bg-gray-800 text-white text-xs lg:text-xs font-bold tracking-wider p-1.5 lg:p-1.5 rounded">
              Final
            </div>
            <div className="text-xs text-gray-500 font-semibold mt-1">🏆 Champion</div>
          </div>

          {/* RIGHT SIDE: SF → … → R1 (right side, mirrored = rightRounds reversed) */}
          <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
            {[...rightRounds].reverse().map((matches, ri) => (
              <div key={`r-${ri}`} className="flex items-center w-full lg:w-auto">
                <div className="hidden lg:block w-4">
                  <ConnectorCol numLines={matches.length} side="right" />
                </div>
                <div className="w-full lg:w-auto">
                  <RoundCol matches={matches} side="right" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── QTR FINAL KNOCKOUT MATCHES ORDER ── */}
      <div className="space-y-4 border-t border-gray-100 pt-8">
        <h4 className="text-sm font-bold text-gray-700">Qtr Final knock out matches order</h4>
        <div className="border border-gray-200 rounded-xl overflow-hidden w-full max-w-fit mx-auto shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-gray-400 font-bold">Team 1</th>
                  <th className="text-center px-2 lg:px-4 py-3 lg:py-4 text-gray-400 font-bold w-8 lg:w-12">Vs</th>
                  <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-gray-400 font-bold">Team 2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-gray-700 text-sm lg:text-sm">Winner of Pool A</td>
                  <td className="text-center px-2 lg:px-4 py-3 lg:py-4 text-xs lg:text-xs font-black text-gray-300">Vs</td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-gray-700 text-sm lg:text-sm">Runner of Pool C</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-gray-700 text-sm lg:text-sm">Winner of Pool D</td>
                  <td className="text-center px-2 lg:px-4 py-3 lg:py-4 text-xs lg:text-xs font-black text-gray-300">Vs</td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-gray-700 text-sm lg:text-sm">Runner of Pool B</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-gray-700 text-sm lg:text-sm">Winner of Pool C</td>
                  <td className="text-center px-2 lg:px-4 py-3 lg:py-4 text-xs lg:text-xs font-black text-gray-300">Vs</td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-gray-700 text-sm lg:text-sm">Runner of Pool A</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-gray-700 text-sm lg:text-sm">Winner of Pool B</td>
                  <td className="text-center px-2 lg:px-4 py-3 lg:py-4 text-xs lg:text-xs font-black text-gray-300">Vs</td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-gray-700 text-sm lg:text-sm">Runner of Pool D</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
