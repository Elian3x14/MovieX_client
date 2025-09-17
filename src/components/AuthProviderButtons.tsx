import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGithubSquare } from "react-icons/fa";
import { GoogleLoginButton } from "./auth/GoogleLoginButton";

const AuthProviderButtons: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-cinema-muted">
            Hoặc đăng nhập với
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <GoogleLoginButton />
        <Button variant="outline" className="bg-background">
          <FaGithubSquare />
          GitHub
        </Button>
      </div>
    </div>
  );
};

export default AuthProviderButtons;
