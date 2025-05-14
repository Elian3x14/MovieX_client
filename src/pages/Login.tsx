import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Brand from "@/components/Brand";
import { FcGoogle } from "react-icons/fc";
import { FaGithubSquare } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would validate and authenticate the user
    toast({
      title: "Login Successful",
      description: "Welcome back to CinemaPlus!",
    });

    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-cinema-background py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Brand />
          </div>

          <Card className="bg-card border-none shadow-xl">
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-cinema-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="bg-background"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-cinema-muted">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="bg-background">
                    <FcGoogle />
                    Google
                  </Button>
                  <Button variant="outline" className="bg-background">
                    <FaGithubSquare />
                    GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 items-center justify-center">
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-cinema-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>
              <div className="text-center text-xs text-cinema-muted">
                By continuing, you agree to our{" "}
                <Link to="/terms" className="underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline">
                  Privacy Policy
                </Link>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-sm text-cinema-muted hover:text-cinema-text"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
