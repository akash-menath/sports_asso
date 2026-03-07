import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function StateAssociationOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Association Details
    associationName: 'Kerala Softball Association',
    state: '',
    country: '',
    registrationNumber: '',
    description: '',
    logo: null as File | null,
    registrationCertificate: null as File | null,
    // Step 2: Contact Details
    contactNo: '+917012839918',
    email: '',
    addressLine: '',
    streetName: '',
    city: '',
    onboardingState: '', // Renamed from state to avoid collision
    pinCode: '',
    website: '',
    facebookLink: '',
    instagramLink: '',
    twitterLink: '',
    // Step 3: Secretary Admin
    secretaryName: '',
    secretaryPhoto: null as File | null,
    secretaryDescription: '',
    secretaryEmail: '',
    secretaryContact: '',
    adhaarNumber: '',
    adhaarFile: null as File | null,
    secretaryAddress: '',
    secretaryStreet: '',
    secretaryCity: '',
    secretaryState: '',
    // Step 5: Packages
    selectedPackage: 'Basic',
  });

  const steps = [
    'Association Details',
    'Contact Details',
    'Secretary Admin',
    'Review Details',
    'Packages'
  ];

  const logoInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);
  const secretaryPhotoRef = useRef<HTMLInputElement>(null);
  const adhaarInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final submission logic
      const userDataStr = localStorage.getItem('user_data');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          userData.isFirstTime = false;
          localStorage.setItem('user_data', JSON.stringify(userData));
        } catch (e) {
          // ignore
        }
      }

      toast.success('Onboarding complete!');
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <div className="flex gap-12 mt-12 items-start">
          {/* Left Column: Upload Logo */}
          <div className="w-[300px] shrink-0">
            <div
              onClick={() => logoInputRef.current?.click()}
              className="w-full aspect-[4/5] bg-[#f4f4f4] flex flex-col items-center justify-center cursor-pointer hover:bg-[#eaeaea] transition-colors rounded-sm"
            >
              <span className="text-[#888] text-[14px]">Upload Logo</span>
              <input type="file" ref={logoInputRef} className="hidden" accept="image/*" />
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-[13px] text-[#888] mb-2 font-medium">Association Name</label>
              <input
                type="text"
                name="associationName"
                value={formData.associationName}
                onChange={handleChange}
                className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#555] rounded-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#333] rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#333] rounded-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 items-end">
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">Registration number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#333] rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">Registration certificate</label>
                <button
                  onClick={(e) => { e.preventDefault(); certInputRef.current?.click(); }}
                  className="px-8 py-3 bg-[#f4f4f4] text-[#888] text-[13px] hover:bg-[#eaeaea] hover:text-[#555] transition-colors rounded-sm font-medium"
                >
                  Upload
                </button>
                <input type="file" ref={certInputRef} className="hidden" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-[#888] mb-2 font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#333] resize-none rounded-sm"
              />
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 5) {
      const packages = [
        {
          id: 'Basic',
          title: 'Basic',
          features: [
            'Create and Manage State Association',
            'Create District Associations',
            'Create and manage Championships',
            'Can Create 1 sub admin',
            'Can view and manage District Association Activities',
            'Can view Players List',
            'Can Create Referees panel',
            'Can Create Technical Committee',
            'Can Create Selection Committee',
            'Manage Accounts',
            'View Reports',
            'File Claims'
          ]
        },
        {
          id: 'Silver',
          title: 'Silver',
          features: [
            'Create and Manage State Association',
            'Create District Associations',
            'Create and manage Championships',
            'Can Create 1 sub admin',
            'Can view and manage District Association Activities',
            'Can view Players List',
            'Can Create Referees panel',
            'Can Create Technical Committee',
            'Can Create Selection Committee',
            'Manage Accounts',
            'View Reports',
            'File Claims'
          ]
        },
        {
          id: 'Gold',
          title: 'Gold',
          features: [
            'Create and Manage State Association',
            'Create District Associations',
            'Create and manage Championships',
            'Can Create 1 sub admin',
            'Can view and manage District Association Activities',
            'Can view Players List',
            'Can Create Referees panel',
            'Can Create Technical Committee',
            'Can Create Selection Committee',
            'Manage Accounts',
            'View Reports',
            'File Claims'
          ]
        }
      ];

      return (
        <div className="mt-8 pb-10">
          <h2 className="text-[24px] font-bold text-[#444] mb-8">Membership Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const selected = formData.selectedPackage === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setFormData(prev => ({ ...prev, selectedPackage: pkg.id }))}
                  className="bg-[#f3f4f6] rounded-xl p-8 cursor-pointer border-2 transition-all hover:shadow-md"
                  style={{ borderColor: selected ? '#4b4b4b' : 'transparent' }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected ? 'border-[#4b4b4b]' : 'border-[#bbb]'}`}>
                      {selected && <div className="w-3 h-3 bg-[#4b4b4b] rounded-full" />}
                    </div>
                    <span className="text-[18px] font-bold text-[#444]">{pkg.title}</span>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#888] mt-1.5">•</span>
                        <span className="text-[13px] text-[#666] leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="flex gap-12 mt-12 items-start">
          {/* Left Column: Upload Logo (Persistent) */}
          <div className="w-[300px] shrink-0">
            <div className="w-full aspect-[4/5] bg-[#f4f4f4] flex flex-col items-center justify-center rounded-sm">
              <span className="text-[#888] text-[14px]">Upload Logo</span>
            </div>
          </div>

          {/* Right Column: Review Content */}
          <div className="flex-1 space-y-10">
            {/* Section 1: Association Info */}
            <div>
              <h2 className="text-[20px] font-bold text-[#555] mb-1">{formData.associationName}</h2>
              <p className="text-[14px] text-[#888] mb-4">{formData.city || 'Trivandrum'}, {formData.onboardingState || 'Kerala'}</p>
              <p className="text-[13px] text-[#666] leading-relaxed max-w-[600px]">
                {formData.description || 'Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing, design and blogging tools. Explore the origins, history and meaning of the famous passage, and learn how Lorem Ipsum went from'}
              </p>
            </div>

            {/* Section 2: Contact Details */}
            <div>
              <h3 className="text-[16px] font-bold text-[#555] mb-4">Contact Details</h3>
              <div className="space-y-2 text-[13px] text-[#666]">
                <p>{formData.contactNo || '+91 9123456780'}</p>
                <p>{formData.email || 'email@gmail.com'}</p>
                <p>{formData.addressLine || '11/234 Kudappanakunnu, Trivandrum'}</p>
                <p>{formData.website || 'www.softballkerala.com'}</p>
                <div className="flex flex-col gap-1 mt-4">
                  <a href="#" className="text-[#555] font-medium underline">Facebook</a>
                  <a href="#" className="text-[#555] font-medium underline">Instagram</a>
                  <a href="#" className="text-[#555] font-medium underline">Twitter</a>
                </div>
              </div>
            </div>

            {/* Section 3: Secretary */}
            <div className="relative">
              <h3 className="text-[16px] font-bold text-[#555] mb-4">Secretary</h3>
              <div className="flex gap-8 items-start">
                <div className="flex-1 space-y-2 text-[13px] text-[#666]">
                  <p className="text-[#555] font-bold text-[14px]">{formData.secretaryName || 'Anil A Johnson'}</p>
                  <p className="leading-relaxed">
                    {formData.secretaryDescription || 'Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing, design and blogging tools. Explore the origins, history and meaning of the famous passage, and learn how Lorem Ipsum went from'}
                  </p>
                  <p className="mt-4">{formData.secretaryEmail || 'email@gmail.com'}</p>
                  <p>{formData.secretaryContact || '+91 9123456780'}</p>
                  <p>{formData.secretaryAddress || '11/234 Kudappanakunnu, Trivandrum'}</p>
                </div>
                {/* Secretary Photo placeholder */}
                <div className="w-[180px] h-[220px] bg-[#f4f4f4] flex flex-col items-center justify-center rounded-sm shrink-0">
                  <span className="text-[#888] text-[13px]">Upload Logo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="flex gap-12 mt-12 items-start">
          {/* Left Column: Upload Logo (Persistent) */}
          <div className="w-[300px] shrink-0">
            <div
              onClick={() => logoInputRef.current?.click()}
              className="w-full aspect-[4/5] bg-[#f4f4f4] flex flex-col items-center justify-center cursor-pointer hover:bg-[#eaeaea] transition-colors rounded-sm"
            >
              <span className="text-[#888] text-[14px]">Upload Logo</span>
              <input type="file" ref={logoInputRef} className="hidden" accept="image/*" />
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-[13px] text-[#888] mb-2 font-medium">Secretary Name</label>
              <input
                type="text"
                name="secretaryName"
                value={formData.secretaryName}
                onChange={handleChange}
                className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#555] rounded-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-[13px] text-[#888] mb-2 font-medium">Upload Secretary Photo</label>
              <button
                onClick={(e) => { e.preventDefault(); secretaryPhotoRef.current?.click(); }}
                className="px-8 py-3 bg-[#f4f4f4] text-[#888] text-[13px] hover:bg-[#eaeaea] hover:text-[#555] transition-colors rounded-sm font-medium"
              >
                Upload Photo
              </button>
              <input type="file" ref={secretaryPhotoRef} className="hidden" />
            </div>

            <div>
              <label className="block text-[13px] text-[#888] mb-2 font-medium">Description</label>
              <textarea
                name="secretaryDescription"
                value={formData.secretaryDescription}
                onChange={handleChange}
                rows={4}
                className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#333] resize-none rounded-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">Email ID</label>
                <input
                  type="email"
                  name="secretaryEmail"
                  value={formData.secretaryEmail}
                  onChange={handleChange}
                  className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#333] rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">Contact No</label>
                <input
                  type="text"
                  name="secretaryContact"
                  value={formData.secretaryContact}
                  onChange={handleChange}
                  className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#333] rounded-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 items-end">
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">Adhaar number</label>
                <input
                  type="text"
                  name="adhaarNumber"
                  value={formData.adhaarNumber}
                  onChange={handleChange}
                  className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#333] rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">Adhaar</label>
                <button
                  onClick={(e) => { e.preventDefault(); adhaarInputRef.current?.click(); }}
                  className="px-8 py-3 bg-[#f4f4f4] text-[#888] text-[13px] hover:bg-[#eaeaea] hover:text-[#555] transition-colors rounded-sm font-medium"
                >
                  Upload
                </button>
                <input type="file" ref={adhaarInputRef} className="hidden" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">Address</label>
                <input
                  type="text"
                  name="secretaryAddress"
                  value={formData.secretaryAddress}
                  onChange={handleChange}
                  className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#333] rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">Street</label>
                <input
                  type="text"
                  name="secretaryStreet"
                  value={formData.secretaryStreet}
                  onChange={handleChange}
                  className="w-full bg-[#f4f4f4] border-none focus:ring-0 focus:outline-none px-4 py-3 text-[#333] rounded-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">City</label>
                <div className="relative">
                  <select
                    name="secretaryCity"
                    value={formData.secretaryCity}
                    onChange={handleChange}
                    className="w-full appearance-none bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 cursor-pointer font-medium"
                  >
                    <option value="">Select City</option>
                    <option value="Trivandrum">Trivandrum</option>
                    <option value="Kochi">Kochi</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[13px] text-[#888] mb-2 font-medium">State</label>
                <div className="relative">
                  <select
                    name="secretaryState"
                    value={formData.secretaryState}
                    onChange={handleChange}
                    className="w-full appearance-none bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 cursor-pointer font-medium"
                  >
                    <option value="">Select State</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="flex gap-12 mt-12 items-start">
          {/* Left Column: Upload Logo (Persistent) */}
          <div className="w-[300px] shrink-0">
            <div
              onClick={() => logoInputRef.current?.click()}
              className="w-full aspect-[4/5] bg-[#f4f4f4] flex flex-col items-center justify-center cursor-pointer hover:bg-[#eaeaea] transition-colors rounded-sm"
            >
              <span className="text-[#888] text-[14px]">Upload Logo</span>
              <input type="file" ref={logoInputRef} className="hidden" accept="image/*" />
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                { label: 'Contact No', name: 'contactNo', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Address line', name: 'addressLine', type: 'text' },
                { label: 'Street Name', name: 'streetName', type: 'text' },
                { label: 'City', name: 'city', type: 'select', options: ['Select City', 'Trivandrum', 'Kochi'] },
                { label: 'State', name: 'onboardingState', type: 'select', options: ['Select State', 'Kerala', 'Tamil Nadu'] },
                { label: 'Pin code', name: 'pinCode', type: 'text' },
                { label: 'Website', name: 'website', type: 'text' },
                { label: 'Facebook Link', name: 'facebookLink', type: 'text' },
                { label: 'Instagram Link', name: 'instagramLink', type: 'text' },
                { label: 'Twitter Link', name: 'twitterLink', type: 'text' },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#888] font-medium">{field.label}</label>
                  {field.type === 'select' ? (
                    <div className="relative">
                      <select
                        name={field.name}
                        value={(formData as any)[field.name]}
                        onChange={handleChange}
                        className="w-full appearance-none bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 cursor-pointer font-medium"
                      >
                        {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      placeholder={field.label === 'Contact No' ? '+917012839918' : ''}
                      className="w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium placeholder-[#bbb]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Placeholder for other steps
    return (
      <div className="mt-12 py-32 text-center bg-[#f9f9f9] rounded-sm border border-dashed border-[#ddd]">
        <p className="text-[#888] text-[15px]">Step {currentStep}: {steps[currentStep - 1]} (To be implemented)</p>
      </div>
    );
  };

  return (
    <div className="max-w-[1000px] w-full mt-2">
      {/* Header text */}
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-[#555] mb-2 tracking-tight">Kerala Softball Association</h1>
        <p className="text-[#888] text-[15px]">Please fill in with your details</p>
      </div>

      {/* Stepper block */}
      <div className="flex items-center mb-14 px-8 w-fit mx-auto">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div key={step} className="flex items-center">
              <div
                className={`py-2 px-6 rounded-full border-[1.5px] transition-colors flex items-center justify-center whitespace-nowrap text-[13px] font-medium ${isActive
                  ? 'bg-[#4b4b4b] border-[#4b4b4b] text-white'
                  : isCompleted
                    ? 'bg-[#f3f4f6] border-transparent text-[#9ca3af]'
                    : 'bg-white border-[#6b7280] text-[#6b7280]'
                  }`}
              >
                {step}
              </div>
              {index < steps.length - 1 && (
                <div className="w-[40px] h-[1px] bg-[#6b7280] shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation Footer */}
      <div className="flex justify-end mt-12 gap-4">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="px-10 py-2.5 bg-[#f4f4f4] text-[#555] text-[14px] font-medium hover:bg-[#ececec] transition-colors rounded-sm"
          >
            {currentStep === 4 ? 'Edit' : 'Back'}
          </button>
        )}
        <button
          onClick={handleNext}
          className="px-10 py-2.5 bg-[#4b4b4b] text-white text-[14px] font-medium hover:bg-[#333] transition-colors rounded-sm shadow-sm"
        >
          {currentStep === steps.length ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}
