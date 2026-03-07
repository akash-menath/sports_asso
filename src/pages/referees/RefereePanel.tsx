import { Button, Card } from '../../components/ui';

export default function RefereePanel() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Referee Panel</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage referee assignments and schedules
        </p>
      </div>

      <Card>
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Referee Panel Management</h3>
            <p className="mt-2 text-sm text-gray-500">
              This page will show referee assignments and schedules.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
