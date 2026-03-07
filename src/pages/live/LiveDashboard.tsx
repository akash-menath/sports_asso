import { Button, Card } from '../../components/ui';

export default function LiveDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Live</h1>
        <p className="mt-1 text-sm text-gray-600">
          Live championship management and updates
        </p>
      </div>

      <Card>
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Live Dashboard</h3>
            <p className="mt-2 text-sm text-gray-500">
              This page will show live championship updates and management.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
