import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VitalCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  status?: 'normal' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
}

export function VitalCard({ title, value, unit, icon: Icon, status = 'normal', trend }: VitalCardProps) {
  const statusColors = {
    normal: 'text-success',
    warning: 'text-warning',
    critical: 'text-destructive',
  };

  const bgColors = {
    normal: 'bg-success/10',
    warning: 'bg-warning/10',
    critical: 'bg-destructive/10',
  };

  return (
    <Card className="shadow-card hover:shadow-hover transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn('rounded-full p-2', bgColors[status])}>
          <Icon className={cn('h-4 w-4', statusColors[status])} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <div className="text-2xl font-bold">
            {value}
          </div>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend === 'up' && '↑ Increasing'}
            {trend === 'down' && '↓ Decreasing'}
            {trend === 'stable' && '→ Stable'}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
