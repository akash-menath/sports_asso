import { Card } from '../../components/ui';

export default function ReportsDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-600">
          Generate and view reports
        </p>
      </div>

      <Card>
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Reports Dashboard</h3>
            <p className="mt-2 text-sm text-gray-500">
              This page will show all available reports.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
