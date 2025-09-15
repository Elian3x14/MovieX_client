import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithubSquare } from "react-icons/fa";

const AuthProviderButtons: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-cinema-muted">Or continue with</span>
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
  );
};

export default AuthProviderButtons;