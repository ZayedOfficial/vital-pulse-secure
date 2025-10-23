import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';

export default function DoctorReports() {
  const reports = [
    { id: 1, patient: 'John Smith', type: 'Lab Results', date: '2025-10-22', status: 'Reviewed' },
    { id: 2, patient: 'Robert Wilson', type: 'X-Ray', date: '2025-10-21', status: 'Pending' },
    { id: 3, patient: 'Patricia Moore', type: 'Blood Work', date: '2025-10-20', status: 'Reviewed' },
    { id: 4, patient: 'John Smith', type: 'ECG', date: '2025-10-19', status: 'Reviewed' },
    { id: 5, patient: 'Robert Wilson', type: 'CT Scan', date: '2025-10-18', status: 'Reviewed' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Patient Reports</h1>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{report.type}</h3>
                      <p className="text-sm text-muted-foreground">Patient: {report.patient}</p>
                      <p className="text-xs text-muted-foreground mt-1">Date: {report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={report.status === 'Reviewed' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
