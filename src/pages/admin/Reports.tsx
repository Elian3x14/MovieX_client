
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, ChartPieIcon, ChartBarIcon } from "lucide-react";

// Sample data for reports
const monthlyData = [
  { month: "Jan", revenue: 45000000, tickets: 3200, avgTicketPrice: 14062 },
  { month: "Feb", revenue: 52000000, tickets: 3600, avgTicketPrice: 14444 },
  { month: "Mar", revenue: 48000000, tickets: 3400, avgTicketPrice: 14117 },
  { month: "Apr", revenue: 61000000, tickets: 4200, avgTicketPrice: 14523 },
  { month: "May", revenue: 58000000, tickets: 3900, avgTicketPrice: 14871 },
  { month: "Jun", revenue: 59000000, tickets: 4100, avgTicketPrice: 14390 }
];

const categoryData = [
  { name: "Action", value: 42000000, percentage: 25 },
  { name: "Comedy", value: 35000000, percentage: 21 },
  { name: "Drama", value: 28000000, percentage: 17 },
  { name: "Sci-Fi", value: 31000000, percentage: 19 },
  { name: "Horror", value: 15000000, percentage: 9 },
  { name: "Animation", value: 15000000, percentage: 9 }
];

const timeData = [
  { time: "10:00 - 12:00", revenue: 18000000, tickets: 1200 },
  { time: "12:00 - 14:00", revenue: 25000000, tickets: 1700 },
  { time: "14:00 - 16:00", revenue: 22000000, tickets: 1500 },
  { time: "16:00 - 18:00", revenue: 27000000, tickets: 1800 },
  { time: "18:00 - 20:00", revenue: 45000000, tickets: 3000 },
  { time: "20:00 - 22:00", revenue: 42000000, tickets: 2800 }
];

// New data for cinema revenue by day of week
const cinemaRevenueByDay = [
  { cinema: "Galaxy Cinema", monday: 8500000, tuesday: 7200000, wednesday: 9100000, thursday: 10500000, friday: 15200000, saturday: 18500000, sunday: 16800000 },
  { cinema: "CGV", monday: 9800000, tuesday: 8500000, wednesday: 10200000, thursday: 12100000, friday: 17500000, saturday: 22000000, sunday: 19600000 },
  { cinema: "BHD Star", monday: 7200000, tuesday: 6500000, wednesday: 7800000, thursday: 8900000, friday: 12500000, saturday: 15800000, sunday: 14200000 },
  { cinema: "Lotte Cinema", monday: 8100000, tuesday: 7000000, wednesday: 8600000, thursday: 9800000, friday: 14000000, saturday: 17200000, sunday: 15400000 }
];

// New data for cinema comparison
const cinemaData = [
  { name: "Galaxy Cinema", revenue: 85800000, tickets: 5720, avgOccupancy: 78, foodSales: 22000000 },
  { name: "CGV", revenue: 99700000, tickets: 6650, avgOccupancy: 85, foodSales: 28500000 },
  { name: "BHD Star", revenue: 72900000, tickets: 4860, avgOccupancy: 72, foodSales: 18600000 },
  { name: "Lotte Cinema", revenue: 80100000, tickets: 5340, avgOccupancy: 75, foodSales: 20900000 },
  { name: "Beta Cineplex", revenue: 52400000, tickets: 3490, avgOccupancy: 68, foodSales: 12100000 }
];

