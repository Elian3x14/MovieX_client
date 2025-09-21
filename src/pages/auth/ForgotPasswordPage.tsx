import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Brand from "@/components/Brand"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
})

type FormValues = z.infer<typeof formSchema>

const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // TODO: gọi API gửi mail reset mật khẩu
      // await api.post("/auth/forgot-password", data)

      toast.success(
        "Nếu email tồn tại, chúng tôi đã gửi một liên kết đặt lại mật khẩu."
      )
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cinema-background py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Brand />
        </div>

        <Card className="bg-card border-none shadow-xl">
          <CardHeader>
            <CardTitle>Quên mật khẩu</CardTitle>
            <CardDescription>
              Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu.
            </CardDescription>
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

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : "Gửi liên kết đặt lại"}
              </Button>
            </form>

            <div className="mt-6 text-sm text-gray-500 space-y-1">
              <p>Kiểm tra hộp thư đến và thư mục spam sau khi gửi yêu cầu.</p>
              <p>Liên kết chỉ có hiệu lực trong một khoảng thời gian nhất định.</p>
              <p>Nếu gặp sự cố, vui lòng liên hệ bộ phận hỗ trợ.</p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 items-center justify-center">
            <div className="text-center text-sm">
              Đã nhớ mật khẩu?{" "}
              <Link
                to="/login"
                className="text-cinema-primary hover:underline"
              >
                Đăng nhập ngay
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
  )
}

export default ForgotPasswordPage
