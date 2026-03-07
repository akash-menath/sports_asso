import { useState } from 'react';

export default function Dashboard() {
  const [messages] = useState([
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  ]);

  const [plans] = useState([
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  ]);

  return (
    <div className="max-w-[1200px] mx-auto pb-10">
      <h1 className="text-[28px] font-bold text-[#444] mb-8">Dashboard</h1>

      {/* Top Row: Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#f3f4f6] rounded-xl h-[180px] p-6">
          <h2 className="text-[#666] font-bold text-[14px] uppercase tracking-wider">Upcoming Events</h2>
        </div>
        <div className="bg-[#f3f4f6] rounded-xl h-[180px] p-6">
          <h2 className="text-[#666] font-bold text-[14px] uppercase tracking-wider">Achievements</h2>
        </div>
      </div>

      {/* Middle Row: Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Players */}
        <div className="bg-white rounded-xl shadow-sm border border-[#f3f4f6] p-6">
          <h2 className="text-[#444] font-bold text-[15px] mb-6">Total Players</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-[20px] font-bold text-[#444]">100</p>
              <p className="text-[11px] text-[#888] font-medium mt-1">Mini</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#444]">500</p>
              <p className="text-[11px] text-[#888] font-medium mt-1">Sub-Junior</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#444]">800</p>
              <p className="text-[11px] text-[#888] font-medium mt-1">Junior</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#444]">400</p>
              <p className="text-[11px] text-[#888] font-medium mt-1">Senior</p>
            </div>
          </div>
        </div>

        {/* District Associations */}
        <div className="bg-white rounded-xl shadow-sm border border-[#f3f4f6] p-6">
          <h2 className="text-[#444] font-bold text-[15px] mb-6">District Associations</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[20px] font-bold text-[#444]">12</p>
              <p className="text-[11px] text-[#888] font-medium mt-1">Active</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#444]">2</p>
              <p className="text-[11px] text-[#888] font-medium mt-1">Inactive</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#444]">8</p>
              <p className="text-[11px] text-[#888] font-medium mt-1">Affiliated</p>
            </div>
          </div>
        </div>

        {/* Claims */}
        <div className="bg-white rounded-xl shadow-sm border border-[#f3f4f6] p-6">
          <h2 className="text-[#444] font-bold text-[15px] mb-6">Claims</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[20px] font-bold text-[#444]">50</p>
              <p className="text-[11px] text-[#888] font-medium mt-1">Applied</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#444]">20</p>
              <p className="text-[11px] text-[#888] font-medium mt-1">Pending</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#444]">30</p>
              <p className="text-[11px] text-[#888] font-medium mt-1">Approved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Messages & Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Messages */}
        <div className="bg-white rounded-xl shadow-sm border border-[#f3f4f6] flex flex-col min-h-[300px]">
          <div className="p-6 pb-2">
            <h2 className="text-[#444] font-bold text-[15px] mb-4">Messages</h2>
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`pb-4 ${i !== messages.length - 1 ? 'border-b border-[#f3f4f6]' : ''}`}>
                  <p className="text-[13px] text-[#666] leading-relaxed">{msg}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto p-6 pt-0 flex justify-end">
            <button className="bg-[#4b4b4b] text-white text-[12px] font-bold px-6 py-2 rounded-lg hover:bg-[#333] transition-colors">
              more
            </button>
          </div>
        </div>

        {/* Current Year plans */}
        <div className="bg-white rounded-xl shadow-sm border border-[#f3f4f6] flex flex-col min-h-[300px]">
          <div className="p-6 pb-2">
            <h2 className="text-[#444] font-bold text-[15px] mb-4">Current Year plans</h2>
            <div className="space-y-4">
              {plans.map((plan, i) => (
                <div key={i} className={`flex gap-4 pb-4 ${i !== plans.length - 1 ? 'border-b border-[#f3f4f6]' : ''}`}>
                  <div className="w-[40px] h-[40px] bg-[#f4f4f4] rounded-lg shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#ccc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[13px] text-[#666] leading-relaxed">{plan}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto p-6 pt-0 flex justify-end">
            <button className="bg-[#4b4b4b] text-white text-[12px] font-bold px-6 py-2 rounded-lg hover:bg-[#333] transition-colors">
              more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