// New data for showtime performance by day and hour
const showtimeHeatmapData = [
  { day: "Monday", morning: 25, afternoon: 42, evening: 65, night: 58 },
  { day: "Tuesday", morning: 22, afternoon: 38, evening: 60, night: 52 },
  { day: "Wednesday", morning: 28, afternoon: 45, evening: 68, night: 60 },
  { day: "Thursday", morning: 32, afternoon: 50, evening: 72, night: 65 },
  { day: "Friday", morning: 35, afternoon: 55, evening: 85, night: 78 },
  { day: "Saturday", morning: 58, afternoon: 75, evening: 92, night: 85 },
  { day: "Sunday", morning: 52, afternoon: 68, evening: 88, night: 75 }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND',
    maximumFractionDigits: 0 
  }).format(value);
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AdminReports = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [selectedCinema, setSelectedCinema] = useState("all");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Revenue Reports</h1>
        <div className="flex gap-4">
          <Select defaultValue={selectedCinema} onValueChange={setSelectedCinema}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select cinema" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cinemas</SelectItem>
              <SelectItem value="galaxy">Galaxy Cinema</SelectItem>
              <SelectItem value="cgv">CGV</SelectItem>
              <SelectItem value="bhd">BHD Star</SelectItem>
              <SelectItem value="lotte">Lotte Cinema</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(323000000)}</div>
            <p className="text-xs text-muted-foreground">+18.2% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22,400</div>
            <p className="text-xs text-muted-foreground">+12.5% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Ticket Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(14420)}</div>
            <p className="text-xs text-muted-foreground">+5.1% from last period</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Ticket Sales</CardTitle>
            <CardDescription>Monthly performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              className="h-80" 
              config={{
                revenue: { theme: { light: "#0ea5e9", dark: "#0ea5e9" } },
                tickets: { theme: { light: "#f59e0b", dark: "#f59e0b" } }
              }}
            >
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => value.toLocaleString()} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-revenue)" 
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="tickets" 
                  stroke="var(--color-tickets)" 
                  strokeWidth={2}
                  name="Tickets"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Movie Category</CardTitle>
            <CardDescription>Distribution across genres</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ChartContainer 
              className="h-80"
              config={{
                value: { theme: { light: "#8884d8", dark: "#8884d8" } }
              }}
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={(props) => {
                  const { active, payload } = props;
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background p-2 border border-border rounded-md shadow-md">
                        <p className="font-medium">{data.name}</p>
                        <p>{formatCurrency(data.value)}</p>
                        <p>{data.percentage}% of total</p>
                      </div>
                    );
                  }
                  return null;
                }} />
              </PieChart>
            </ChartContainer>
            <div className="grid grid-cols-3 gap-2 mt-4 w-full">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Cinema Revenue Comparison Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cinema Performance Comparison</CardTitle>
          <CardDescription>Revenue and metrics across different cinemas</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            className="h-80" 
            config={{
              revenue: { theme: { light: "#10b981", dark: "#10b981" } },
              tickets: { theme: { light: "#f59e0b", dark: "#f59e0b" } },
              foodSales: { theme: { light: "#ec4899", dark: "#ec4899" } }
            }}
          >
            <BarChart 
              data={cinemaData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tickFormatter={(value) => value.toLocaleString()} 
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                yAxisId="left"
                dataKey="revenue" 
                name="Revenue" 
                fill="var(--color-revenue)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right"
                dataKey="tickets" 
                name="Tickets" 
                fill="var(--color-tickets)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="left"
                dataKey="foodSales" 
                name="Food Sales" 
                fill="var(--color-foodSales)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Weekly Revenue by Cinema */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Revenue by Cinema</CardTitle>
          <CardDescription>Daily revenue patterns across the week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            className="h-80"
            config={{
              monday: { theme: { light: "#60a5fa", dark: "#60a5fa" } },
              tuesday: { theme: { light: "#34d399", dark: "#34d399" } },
              wednesday: { theme: { light: "#a78bfa", dark: "#a78bfa" } },
              thursday: { theme: { light: "#f472b6", dark: "#f472b6" } },
              friday: { theme: { light: "#fbbf24", dark: "#fbbf24" } },
              saturday: { theme: { light: "#f87171", dark: "#f87171" } },
              sunday: { theme: { light: "#4ade80", dark: "#4ade80" } }
            }}
          >
            <BarChart 
              data={cinemaRevenueByDay} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cinema" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="monday" name="Monday" fill="var(--color-monday)" stackId="a" />
              <Bar dataKey="tuesday" name="Tuesday" fill="var(--color-tuesday)" stackId="a" />
              <Bar dataKey="wednesday" name="Wednesday" fill="var(--color-wednesday)" stackId="a" />
              <Bar dataKey="thursday" name="Thursday" fill="var(--color-thursday)" stackId="a" />
              <Bar dataKey="friday" name="Friday" fill="var(--color-friday)" stackId="a" />
              <Bar dataKey="saturday" name="Saturday" fill="var(--color-saturday)" stackId="a" />
              <Bar dataKey="sunday" name="Sunday" fill="var(--color-sunday)" stackId="a" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Showtime</CardTitle>
          <CardDescription>Performance across different time slots</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            className="h-80"
            config={{
              revenue: { theme: { light: "#10b981", dark: "#10b981" } }
            }}
          >
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="revenue" 
                name="Revenue"
                fill="var(--color-revenue)" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* New Table for Showtime Performance by Day */}
      <Card>
        <CardHeader>
          <CardTitle>Showtime Occupancy Rates (%)</CardTitle>
          <CardDescription>Average theater occupancy by day and time</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Morning (10-12)</TableHead>
                <TableHead>Afternoon (12-17)</TableHead>
                <TableHead>Evening (17-20)</TableHead>
                <TableHead>Night (20-23)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {showtimeHeatmapData.map((item) => (
                <TableRow key={item.day}>
                  <TableCell className="font-medium">{item.day}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-full bg-muted rounded-full h-2.5 overflow-hidden"
                      >
                        <div 
                          className="bg-blue-500 h-2.5 rounded-full" 
                          style={{ width: `${item.morning}%` }}
                        />
                      </div>
                      <span>{item.morning}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-full bg-muted rounded-full h-2.5 overflow-hidden"
                      >
                        <div 
                          className="bg-green-500 h-2.5 rounded-full" 
                          style={{ width: `${item.afternoon}%` }}
                        />
                      </div>
                      <span>{item.afternoon}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-full bg-muted rounded-full h-2.5 overflow-hidden"
                      >
                        <div 
                          className="bg-yellow-500 h-2.5 rounded-full" 
                          style={{ width: `${item.evening}%` }}
                        />
                      </div>
                      <span>{item.evening}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-full bg-muted rounded-full h-2.5 overflow-hidden"
                      >
                        <div 
                          className="bg-purple-500 h-2.5 rounded-full" 
                          style={{ width: `${item.night}%` }}
                        />
                      </div>
                      <span>{item.night}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Detailed Revenue Table</CardTitle>
          <CardDescription>Monthly breakdown of key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Tickets</TableHead>
                <TableHead>Avg. Ticket Price</TableHead>
                <TableHead className="text-right">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.map((item) => (
                <TableRow key={item.month}>
                  <TableCell className="font-medium">{item.month}</TableCell>
                  <TableCell>{formatCurrency(item.revenue)}</TableCell>
                  <TableCell>{item.tickets.toLocaleString()}</TableCell>
                  <TableCell>{formatCurrency(item.avgTicketPrice)}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-green-600">+{Math.floor(Math.random() * 10) + 1}%</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;
