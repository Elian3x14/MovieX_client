import { Link, useLocation } from "react-router-dom";
import {
  Film, MapPin, Calendar, Users, Home, Database, ChartBar, MoveLeft,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    path: "/admin",
    icon: Home,
    label: "Dashboard",
    tooltip: "Dashboard",
  },
  {
    path: "/admin/movies",
    icon: Film,
    label: "Movies",
    tooltip: "Movies",
  },
  {
    path: "/admin/cinemas",
    icon: MapPin,
    label: "Cinemas",
    tooltip: "Cinemas",
  },
  {
    path: "/admin/showtimes",
    icon: Calendar,
    label: "Showtimes",
    tooltip: "Showtimes",
  },
  {
    path: "/admin/users",
    icon: Users,
    label: "Users",
    tooltip: "Users",
  },
  {
    path: "/admin/reports",
    icon: ChartBar,
    label: "Revenue Reports",
    tooltip: "Reports",
  },
];

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <Sidebar>
      <SidebarRail />
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="text-xl font-bold">
            Movie<span className="text-cinema-primary">X</span> Admin
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="space-y-1 p-2">
          {menuItems.map(({ path, icon: Icon, label, tooltip }) => (
            <SidebarMenuItem key={path}>
              <SidebarMenuButton asChild isActive={isActive(path)} tooltip={tooltip}>
                <Link to={path}>
                  <Icon />
                  <span>{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <div className="flex flex-col space-y-2">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            <div className="flex gap-2 items-center">
              <MoveLeft /> Return to website
            </div>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
