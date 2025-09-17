import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// TODO: Không để token trên URL
// thêm vào useAuth khi đăng nhập thành công

export default function GoogleSuccess() {
  const navigate = useNavigate();
  const a = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const refresh = params.get("refresh");
    const name = params.get("name");
    const avatar = params.get("avatar");

    if (access && refresh) {
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify({ name, avatar }));

    //   navigate("/dashboard");
    }
  }, [navigate]);

  return <p>Đang xử lý đăng nhập Google...</p>;
}
