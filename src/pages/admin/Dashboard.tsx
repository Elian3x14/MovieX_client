
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, MapPin, Calendar, Users, Ticket, ChartBarIcon, TrendingUp, Database } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const monthlyRevenue = [
  { name: "Jan", revenue: 45000000 },
  { name: "Feb", revenue: 52000000 },
  { name: "Mar", revenue: 48000000 },
  { name: "Apr", revenue: 61000000 },
  { name: "May", revenue: 58000000 },
  { name: "Jun", revenue: 59000000 },
  { name: "Jul", revenue: 70000000 },
  { name: "Aug", revenue: 68000000 },
  { name: "Sep", revenue: 72000000 },
  { name: "Oct", revenue: 75000000 },
  { name: "Nov", revenue: 80000000 },
  { name: "Dec", revenue: 95000000 },
];

const movieRevenue = [
  { name: "Dune: Part Two", revenue: 32000000, tickets: 2210 },
  { name: "Deadpool & Wolverine", revenue: 45000000, tickets: 3400 },
  { name: "Furiosa", revenue: 18000000, tickets: 1250 },
  { name: "Inside Out 2", revenue: 35000000, tickets: 2800 },
  { name: "The Batman", revenue: 28000000, tickets: 1900 },
];

const cinemaRevenue = [
  { name: "Galaxy Cinema", revenue: 45000000, tickets: 3780 },
  { name: "CGV", revenue: 58000000, tickets: 4920 },
  { name: "BHD Star", revenue: 36000000, tickets: 3150 },
  { name: "Lotte Cinema", revenue: 42000000, tickets: 3560 },
  { name: "Beta Cineplex", revenue: 28000000, tickets: 2450 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND',
    maximumFractionDigits: 0 
  }).format(value);
};

const AdminDashboard = () => {
  const totalRevenue = monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
  const totalTickets = movieRevenue.reduce((sum, item) => sum + item.tickets, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 added this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Cinemas</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Across 5 cities</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">+15% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.5% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Revenue Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue trends over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              className="h-80" 
              config={{
                revenue: { theme: { light: "#0ea5e9", dark: "#0ea5e9" } }
              }}
            >
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-revenue)"
                  strokeWidth={2} 
                  name="Revenue" 
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Movies</CardTitle>
            <CardDescription>Revenue by movie title</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              className="h-80"
              config={{
                revenue: { theme: { light: "#10b981", dark: "#10b981" } }
              }}
            >
              <BarChart data={movieRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Bar 
                  dataKey="revenue" 
                  fill="var(--color-revenue)" 
                  name="Revenue" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cinema Revenue</CardTitle>
            <CardDescription>Revenue by cinema location</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cinema</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Tickets</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cinemaRevenue.map((cinema) => (
                  <TableRow key={cinema.name}>
                    <TableCell className="font-medium">{cinema.name}</TableCell>
                    <TableCell>{formatCurrency(cinema.revenue)}</TableCell>
                    <TableCell className="text-right">{cinema.tickets.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest ticket reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                  <div>
                    <p className="font-medium">Ticket #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">User#{2000 + i} • 2 tickets</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₫120,000</p>
                    <p className="text-sm text-muted-foreground">{i} hour ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
