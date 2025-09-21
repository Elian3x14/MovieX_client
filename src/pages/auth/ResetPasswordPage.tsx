import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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
import Brand from "@/components/Brand";
import { toast } from "sonner";
import { KeyIcon } from "lucide-react";
import { CiWarning } from "react-icons/ci";

const formSchema = z
  .object({
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const ResetPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Lấy token từ query ?token=...
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    if (!token) {
      toast.error("Liên kết không hợp lệ hoặc đã hết hạn.");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: gọi API đặt lại mật khẩu
      // await api.post("/auth/reset-password", { token, password: data.password })

      toast.success("Đặt lại mật khẩu thành công. Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
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
            <CardTitle>Đặt lại mật khẩu</CardTitle>
            <CardDescription>
              Nhập mật khẩu mới để tiếp tục truy cập tài khoản của bạn.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu mới</Label>
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

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : "Cập nhật mật khẩu"}
              </Button>
            </form>

            <div className="mt-6 text-sm text-gray-500 space-y-1">
              <p className="flex items-center gap-2">
                <KeyIcon className="size-3.5" /> Mật khẩu mới phải đủ mạnh và dễ
                nhớ.
              </p>
              <p className="flex items-center gap-2">
                <CiWarning className="size-3.5" />
                Sau khi đặt lại, hãy dùng mật khẩu này để đăng nhập.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 items-center justify-center">
            <div className="text-center text-sm">
              Quay lại{" "}
              <Link to="/login" className="text-cinema-primary hover:underline">
                Đăng nhập
              </Link>
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

export default ResetPasswordPage;
