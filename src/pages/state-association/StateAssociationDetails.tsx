import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Input } from '../../components/ui';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function StateAssociationDetails() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const [association, setAssociation] = useState({
    name: 'Kerala Softball Association',
    secretary: 'Anil A Johnson',
    phone: '+917012839918',
    email: 'secretary@softballkerala.com',
    website: 'www.softballkerala.com',
    address: '11/234 Kudappanakunnu, Trivandrum',
    city: 'Trivandrum',
    state: 'Kerala',
    country: 'India',
    pinCode: '695014',
    facebook: 'https://facebook.com/softballkerala',
    instagram: 'https://instagram.com/softballkerala',
    twitter: 'https://twitter.com/softballkerala',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    totalDistricts: 14,
    totalPlayers: 1200,
    totalClubs: 50
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssociation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/state-association')}
          className="mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to State Associations
        </Button>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">State Association Details</h1>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Association Information</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    label="Association Name"
                    value={association.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    name="secretary"
                    label="Secretary Name"
                    value={association.secretary}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    name="phone"
                    label="Phone Number"
                    value={association.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    name="email"
                    label="Email Address"
                    value={association.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    name="website"
                    label="Website"
                    value={association.website}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    name="address"
                    label="Address"
                    value={association.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    name="city"
                    label="City"
                    value={association.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    name="state"
                    label="State"
                    value={association.state}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    name="country"
                    label="Country"
                    value={association.country}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    name="pinCode"
                    label="Pin Code"
                    value={association.pinCode}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={association.description}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Social Media */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media</h3>
              
              <div className="space-y-4">
                <Input
                  name="facebook"
                  label="Facebook"
                  value={association.facebook}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                
                <Input
                  name="instagram"
                  label="Instagram"
                  value={association.instagram}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                
                <Input
                  name="twitter"
                  label="Twitter"
                  value={association.twitter}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Logo */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Association Logo</h3>
              <div className="flex justify-center">
                <div className="h-32 w-32 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-bold text-xl">KSA</span>
                </div>
              </div>
              {isEditing && (
                <div className="mt-4">
                  <Button className="w-full">Upload Logo</Button>
                </div>
              )}
            </div>
          </Card>

          {/* Statistics */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">District Associations</span>
                  <span className="text-sm font-medium text-gray-900">{association.totalDistricts}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Players</span>
                  <span className="text-sm font-medium text-gray-900">{association.totalPlayers}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Clubs</span>
                  <span className="text-sm font-medium text-gray-900">{association.totalClubs}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Secretary Photo */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Secretary Photo</h3>
              <div className="flex justify-center">
                <div className="h-32 w-32 rounded-lg bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Photo</span>
                </div>
              </div>
              {isEditing && (
                <div className="mt-4">
                  <Button className="w-full">Upload Photo</Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
