
import { Link, useLocation } from "react-router-dom";
import { Film, MapPin, Calendar, Users, Home, Database, ChartBar } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <Sidebar>
      <SidebarRail />
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="text-xl font-bold text-cinema-primary">Cinema Admin</h2>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/admin")}
              tooltip="Dashboard"
            >
              <Link to="/admin">
                <Home />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/admin/movies")}
              tooltip="Movies"
            >
              <Link to="/admin/movies">
                <Film />
                <span>Movies</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/admin/cinemas")}
              tooltip="Cinemas"
            >
              <Link to="/admin/cinemas">
                <MapPin />
                <span>Cinemas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/admin/showtimes")}
              tooltip="Showtimes"
            >
              <Link to="/admin/showtimes">
                <Calendar />
                <span>Showtimes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/admin/users")}
              tooltip="Users"
            >
              <Link to="/admin/users">
                <Users />
                <span>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/admin/reports")}
              tooltip="Reports"
            >
              <Link to="/admin/reports">
                <ChartBar />
                <span>Revenue Reports</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 p-4">
        <div className="flex flex-col space-y-2">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Return to website
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
