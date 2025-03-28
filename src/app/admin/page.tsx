import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

type DashboardCardProps = {
  title: string
  subtitle?: string
  body: React.ReactNode
}
function getSalesData() {}
function DashboardCard({title, subtitle, body}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard title="Sales" subtitle="Description" body={<p>Text</p>} />
    </div>
  )
}
