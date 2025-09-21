import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function GoogleSuccess() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      loginWithGoogle(code)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error("Google login error:", err);
          navigate("/login");
        });
    }
  }, [navigate, loginWithGoogle]);

  return <p>Đang xử lý đăng nhập...</p>;
}
