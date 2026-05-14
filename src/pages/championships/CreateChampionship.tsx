import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { championshipStore } from '../../lib/championshipStore';

const STEPS = [
  'Head Details',
  'Venue',
  'Dates',
  'Observer Details',
  'Committees',
  'Review',
  'Documents'
];

const CATEGORIES = ['Sub Junior', 'Junior', 'Senior', 'Masters'];
const DISTRICTS = [
  'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha',
  'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad',
  'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'
];

export default function CreateChampionship() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [activeDoc, setActiveDoc] = useState('Circular');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  // Mock editing mode
  const [isEditMode] = useState(false);
  const [originalStartDate] = useState('');

  const getAcademicYear = () => {
    const d = new Date();
    const month = d.getMonth();
    const year = d.getFullYear();
    // If month is < 2 (Jan/Feb), academic year is prevYear-currentYear
    // If month >= 2 (March+), academic year is currentYear-nextYear
    const startYear = month < 2 ? year - 1 : year;
    return `${startYear}-${(startYear + 1).toString().slice(-2)}`;
  };

  // Form State
  const [formData, setFormData] = useState({
    level: 'State',
    number: '26th',
    gameName: '',
    category: '',
    customCategory: '',
    playerNumbers: '',
    academicYear: getAcademicYear(),
    title: '',
    groundName: '',
    place: '',
    district: '',
    routeDetails: '',
    arrivalDetails: '',
    startDate: '',
    endDate: '',
    time: '',
    observerDetails: {
      associationObserver: '',
      requestDsc: true,
      observerName: '',
      observerDistrict: '',
      contactNumber: '',
      email: '',
    },
    committees: {
      selection: {
        chairman: '',
        selector: '',
        coach: '',
        secretary: '',
        stateObserver: '',
        ksscObserver: '',
      },
    }
  });

  // Auto-generate title
  useEffect(() => {
    const displayCategory = formData.category === 'Other' ? formData.customCategory : formData.category;
    if (formData.number && displayCategory && formData.level && formData.gameName && formData.academicYear) {
      let levelText = formData.level;
      if (formData.level === 'State') {
        levelText = 'Kerala State';
      }
      const newTitle = `${formData.number} ${levelText} ${displayCategory} ${formData.gameName} Championship ${formData.academicYear}`;
      setFormData(prev => ({ ...prev, title: newTitle }));
    }
  }, [formData.number, formData.category, formData.customCategory, formData.level, formData.gameName, formData.academicYear]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Date constraints calculation
  const getMinStartDate = () => {
    if (isSuperAdmin) return undefined;

    const today = new Date();
    if (isEditMode && originalStartDate) {
      // No preponing allowed: start date must be >= originalStartDate
      // Also required: if postponing, it must be at least 5 days from today
      const minPostponeDate = new Date(today);
      minPostponeDate.setDate(today.getDate() + 5);
      const minPostponeDateStr = minPostponeDate.toISOString().split('T')[0];

      return originalStartDate > minPostponeDateStr ? originalStartDate : minPostponeDateStr;
    } else {
      // Creating new: must be at least 15 days from today
      const minCreateDate = new Date(today);
      minCreateDate.setDate(today.getDate() + 15);
      return minCreateDate.toISOString().split('T')[0];
    }
  };

  const handleObserverChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({
      ...prev,
      observerDetails: { ...prev.observerDetails, [name]: finalValue }
    }));
  };

  const handleCommitteeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      committees: {
        selection: { ...prev.committees.selection, [name]: value }
      }
    }));
  };

  const handleSubmit = () => {
    const newChampionship = {
      ...formData,
      id: Date.now().toString(),
      status: 'Upcoming' as const,
      dateDisplay: formData.startDate ? new Date(formData.startDate).toLocaleDateString('en-GB').replace(/\//g, ' - ') : 'TBD'
    };
    championshipStore.saveChampionship(newChampionship);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-[1000px] pb-10">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-6">
            <CheckCircleIcon className="w-20 h-20 text-black stroke-[1.5]" />
          </div>
          <h2 className="text-[24px] font-bold text-[#444] mb-8">
            Circular {isEditMode ? 'Resent' : 'Sent'} to Designated Emails Successfully
          </h2>
          <button
            onClick={() => navigate('/dashboard/championships')}
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-[14px] px-12 py-2.5 rounded font-medium transition-colors min-w-[120px]"
          >
            Ok
          </button>
        </div>
      ) : (
        <>
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-[28px] font-bold text-[#444] tracking-tight">Create Championship</h1>
          </div>

          {/* Level Radio Group */}
          <div className="flex gap-6 mb-8 mt-4">
            {['District', 'State', 'National', 'International'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center ${formData.level === opt ? 'border-[#555]' : 'border-[#aaa] group-hover:border-[#888]'}`}>
                  {formData.level === opt && <div className="w-[10px] h-[10px] rounded-full bg-[#22c55e]" />}
                </div>
                <input
                  type="radio"
                  name="level"
                  className="hidden"
                  checked={formData.level === opt}
                  onChange={() => setFormData(prev => ({ ...prev, level: opt }))}
                />
                <span className="text-[14px] text-[#666] font-medium">{opt}</span>
              </label>
            ))}
          </div>

          {/* Stepper */}
          <div className="flex items-center mb-10 w-fit">
            {STEPS.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;
              return (
                <div key={step} className="flex items-center">
                  <div
                    className={`py-2.5 px-6 rounded-full border-[1.5px] transition-colors flex items-center justify-center whitespace-nowrap text-[13px] font-bold ${isActive
                      ? 'bg-[#22c55e] border-[#22c55e] text-white shadow-sm'
                      : isCompleted
                        ? 'bg-[#f4f4f4] border-transparent text-[#9ca3af]'
                        : 'bg-white border-[#d1d5db] text-[#9ca3af]'
                      }`}
                  >
                    {step}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="w-[30px] h-[1.5px] bg-[#e5e7eb] shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Head Details Form */}
          {currentStep === 0 && (
            <div className="space-y-8 max-w-[650px]">
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">Championship Number</label>
                  <input
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium placeholder-[#bbb]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">Championship Category</label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full appearance-none bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 pl-4 pr-10 rounded-sm focus:ring-0 cursor-pointer font-medium"
                    >
                      <option value="">Select Category</option>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-[#888] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-2" />
                  </div>
                </div>
              </div>

              {formData.category === 'Other' && (
                <div className="grid grid-cols-2 gap-8 -mt-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] text-[#666] font-medium">Custom Category Name</label>
                    <input
                      type="text"
                      name="customCategory"
                      value={formData.customCategory}
                      onChange={handleInputChange}
                      className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium placeholder-[#bbb]"
                      placeholder="e.g. Under 14"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] text-[#666] font-medium">Number of Players</label>
                    <input
                      type="number"
                      name="playerNumbers"
                      value={formData.playerNumbers}
                      onChange={handleInputChange}
                      className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium placeholder-[#bbb]"
                      placeholder="e.g. 15"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">Game Name</label>
                  <input
                    type="text"
                    name="gameName"
                    value={formData.gameName}
                    onChange={handleInputChange}
                    placeholder="e.g. Throwball"
                    className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium placeholder-[#bbb]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">Academic Year</label>
                  <div className="bg-[#f4f4f4] text-[#555] text-[14px] py-3.5 px-4 rounded-sm font-medium h-[48px] flex items-center">
                    {formData.academicYear}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <label className="text-[13px] text-[#666] font-medium mb-1">Title</label>
                <p className="text-[14px] text-[#555] font-medium">{formData.title || 'Auto generated title comes here'}</p>
              </div>

              <div className="pt-8 flex justify-end max-w-[650px]">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-[14px] px-10 py-3 rounded-sm font-medium transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Venue Form */}
          {currentStep === 1 && (
            <div className="space-y-8 max-w-[650px]">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] text-[#666] font-medium">Ground(s) Name</label>
                <input
                  type="text"
                  name="groundName"
                  value={formData.groundName}
                  onChange={handleInputChange}
                  placeholder="Fill in the ground name"
                  className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium placeholder-[#bbb]"
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">Place</label>
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleInputChange}
                    placeholder="Fill in the place"
                    className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium placeholder-[#bbb]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">District</label>
                  <div className="relative">
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full appearance-none bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 pl-4 pr-10 rounded-sm focus:ring-0 cursor-pointer font-medium"
                    >
                      <option value="">Select District</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-[#888] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-2" />
                  </div>
                </div>
              </div>

              <div>
                <a href="#" className="text-[13px] text-[#666] font-medium underline underline-offset-2 decoration-[#999] hover:text-[#333] transition-colors">Pick the location on map</a>
              </div>

              {formData.level === 'State' && (
                <div className="grid grid-cols-2 gap-8 pt-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] text-[#666] font-medium">Route Details</label>
                    <textarea
                      name="routeDetails"
                      value={formData.routeDetails}
                      onChange={handleInputChange}
                      placeholder="e.g. Nearest railway station is..."
                      className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium placeholder-[#bbb] resize-none h-24"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] text-[#666] font-medium">Arrival Details</label>
                    <textarea
                      name="arrivalDetails"
                      value={formData.arrivalDetails}
                      onChange={handleInputChange}
                      placeholder="e.g. Teams should arrive by 8:00 AM..."
                      className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium placeholder-[#bbb] resize-none h-24"
                    />
                  </div>
                </div>
              )}

              <div className="pt-8 flex justify-end gap-4 max-w-[650px]">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] text-[14px] px-10 py-3 rounded-sm font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-[14px] px-10 py-3 rounded-sm font-medium transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Dates Form */}
          {currentStep === 2 && (
            <div className="space-y-8 max-w-[650px]">
              <div className="flex justify-end -mb-4">
                <label className="flex items-center gap-2 cursor-pointer bg-[#fcfcfc] px-3 py-1.5 rounded border border-[#eee]">
                  <input
                    type="checkbox"
                    checked={isSuperAdmin}
                    onChange={(e) => setIsSuperAdmin(e.target.checked)}
                    className="rounded border-[#ccc] text-[#4a4a4a] focus:ring-[#4a4a4a]"
                  />
                  <span className="text-[12px] font-bold text-[#666]">Super Admin (Override Rules)</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    min={getMinStartDate()}
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium"
                  />
                  {formData.startDate && getMinStartDate() && formData.startDate < getMinStartDate()! && (
                    <span className="text-[11px] text-red-500 font-medium mt-1">
                      {isEditMode ? 'Cannot prepone, and needs 5 days gap for postponing.' : 'Must be at least 15 days from today.'}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    min={formData.startDate || getMinStartDate()}
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 max-w-[310px]">
                <label className="text-[13px] text-[#666] font-medium">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium"
                />
              </div>
              <div className="pt-8 flex justify-end gap-4 max-w-[650px]">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] text-[14px] px-10 py-3 rounded-sm font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-[14px] px-10 py-3 rounded-sm font-medium transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Observer Details Form */}
          {currentStep === 3 && (
            <div className="space-y-8 max-w-[650px]">
              <div className="mb-6">
                <h2 className="font-bold text-[14px] text-[#555] mb-2">State Association Observer</h2>
                <div className="relative mb-4">
                  <select
                    name="associationObserver"
                    value={formData.observerDetails.associationObserver}
                    onChange={handleObserverChange}
                    className="w-full appearance-none bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 pl-4 pr-10 rounded-sm focus:ring-0 cursor-pointer font-medium"
                  >
                    <option value="">Select Observer</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                  </select>
                  <ChevronDownIcon className="w-4 h-4 text-[#888] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-2" />
                </div>

                <h3 className="font-bold text-[13px] text-[#666] mb-2">State Observer Posting Document</h3>
                <div className="flex justify-between items-center cursor-pointer bg-[#f4f4f4] py-3.5 px-4 rounded-sm">
                  <span className="text-[#999]">upload</span>
                  <svg className="w-5 h-5 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <input type="file" className="hidden" />
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-bold text-[14px] text-[#555] mb-2">District Sports Council (DSC) Observer</h2>

                <label className="flex items-center gap-2 mb-4 bg-[#f9f9f9] p-3 rounded border border-[#e4e4e4] cursor-pointer">
                  <input
                    type="checkbox"
                    name="requestDsc"
                    checked={formData.observerDetails.requestDsc}
                    onChange={handleObserverChange}
                    className="rounded text-[#4b4b4b] focus:ring-[#4b4b4b] disabled:opacity-70"
                    disabled={true}
                  />
                  <span className="text-[13px] text-[#555] font-medium">Request DSC Observer <span className="text-red-500">*</span> <span className="text-[11px] text-[#888] font-normal ml-1">(Mandatory at creation)</span></span>
                </label>

                <h3 className="font-bold text-[13px] text-[#666] mb-2">Posting Document (Optional at creation time)</h3>
                <div className="flex justify-between items-center cursor-pointer bg-[#f4f4f4] py-3.5 px-4 rounded-sm opacity-80">
                  <span className="text-[#999]">upload optional posting</span>
                  <svg className="w-5 h-5 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <input type="file" className="hidden" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">Observer Name</label>
                  <input
                    type="text"
                    name="observerName"
                    value={formData.observerDetails.observerName}
                    onChange={handleObserverChange}
                    placeholder="John Doe"
                    className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">District</label>
                  <input
                    type="text"
                    name="observerDistrict"
                    value={formData.observerDetails.observerDistrict}
                    onChange={handleObserverChange}
                    placeholder="Kollam"
                    className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.observerDetails.contactNumber}
                    onChange={handleObserverChange}
                    placeholder="09123456789"
                    className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#666] font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.observerDetails.email}
                    onChange={handleObserverChange}
                    placeholder="jdoe@email.com"
                    className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium"
                  />
                </div>
              </div>

              <div className="pt-8 flex justify-end gap-4 max-w-[650px]">
                <button onClick={() => setCurrentStep(2)} className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] text-[14px] px-10 py-3 rounded-sm font-medium transition-colors">Back</button>
                <button onClick={() => setCurrentStep(4)} className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-[14px] px-10 py-3 rounded-sm font-medium transition-colors">Next</button>
              </div>
            </div>
          )}

          {/* Committees Form */}
          {currentStep === 4 && (
            <div className="space-y-6 max-w-[800px]">
              <div className="border-b border-[#f3f4f6]">
                <div className="flex justify-between items-center py-4 cursor-pointer">
                  <span className="text-[14px] font-bold text-[#4a4a4a]">Selection Committee</span>
                  <svg className="w-4 h-4 text-[#4a4a4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-6 pb-6 mt-2">
                  {[
                    { label: 'Chairman', name: 'chairman' },
                    { label: 'Selector', name: 'selector' },
                    { label: 'Coach', name: 'coach' },
                    { label: 'Secretary', name: 'secretary' },
                    { label: 'State observer', name: 'stateObserver' },
                    { label: 'KSSC Observer', name: 'ksscObserver' }
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-2">
                      <label className="text-[13px] text-[#6b7280] font-semibold">{item.label}</label>
                      <div className="relative">
                        <select
                          name={item.name}
                          value={(formData.committees.selection as any)[item.name]}
                          onChange={handleCommitteeChange}
                          className="w-full appearance-none bg-[#f6f6f6] border-none text-[#555] text-[14px] py-3 pl-4 pr-10 rounded-sm focus:ring-0 cursor-pointer font-medium"
                        >
                          <option value="">Select</option>
                          <option value="Person A">Person A</option>
                          <option value="Person B">Person B</option>
                        </select>
                        <ChevronDownIcon className="w-4 h-4 text-[#4b4b4b] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-[#f3f4f6] cursor-pointer">
                <span className="text-[14px] font-bold text-[#4a4a4a]">Technical committee</span>
                <svg className="w-4 h-4 text-[#4a4a4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-[#f3f4f6] cursor-pointer">
                <span className="text-[14px] font-bold text-[#4a4a4a]">General Committee</span>
                <svg className="w-4 h-4 text-[#4a4a4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="pt-12 flex justify-center gap-4">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#6b7280] text-[14px] px-12 py-2.5 rounded font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-[14px] px-12 py-2.5 rounded font-medium transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Review Step */}
          {currentStep === 5 && (
            <div className="space-y-10 max-w-[850px] pt-4">
              <div className="space-y-1">
                <h2 className="text-[24px] font-bold text-[#444]">Championship Preview</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-[18px] font-bold text-[#555]">{formData.title}</h3>
                  <p className="text-[14px] text-[#888] font-medium">{formData.groundName || 'Ground name'}, {formData.place || 'Trivandrum'}, {formData.district || 'Kerala'}</p>
                  <p className="text-[14px] text-[#888] font-medium">Date: {formData.startDate || '02-09-2025'} to {formData.endDate || '05-09-2025'}</p>
                </div>

                <p className="text-[14px] text-[#777] leading-relaxed max-w-[750px]">
                  Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and
                  discover plugins for your favorite writing, design and blogging tools. Explore the origins, history
                  and meaning of the famous passage, and learn how Lorem Ipsum went from
                </p>

                <div className="space-y-6 pt-2">
                  <div className="space-y-1">
                    <h4 className="text-[16px] font-bold text-[#555]">State Association Observer</h4>
                    <p className="text-[14px] text-[#777]">{formData.observerDetails.observerName || 'John Doe'}</p>
                    <p className="text-[14px] text-[#777]">{formData.observerDetails.contactNumber || '09123456789'}</p>
                    <p className="text-[14px] text-[#777]">{formData.observerDetails.email || 'email@gmail.com'}</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-[16px] font-bold text-[#555]">Sports Council Observer</h4>
                    <p className="text-[14px] text-[#777]">John Doe</p>
                    <p className="text-[14px] text-[#777]">09123456789</p>
                    <p className="text-[14px] text-[#777]">email@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#555] text-[14px] px-12 py-2.5 rounded font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setCurrentStep(6)}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-[14px] px-12 py-2.5 rounded font-medium transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Documents Step */}
          {currentStep === 6 && (
            <div className="space-y-8 pt-4">
              <div className="space-y-1">
                <h2 className="text-[24px] font-bold text-[#444]">Championship Documents</h2>
              </div>

              <div className="flex gap-8 items-start">
                <div className="w-[280px] shrink-0 space-y-4">
                  {[
                    { id: 'Circular', label: 'Circular', sub: 'Championship circular' },
                    { id: 'Letter', label: 'Letter', sub: 'Letter to relevant entities newspaper, committees etc.' },
                    { id: 'Post', label: 'Create Post', sub: 'Prepare a post for sm promotions' },
                  ].map((tab) => (
                    <div
                      key={tab.id}
                      onClick={() => setActiveDoc(tab.id)}
                      className={`p-5 rounded-lg cursor-pointer transition-all ${activeDoc === tab.id ? 'bg-[#d1d1d1] text-[#4a4a4a]' : 'bg-[#f6f6f6] text-[#666] hover:bg-[#ececec]'
                        }`}
                    >
                      <h3 className={`font-bold text-[16px] ${activeDoc === tab.id ? 'text-[#4a4a4a]' : 'text-[#4a4a4a]'}`}>{tab.label}</h3>
                      <p className="text-[12px] mt-1 leading-snug">{tab.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="flex-1 bg-white border border-[#eaeaea] rounded-sm p-12 min-h-[600px] flex flex-col shadow-sm">
                  <div className="text-center mb-10">
                    <h3 className="text-[20px] text-[#666] font-medium tracking-wide">Letter head</h3>
                    <div className="h-[1.5px] bg-[#bbb] w-full mt-4" />
                  </div>

                  <div className="flex justify-between text-[13px] text-[#555] font-bold mb-12">
                    <span>Ref: ASCD/SFT/{formData.startDate || '25-09-2025'}</span>
                    <span>Date: {new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}</span>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-center text-[20px] font-bold text-[#4a4a4a] mb-10">{activeDoc}</h4>
                    <div className="space-y-6 text-[14px] text-[#666] leading-relaxed">
                      <p>
                        This is the official {activeDoc} for the {formData.title || 'Championship'}.
                        The event will be held at {formData.groundName || 'Ground Name'}, {formData.place || 'Place'}, {formData.district || 'District'}
                        from {formData.startDate || 'Start Date'} to {formData.endDate || 'End Date'}.
                      </p>
                      <p>
                        Interested participants are requested to register before the official deadline.
                        For any queries, please contact the observer {formData.observerDetails.observerName || 'Observer Name'} at {formData.observerDetails.contactNumber || 'Contact Number'}.
                      </p>
                      {formData.level === 'State' && activeDoc === 'Circular' && (formData.routeDetails || formData.arrivalDetails) && (
                        <div className="mt-8 p-6 bg-[#f9f9f9] border border-[#eee] rounded-sm text-[13px]">
                          <h5 className="font-bold text-[#555] mb-3 text-[14px]">Venue Information</h5>
                          {formData.arrivalDetails && (
                            <p className="mb-2"><span className="font-bold">Arrival Details:</span> {formData.arrivalDetails}</p>
                          )}
                          {formData.routeDetails && (
                            <p><span className="font-bold">Route Details:</span> {formData.routeDetails}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-20 flex justify-between text-[13px] text-[#4a4a4a] font-bold">
                    <div className="text-center space-y-1">
                      <p>Authorised Signatories</p>
                      <p>Name</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p>Authorised Signatories</p>
                      <p>Name</p>
                    </div>
                  </div>

                  <div className="mt-12 flex justify-end gap-3">
                    <button
                      onClick={() => setCurrentStep(5)}
                      className="bg-[#f6f6f6] hover:bg-[#ececec] text-[#555] text-[14px] px-8 py-2.5 rounded font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-[14px] px-10 py-2.5 rounded font-medium transition-colors"
                    >
                      {isEditMode ? 'Resend' : 'Send'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
