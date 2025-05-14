import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Film, User, Search, Ticket } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const isMobile = useIsMobile();
  const { user, logout, isAuthenticated } = useAuth();
  const NavLinks = () => (
    <nav className="flex gap-6 items-center">
      <Link
        to="/"
        className="text-cinema-text hover:text-cinema-primary transition"
      >
        Home
      </Link>
      <Link
        to="/movies"
        className="text-cinema-text hover:text-cinema-primary transition"
      >
        Movies
      </Link>
      <Link
        to="/cinemas"
        className="text-cinema-text hover:text-cinema-primary transition"
      >
        Cinemas
      </Link>
      <Link
        to="/promotions"
        className="text-cinema-text hover:text-cinema-primary transition"
      >
        Promotions
      </Link>
    </nav>
  );

  const AuthSection = () => (
    <div className="flex gap-4 items-center">
      {isAuthenticated ? (
        <Button variant="ghost" className="flex gap-2 items-center">
          <User size={18} />
          <span className="hidden sm:inline">My Account</span>
        </Button>
      ) : (
        <div className="flex gap-2">
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link to="/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
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
                  <Link
                    to="/"
                    className="flex items-center gap-2 font-bold text-xl text-cinema-primary"
                  >
                    <Film size={24} />
                    <span>CinemaPlus</span>
                  </Link>
                  <div className="flex flex-col gap-4">
                    <Link
                      to="/"
                      className="text-cinema-text hover:text-cinema-primary transition"
                    >
                      Home
                    </Link>
                    <Link
                      to="/movies"
                      className="text-cinema-text hover:text-cinema-primary transition"
                    >
                      Movies
                    </Link>
                    <Link
                      to="/cinemas"
                      className="text-cinema-text hover:text-cinema-primary transition"
                    >
                      Cinemas
                    </Link>
                    <Link
                      to="/promotions"
                      className="text-cinema-text hover:text-cinema-primary transition"
                    >
                      Promotions
                    </Link>
                    <div className="border-t border-gray-800 my-2" />
                    <Link
                      to="/login"
                      className="text-cinema-text hover:text-cinema-primary transition"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="text-cinema-text hover:text-cinema-primary transition"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-cinema-primary"
          >
            <Film size={24} />
            <span>CinemaPlus</span>
          </Link>
          {!isMobile && <NavLinks />}
        </div>

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
                  <h3 className="text-lg font-semibold">Account</h3>
                  {isAuthenticated ? (
                    <>
                      <Button variant="ghost" className="justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Ticket className="mr-2 h-4 w-4" />
                        My Bookings
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start text-cinema-primary"
                      >
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="outline" className="w-full">
                          Log In
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button className="w-full">Sign Up</Button>
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
