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

      {/* Registration Banner */}
      <div className="bg-[#fff1f2] rounded-[24px] inline-flex items-center px-5 py-3 mb-8 w-fit shrink-0 cursor-pointer hover:bg-[#ffe4e6] transition-colors">
        <div className="text-[#e11d48] mr-4 flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
        </div>
        <span className="text-[#555] text-[14px] font-medium mr-6">Please fill in the details to complete the registration</span>
        <svg className="w-5 h-5 text-[#e11d48] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </div>

      {/* Top Row: Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#e0f8e9] rounded-xl h-[180px] p-8 flex flex-col justify-center">
          <p className="text-[14px] text-[#444] font-bold mb-4">02 - 09 - 2025</p>
          <h2 className="text-[#22c55e] font-bold text-[24px] mb-2 tracking-tight">26th Senior State Championship</h2>
          <p className="text-[#6b7280] text-[13px] font-medium">Venue: Thodupuzha, Idukki</p>
        </div>
        <div className="bg-[#e0f2fe] rounded-xl h-[180px] p-8 flex flex-col justify-center">
          <p className="text-[14px] text-[#444] font-bold mb-4">Men</p>
          <h2 className="text-[#3b82f6] font-bold text-[24px] mb-2 tracking-tight">Winner Senior All India Championship</h2>
          <p className="text-[#6b7280] text-[13px] font-medium">Venue: Maharashtra</p>
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
            <button className="bg-[#22c55e] text-white text-[13px] font-bold px-8 py-2 rounded-lg hover:bg-[#16a34a] transition-colors">
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
            <button className="bg-[#22c55e] text-white text-[13px] font-bold px-8 py-2 rounded-lg hover:bg-[#16a34a] transition-colors">
              more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
