import { useState, useEffect } from 'react';
import { PhotoIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { SlideOver, Input, Select } from '../../components/ui';
import toast from 'react-hot-toast';
import { playerStore, type Player } from '../../lib/playerStore';

const SelectDropdown = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-[13px] text-[#666] font-medium">{label}</span>
    <div className="relative">
      <select className="appearance-none bg-[#f4f4f4] border-none text-[#555] text-[13px] py-2 pl-4 pr-10 rounded-sm focus:ring-0 cursor-pointer min-w-[140px] font-medium">
        <option>Select</option>
      </select>
      <ChevronDownIcon className="w-4 h-4 text-[#888] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-2" />
    </div>
  </div>
);

export default function PlayersDashboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    district: '',
    phone: '',
    email: '',
    clubInstitution: '',
    registrationNo: '',
    aadhaarNo: ''
  });

  const loadPlayers = () => {
    setPlayers(playerStore.getPlayers());
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const handleClose = () => setSelectedPlayer(null);

  const handleApprove = () => {
    if (selectedPlayer) {
      playerStore.updatePlayer(selectedPlayer.id, { status: 'Approved' });
      loadPlayers();
      handleClose();
    }
  };

  const handleDelete = () => {
    if (selectedPlayer) {
      playerStore.deletePlayer(selectedPlayer.id);
      loadPlayers();
      handleClose();
    }
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.level || !formData.district || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      playerStore.savePlayer({ ...formData, status: 'Pending' });
      toast.success("Player registered successfully!");
      setIsRegistrationOpen(false);
      setFormData({ name: '', level: '', district: '', phone: '', email: '', clubInstitution: '', registrationNo: '', aadhaarNo: '' });
      loadPlayers();
    } catch (error) {
      toast.error("Failed to register player.");
    }
  };

  return (
    <div className="max-w-[1200px] pb-10">
      {/* Top Header Row */}
      <div className="flex justify-between items-center mb-8 pr-2">
        <h1 className="text-[28px] font-bold text-[#444] tracking-tight">Players</h1>

        <div className="flex items-center gap-6">
          <SelectDropdown label="Category" />
          <SelectDropdown label="District" />

          <button
            onClick={() => setIsRegistrationOpen(true)}
            className="bg-[#555] hover:bg-[#444] text-white text-[13px] px-8 py-2 rounded-sm font-medium transition-colors ml-2"
          >
            Add
          </button>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <div
            key={player.id}
            onClick={() => setSelectedPlayer(player)}
            className="bg-[#f5f5f5] rounded-xl p-5 relative flex gap-5 shrink-0 cursor-pointer hover:bg-[#f0f0f0] transition-colors"
          >
            {/* Status Label */}
            <div className={`absolute top-5 right-5 text-[13px] font-bold ${player.status === 'Approved' ? 'text-[#555]' : 'text-[#666]'}`}>
              {player.status}
            </div>

            {/* Image Placeholder */}
            <div className="w-[100px] h-[100px] rounded-lg border-[2.5px] border-[#999] flex items-center justify-center shrink-0 bg-transparent relative overflow-hidden mt-2">
              <PhotoIcon className="w-14 h-14 text-[#999] stroke-1" />
            </div>

            {/* Player Details */}
            <div className="flex flex-col justify-center pt-2 w-full">
              <h3 className="text-[15px] font-bold text-[#444] leading-tight mb-1">{player.name}</h3>
              <p className="text-[13px] text-[#777] leading-snug">{player.level}</p>
              <p className="text-[13px] text-[#777] leading-snug mb-2">{player.district}</p>
              <p className="text-[12px] text-[#777] leading-snug">{player.phone}</p>
              <p className="text-[12px] text-[#777] leading-snug">{player.email}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-Over Panel for Player Details */}
      <SlideOver isOpen={!!selectedPlayer} onClose={handleClose} width="max-w-[450px]">
        {selectedPlayer && (
          <div className="flex flex-col h-full pt-2">

            {/* Info block */}
            <div className="flex gap-4 mb-4">
              <div className="w-[100px] h-[100px] bg-[#f4f4f4] rounded-xl flex items-center justify-center shrink-0">
                <span className="text-[12px] text-[#888]">Photo</span>
              </div>
              <div className="flex flex-col pt-1">
                <h2 className="text-[18px] font-bold text-[#444] leading-tight mb-1">{selectedPlayer.name}</h2>
                <p className="text-[13px] text-[#666] leading-snug">{selectedPlayer.level}</p>
                <p className="text-[13px] text-[#666] leading-snug">{selectedPlayer.district}</p>
                <p className="text-[13px] text-[#666] leading-snug">{selectedPlayer.clubInstitution || 'Club/Institution'}</p>
                <p className="text-[13px] text-[#666] leading-snug">Player Registration No. {selectedPlayer.registrationNo || '1234567'}</p>
                <p className="text-[13px] text-[#666] leading-snug">Aadhaar No. {selectedPlayer.aadhaarNo || '123456745678'}</p>
              </div>
            </div>

            {/* Documents */}
            <div className="ml-[116px] mb-8">
              <div className="w-[110px] h-[100px] bg-[#f4f4f4] flex items-center justify-center mb-4 rounded-sm">
                <span className="text-[12px] text-[#888]">Adhaar Picture</span>
              </div>

              <p className="text-[13px] text-[#666] font-medium leading-snug mb-1">Age Proof</p>
              <div className="w-[110px] h-[100px] bg-[#f4f4f4] flex items-center justify-center rounded-sm">
                <span className="text-[12px] text-[#888]">Adhaar Picture</span>
              </div>
            </div>

            {/* Bio & Achievements */}
            <div className="flex-1">
              <p className="text-[13px] text-[#666] leading-relaxed mb-6">
                Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing, design and blogging tools. Explore the origins, history and meaning of the famous passage, and learn how Lorem Ipsum went from
              </p>

              <h3 className="text-[15px] font-bold text-[#555] mb-2 tracking-tight">Acievements</h3>
              <ul className="list-disc pl-4 space-y-1.5 text-[13px] text-[#666]">
                <li>Generate Lorem Ipsum placeholder text for use in your graphic</li>
                <li>Generate Lorem Ipsum placeholder text for use in your graphic, print</li>
                <li>Generate Lorem Ipsum placeholder text for use in your</li>
              </ul>
            </div>

            {/* Bottom Buttons */}
            <div className="pt-8 flex justify-end gap-3 pb-2 mt-auto">
              <button
                onClick={handleDelete}
                className="px-8 py-2.5 bg-[#f4f4f4] text-[#555] text-[13px] font-medium rounded-sm hover:bg-[#eaeaea] transition-colors"
              >
                Delete
              </button>
              {selectedPlayer.status !== 'Approved' && (
                <button
                  onClick={handleApprove}
                  className="px-8 py-2.5 bg-[#555] text-white text-[13px] font-medium rounded-sm hover:bg-[#444] transition-colors"
                >
                  Approve
                </button>
              )}
            </div>

          </div>
        )}
      </SlideOver>

      {/* Slide-Over Panel for Player Registration */}
      <SlideOver isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} width="max-w-[450px]">
        <div className="flex flex-col h-full pt-2">
          <div className="mb-6">
            <h2 className="text-[18px] font-bold text-[#444] leading-tight mb-1">Add New Player</h2>
            <p className="text-[13px] text-[#666] leading-snug">Register a new softball player</p>
          </div>

          <form onSubmit={handleRegistrationSubmit} className="flex-1 overflow-y-auto pr-2 pb-6 space-y-4">
            <Input
              id="name" label="Full Name *" placeholder="Enter player name"
              value={formData.name} onChange={handleRegistrationChange} required
            />
            <Select
              id="level"
              label="Category/Level *"
              required
              value={formData.level}
              onChange={handleRegistrationChange as any}
              options={[
                { value: "", label: "Select Level" },
                { value: "Senior Level", label: "Senior Level" },
                { value: "Junior Level", label: "Junior Level" },
                { value: "Sub-Junior Level", label: "Sub-Junior Level" },
                { value: "Ponny", label: "Ponny" },
              ]}
            />
            <Input
              id="district" label="District *" placeholder="Enter district"
              value={formData.district} onChange={handleRegistrationChange} required
            />
            <Input
              id="phone" label="Phone Number *" placeholder="Enter phone number"
              value={formData.phone} onChange={handleRegistrationChange} required
            />
            <Input
              id="email" type="email" label="Email Address" placeholder="Enter email address"
              value={formData.email} onChange={handleRegistrationChange}
            />
            <Input
              id="clubInstitution" label="Club/Institution" placeholder="Enter club or institution name"
              value={formData.clubInstitution} onChange={handleRegistrationChange}
            />
            <Input
              id="registrationNo" label="Player Registration No." placeholder="Enter registration number"
              value={formData.registrationNo} onChange={handleRegistrationChange}
            />
            <Input
              id="aadhaarNo" label="Aadhaar No." placeholder="Enter Aadhaar number"
              value={formData.aadhaarNo} onChange={handleRegistrationChange}
            />

            <div className="pt-8 flex justify-end gap-3 pb-2 mt-auto">
              <button
                type="button"
                onClick={() => setIsRegistrationOpen(false)}
                className="px-8 py-2.5 bg-[#f4f4f4] text-[#555] text-[13px] font-medium rounded-sm hover:bg-[#eaeaea] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 bg-[#555] text-white text-[13px] font-medium rounded-sm hover:bg-[#444] transition-colors"
              >
                Register Player
              </button>
            </div>
          </form>
        </div>
      </SlideOver>
    </div>
  );
}
