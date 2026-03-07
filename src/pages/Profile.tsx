import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  UserCircleIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  return (
    <div className="max-w-[1200px] w-full mt-2 pb-20 px-4">
      {/* Header text */}
      <div className="mb-12">
        <h1 className="text-[32px] font-extrabold text-[#333] mb-1 tracking-tight">Profile</h1>
        <p className="text-[#888] text-[15px]">Manage your association's profile and contact information.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Column: Upload Logo & Profile Card */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-8">
          <div className="group relative">
            <div
              className="w-full aspect-square bg-[#f8f8f8] border-2 border-dashed border-[#e5e5e5] flex flex-col items-center justify-center cursor-pointer hover:bg-[#f3f3f3] hover:border-[#ccc] transition-all rounded-[40px] overflow-hidden"
            >
              <div className="p-8 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-[#aaa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-[#888] text-[15px] font-medium">Upload Logo</span>
            </div>
          </div>

          <div className="bg-[#fcfcfc] border border-[#f0f0f0] rounded-3xl p-8 space-y-6">
            <h3 className="text-[16px] font-bold text-[#444] border-b border-[#eee] pb-3">Social Linkages</h3>
            <div className="space-y-4">
              {[
                { label: 'Facebook', url: '#' },
                { label: 'Instagram', url: '#' },
                { label: 'Twitter', url: '#' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="flex items-center justify-between text-[14px] text-[#777] hover:text-[#333] transition-colors group"
                >
                  <span className="font-medium">{social.label}</span>
                  <svg className="w-4 h-4 text-[#bbb] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Profile Details */}
        <div className="flex-1 space-y-12">

          {/* Section 1: Association Info */}
          <section className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-[26px] font-extrabold text-[#333] tracking-tight">Kerala Softball Association</h2>
                <div className="bg-[#e8f5e9] text-[#2e7d32] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Verified</div>
              </div>
              <div className="flex items-center gap-2 text-[#777] font-medium">
                <MapPinIcon className="w-4 h-4" />
                <span className="text-[14px]">Trivandrum, Kerala, India</span>
              </div>
            </div>

            <div className="bg-[#f9f9f9] border-l-4 border-[#eee] p-6 rounded-r-xl">
              <p className="text-[15px] text-[#666] leading-[1.8] font-medium italic">
                "Dedicated to fostering the growth and excellence of softball across the state of Kerala.
                Providing a platform for athletes to shine and compete at the highest levels."
              </p>
            </div>
          </section>

          {/* Section 2: Contact Details */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-[#f0f0f0] pb-3">
              <IdentificationIcon className="w-5 h-5 text-[#555]" />
              <h3 className="text-[18px] font-bold text-[#444]">Contact Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                { icon: PhoneIcon, label: 'Contact Number', value: '+91 9123456780' },
                { icon: EnvelopeIcon, label: 'Email Address', value: 'contact@softballkerala.org' },
                { icon: GlobeAltIcon, label: 'Official Website', value: 'www.softballkerala.com' },
                { icon: MapPinIcon, label: 'Physical Address', value: '11/234 Kudappanakunnu, Trivandrum' }
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[#aaa] text-[12px] font-bold uppercase tracking-widest">
                    <item.icon className="w-3 h-3" />
                    <span>{item.label}</span>
                  </div>
                  <p className="text-[15px] text-[#555] font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Secretary Profile */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-[#f0f0f0] pb-3">
              <UserCircleIcon className="w-5 h-5 text-[#555]" />
              <h3 className="text-[18px] font-bold text-[#444]">Secretary Profile</h3>
            </div>

            <div className="bg-white border border-[#f0f0f0] shadow-sm rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-start hover:border-[#e0e0e0] transition-colors">
              <div className="w-24 h-24 rounded-2xl bg-[#f4f4f4] shrink-0 flex items-center justify-center border border-[#eee]">
                <UserCircleIcon className="w-12 h-12 text-[#ccc]" />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h4 className="text-[19px] font-bold text-[#333]">Anil A Johnson</h4>
                  <p className="text-[13px] text-[#999] font-bold uppercase tracking-widest">State Secretary</p>
                </div>
                <p className="text-[15px] text-[#777] leading-relaxed">
                  Leading the association with over 15 years of experience in regional sports administration.
                  Committed to transparency and athlete development programs across all districts.
                </p>
                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2 text-[14px] text-[#666]">
                    <EnvelopeIcon className="w-4 h-4 text-[#bbb]" />
                    <span className="font-medium">anil.j@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-[#666]">
                    <PhoneIcon className="w-4 h-4 text-[#bbb]" />
                    <span className="font-medium">+91 9123456780</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="pt-8 border-t border-[#f0f0f0] flex gap-4">
            <button className="bg-[#4b4b4b] hover:bg-[#333] text-white text-[14px] px-10 py-3 rounded-2xl font-bold transition-all shadow-md active:scale-95">
              Edit Profile
            </button>
            <button className="border border-[#e0e0e0] hover:bg-[#f9f9f9] text-[#666] text-[14px] px-10 py-3 rounded-2xl font-bold transition-all active:scale-95">
              Account Settings
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
