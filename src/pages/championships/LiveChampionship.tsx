import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function LiveChampionship() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/championships')}
          className="mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Championships
        </Button>
        
        <h1 className="text-2xl font-bold text-gray-900">Live Championship</h1>
        <p className="mt-1 text-sm text-gray-600">
          Live management for championship ID: {id}
        </p>
      </div>

      <Card>
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Live Championship Management</h3>
            <p className="mt-2 text-sm text-gray-500">
              This page will provide live management features for championship {id}.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
