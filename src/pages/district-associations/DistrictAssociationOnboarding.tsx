import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function DistrictAssociationOnboarding() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/district-associations')}
          className="mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold text-gray-900">Create District Association</h1>
        <p className="mt-1 text-sm text-gray-600">
          Fill in the form below to register a district association
        </p>
      </div>

      <Card>
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">District Association Onboarding</h3>
            <p className="mt-2 text-sm text-gray-500">
              This page will contain the district association registration form.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
