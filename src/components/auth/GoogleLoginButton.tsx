import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export const GoogleLoginButton = () => {
  const googleAuthUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }auth/google/login/`;
  
  return (
    <Button
      variant="outline"
      className="bg-background flex items-center gap-2"
      asChild
    >
      <Link to={googleAuthUrl}>
        <FcGoogle className="text-xl" />
        Google
      </Link>
    </Button>
  );
};
