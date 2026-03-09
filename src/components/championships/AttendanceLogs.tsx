import type { Championship } from '../../lib/championshipStore';

interface AttendanceLogsProps {
  championship: Partial<Championship>;
  selectedAttendanceTab: string;
  onAttendanceTabChange: (tab: string) => void;
  onToggleAttendance: (type: 'observer' | 'referee', index?: number) => void;
}

export default function AttendanceLogs({
  championship,
  selectedAttendanceTab,
  onAttendanceTabChange,
  onToggleAttendance
}: AttendanceLogsProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-end border-b border-[#eee] pb-2">
        <h3 className="text-[20px] font-bold text-[#444]">Attendance Logs</h3>
      </div>

      <div className="space-y-6">
        <div className="flex gap-6 border-b border-[#eee]">
          {['State observer', 'Referees'].map((tab) => (
            <button
              key={tab}
              onClick={() => onAttendanceTabChange(tab)}
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
                onClick={() => onToggleAttendance('observer')}
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
                      onClick={() => onToggleAttendance('referee', idx)}
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
  );
}
