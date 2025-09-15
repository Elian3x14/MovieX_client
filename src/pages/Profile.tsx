
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { UserRole } from "@/data/type";

// Define form schema
const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      fullName: "",
      phone: "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });

    setIsEditing(false);
  };

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-6 flex justify-between items-center">

        <h1 className="text-3xl font-bold">Hồ sơ của tôi</h1>
        {
          user?.role == UserRole.ADMIN && (
            <Button asChild variant="link" className="text-sm">
              <Link to="/admin" className="text-cinema-primary hover:underline">
                Trang quản trị 
                <ExternalLink className="size-4" />
              </Link>
            </Button>
          )
        }
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          <TabsTrigger value="orders">Vé đã mua</TabsTrigger>
          <TabsTrigger value="preferences">Tuỳ chọn</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Thẻ Hồ sơ */}
            <Card className="md:col-span-1">
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user?.avatar || ""} alt={user?.username} />
                    <AvatarFallback className="text-2xl bg-cinema-primary text-white">
                      {user?.username?.substring(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{user?.username}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Thành viên từ</span>
                    <span>Tháng 4, 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trạng thái</span>
                    <span className="text-cinema-primary font-medium">Hoạt động</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Điểm thưởng</span>
                    <span>750 điểm</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Tải ảnh mới
                </Button>
              </CardFooter>
            </Card>

            {/* Biểu mẫu Hồ sơ */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>
                  Quản lý thông tin cá nhân của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ và tên</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={!isEditing}
                              placeholder="Nhập họ và tên"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên người dùng</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={!isEditing}
                              placeholder="Nhập tên người dùng"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled
                              type="email"
                              placeholder="Nhập email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={!isEditing}
                              placeholder="Nhập số điện thoại"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end space-x-4 pt-4">
                      {isEditing ? (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                          >
                            Huỷ
                          </Button>
                          <Button type="submit">Lưu thay đổi</Button>
                        </>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => setIsEditing(true)}
                        >
                          Chỉnh sửa hồ sơ
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Vé của tôi</CardTitle>
              <CardDescription>
                Xem lịch sử đặt vé của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <p>Bạn chưa mua vé nào.</p>
                <Button className="mt-4" asChild>
                  <a href="/movies">Xem phim</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Tùy chọn tài khoản</CardTitle>
              <CardDescription>
                Quản lý cài đặt và tùy chọn tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thông báo Email</h3>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Phim mới phát hành</p>
                      <p className="text-sm text-muted-foreground">
                        Nhận thông báo về các phim mới phát hành
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Khuyến mãi</p>
                      <p className="text-sm text-muted-foreground">
                        Nhận các ưu đãi khuyến mãi và giảm giá
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Mật khẩu</h3>
                <Separator />
                <Button variant="outline">Đổi mật khẩu</Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Khu vực nguy hiểm</h3>
                <Separator className="bg-destructive/20" />
                <Button variant="destructive">Xóa tài khoản</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Profile;
