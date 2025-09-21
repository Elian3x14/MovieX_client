import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Brand from "@/components/Brand";
import { LoginFormInputs, loginSchema } from "@/schemas/loginSchema";
import AuthProviderButtons from "@/components/AuthProviderButtons";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { login } from "@/features/auth/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await dispatch(login({ email: data.email, password: data.password }));
      if (login.fulfilled.match(result)) {
        toast.success("Đăng nhập thành công");
        navigate("/");
      } else {
        toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cinema-background py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Brand />
        </div>

        <Card className="bg-card border-none shadow-xl">
          <CardHeader>
            <CardTitle>Chào mừng trở lại</CardTitle>
            <CardDescription>Vui lòng đăng nhập để tiếp tục</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="bg-background"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-cinema-primary hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-background"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </form>

            <AuthProviderButtons />
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 items-center justify-center">
            <div className="text-center text-sm">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-cinema-primary hover:underline"
              >
                Đăng ký ngay
              </Link>
            </div>
            <div className="text-center text-xs text-cinema-muted">
              Bằng việc tiếp tục, bạn đồng ý với{" "}
              <Link to="/terms" className="underline">
                Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link to="/privacy" className="underline">
                Chính sách bảo mật
              </Link>{" "}
              của chúng tôi.
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm text-cinema-muted hover:text-cinema-text"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
