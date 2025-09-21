import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import AuthProviderButtons from "@/components/AuthProviderButtons";
import { RegisterFormInputs, registerSchema } from "@/schemas/registerSchema";
import axiosInstance from "@/lib/axios";
import Brand from "@/components/Brand";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await axiosInstance.post("register/", {
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone,
        email: data.email,
        password: data.password,
      });

      toast.success(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản."
      );

      navigate(
        `/register/verify-email?email=${encodeURIComponent(data.email)}`
      );
    } catch (error: any) {
      let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";

      // Kiểm tra nếu server trả về lỗi cho phone_number
      if (error.response?.status === 400 && error.response?.data) {
        const data = error.response.data;

        if (data.phone_number && Array.isArray(data.phone_number)) {
          errorMessage = data.phone_number.join(", ");
        } else if (data.email && Array.isArray(data.email)) {
          errorMessage = data.email.join(", ");
        } else if (data.detail) {
          errorMessage = data.detail;
        }
      }

      toast.error(errorMessage, {
        description: "Vui lòng kiểm tra lại thông tin đã nhập.",
      });
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
            <CardTitle>Tạo tài khoản</CardTitle>
            <CardDescription>
              Đăng ký để bắt đầu đặt vé xem phim
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Họ</Label>
                  <Input
                    id="firstName"
                    placeholder="Nguyễn"
                    className="bg-background"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Tên</Label>
                  <Input
                    id="lastName"
                    placeholder="Văn A"
                    className="bg-background"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="bg-background"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0987654321"
                  className="bg-background"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="bg-background"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Tạo tài khoản
              </Button>
            </form>

            <AuthProviderButtons />
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 items-center justify-center">
            <div className="text-center text-sm">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-cinema-primary hover:underline">
                Đăng nhập
              </Link>
            </div>
            <div className="text-center text-xs text-cinema-muted">
              Khi đăng ký, bạn đã đồng ý với{" "}
              <Link to="/terms" className="underline">
                Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link to="/privacy" className="underline">
                Chính sách bảo mật
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm text-cinema-muted hover:text-cinema-text"
          >
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
