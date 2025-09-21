import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "@/features/auth/authSlice";
import { AppDispatch } from "@/app/store";

export default function GoogleSuccess() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      dispatch(loginWithGoogle(code))
        .unwrap() // dùng unwrap để bắt lỗi từ createAsyncThunk
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error("Google login error:", err);
          navigate("/login");
        });
    }
  }, [dispatch, navigate]);

  return <p>Đang xử lý đăng nhập...</p>;
}
