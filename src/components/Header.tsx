import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Film, User, Search, Ticket, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import Brand from "./Brand";

const Header = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Danh sách các liên kết điều hướng
  const navLinks = [
    { to: "/", label: "Trang chủ" },
    { to: "/movies", label: "Phim" },
    { to: "/cinemas", label: "Rạp chiếu" },
    { to: "/promotions", label: "Khuyến mãi" },
  ];

  // Thành phần liên kết điều hướng
  const NavLinks = () => (
    <nav className="flex gap-6 items-center">
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-cinema-text hover:text-cinema-primary transition"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  // Thành phần xác thực (đăng nhập/đăng xuất)
  const AuthSection = () => (
    <div className="flex gap-4 items-center">
      {isAuthenticated ? (
        <div className="flex gap-2">
          <Link to="/profile">
            <Button variant="ghost" className="flex gap-2 items-center">
              <User size={18} />
              <span className="hidden sm:inline">Tài khoản</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex gap-2 items-center"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Đăng xuất</span>
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link to="/login">
            <Button variant="outline">Đăng nhập</Button>
          </Link>
          <Link to="/register">
            <Button>Đăng ký</Button>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Phần logo và menu trái */}
        <div className="flex items-center gap-4">
          {/* Menu cho thiết bị di động */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[240px] bg-cinema-background border-r border-cinema-primary/20"
              >
                <div className="py-6 flex flex-col gap-6">
                  <Brand />
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="text-cinema-text hover:text-cinema-primary transition"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-800 my-2" />
                    {isAuthenticated ? (
                      <>
                        <Link
                          to="/profile"
                          className="text-cinema-text hover:text-cinema-primary transition"
                        >
                          Tài khoản
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="text-left text-cinema-text hover:text-cinema-primary transition"
                        >
                          Đăng xuất
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="text-cinema-text hover:text-cinema-primary transition"
                        >
                          Đăng nhập
                        </Link>
                        <Link
                          to="/register"
                          className="text-cinema-text hover:text-cinema-primary transition"
                        >
                          Đăng ký
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <Brand />
          {!isMobile && <NavLinks />}
        </div>

        {/* Phần bên phải: tìm kiếm và xác thực */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search />
          </Button>
          {!isMobile && <AuthSection />}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-cinema-background border-l border-cinema-primary/20">
                <div className="py-6 flex flex-col gap-4">
                  <h3 className="text-lg font-semibold">Tài khoản</h3>
                  {isAuthenticated ? (
                    <>
                      <Link to="/profile">
                        <Button variant="ghost" className="justify-start w-full">
                          <User className="mr-2 h-4 w-4" />
                          Hồ sơ
                        </Button>
                      </Link>
                      <Link to="/profile?tab=orders">
                        <Button variant="ghost" className="justify-start w-full">
                          <Ticket className="mr-2 h-4 w-4" />
                          Vé đã mua
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="justify-start text-cinema-primary w-full"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Đăng xuất
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="outline" className="w-full">
                          Đăng nhập
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button className="w-full">Đăng ký</Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
