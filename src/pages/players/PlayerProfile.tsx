import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PlayerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

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
        
        <h1 className="text-2xl font-bold text-gray-900">Player Profile</h1>
        <p className="mt-1 text-sm text-gray-600">
          Player ID: {id}
        </p>
      </div>

      <Card>
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Player Profile Details</h3>
            <p className="mt-2 text-sm text-gray-500">
              This page will show detailed information about player {id}.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
