
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Brand from "@/components/Brand";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("success");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Get email from query params or state when redirecting
  const email = new URLSearchParams(location.search).get("email") || "";
  const token = new URLSearchParams(location.search).get("token") || "";

  useEffect(() => {
    // If token is present in URL, verify the email
    if (token) {
      verifyEmail();
    }
  }, [token]);

  // Handle automatic redirect after successful verification
  useEffect(() => {
    let timer: number;
    
    if (verificationStatus === "success" && countdown > 0) {
      timer = window.setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (verificationStatus === "success" && countdown === 0) {
      navigate("/login");
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [verificationStatus, countdown, navigate]);

  // Verify email with token
  const verifyEmail = async () => {
    try {
      // Here we would normally call the API to verify the email
      // For now, we'll simulate a successful verification
      // await axiosInstance.post("/verify-email/", { token });
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        setVerificationStatus("success");
        toast({
          title: "Email verified successfully",
          description: "Your account has been activated. You can now login.",
        });
      }, 1500);
    } catch (error) {
      setVerificationStatus("error");
      toast({
        title: "Verification failed",
        description: "There was a problem verifying your email. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle resending verification email
  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      // Call API to resend verification email
      // await axiosInstance.post("/resend-verification/", { email });
      
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Email Sent",
          description: "A new verification email has been sent to your inbox.",
        });
        setIsResending(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Failed to resend",
        description: "There was a problem sending the verification email. Please try again.",
        variant: "destructive",
      });
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Brand />
          </div>

          <Card className="bg-card border-none shadow-xl">
            <CardHeader className="text-center">
              {verificationStatus === "success" ? (
                <CheckCircle className="text-green-500 mx-auto h-12 w-12 mb-2" />
              ) : verificationStatus === "error" ? (
                <AlertCircle className="text-red-500 mx-auto h-12 w-12 mb-2" />
              ) : (
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cinema-primary"
                  >
                    <rect width="16" height="13" x="4" y="7" rx="2" />
                    <path d="m5 7 7 5 7-5" />
                    <path d="M12 19h.01" />
                  </svg>
                </div>
              )}
              <CardTitle className="text-xl font-bold">
                {verificationStatus === "success"
                  ? "Email Verified Successfully!"
                  : verificationStatus === "error"
                  ? "Verification Failed"
                  : "Verify Your Email"}
              </CardTitle>
              <CardDescription>
                {verificationStatus === "success" ? (
                  "Your email has been successfully verified. Your account is now active."
                ) : verificationStatus === "error" ? (
                  "We couldn't verify your email address."
                ) : (
                  <>
                    We've sent a verification email to
                    <div className="font-medium text-cinema-primary mt-1">
                      {email || "your email address"}
                    </div>
                  </>
                )}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              {verificationStatus === "success" && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-md">
                    <p className="text-sm text-green-800">
                      Thank you for verifying your email address. You can now access all the features of our platform.
                    </p>
                  </div>
                  <p className="text-sm text-cinema-muted">
                    Redirecting to login in {countdown} seconds...
                  </p>
                </div>
              )}

              {verificationStatus === "pending" && (
                <div className="space-y-4">
                  <p className="text-sm text-cinema-muted">
                    Please check your inbox and click on the verification link to
                    complete your registration. If you don't see the email, check
                    your spam folder.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-md">
                    <p className="text-sm text-blue-800">
                      The verification link will expire in 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {verificationStatus === "error" && (
                <p className="text-sm text-cinema-muted">
                  The verification link may have expired or is invalid.
                  Please try requesting a new verification email.
                </p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              {verificationStatus === "success" ? (
                <Button className="w-full" asChild>
                  <Link to="/login">Continue to Login</Link>
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleResendEmail}
                    disabled={isResending}
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Resend Verification Email"
                    )}
                  </Button>

                  <div className="text-center w-full">
                    <Link
                      to="/login"
                      className="text-sm text-cinema-primary hover:underline"
                    >
                      Back to Login
                    </Link>
                  </div>
                </>
              )}
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
    </div>
  );
};

export default VerifyEmail;
