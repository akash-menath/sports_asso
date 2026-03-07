import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '../../components/ui';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { playerStore } from '../../lib/playerStore';
import toast from 'react-hot-toast';

export default function PlayerRegistration() {
  const navigate = useNavigate();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.level || !formData.district || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      playerStore.savePlayer({
        ...formData,
        status: 'Pending',
      });
      toast.success("Player registered successfully!");
      navigate('/players');
    } catch (error) {
      toast.error("Failed to register player.");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/players')}
          className="mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Players
        </Button>

        <h1 className="text-2xl font-bold text-gray-900">Player Registration</h1>
        <p className="mt-1 text-sm text-gray-600">
          Register a new softball player
        </p>
      </div>

      <Card>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="name"
                label="Full Name *"
                placeholder="Enter player name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <div className="w-full">
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Category/Level *
                </label>
                <select
                  id="level"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[38px]"
                  value={formData.level}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Junior Level">Junior Level</option>
                  <option value="Sub-Junior Level">Sub-Junior Level</option>
                  <option value="Ponny">Ponny</option>
                </select>
              </div>
              <Input
                id="district"
                label="District *"
                placeholder="Enter district"
                value={formData.district}
                onChange={handleChange}
                required
              />
              <Input
                id="phone"
                label="Phone Number *"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                id="clubInstitution"
                label="Club/Institution"
                placeholder="Enter club or institution name"
                value={formData.clubInstitution}
                onChange={handleChange}
              />
              <Input
                id="registrationNo"
                label="Player Registration No."
                placeholder="Enter registration number"
                value={formData.registrationNo}
                onChange={handleChange}
              />
              <Input
                id="aadhaarNo"
                label="Aadhaar No."
                placeholder="Enter Aadhaar number"
                value={formData.aadhaarNo}
                onChange={handleChange}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit">
                Register Player
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
