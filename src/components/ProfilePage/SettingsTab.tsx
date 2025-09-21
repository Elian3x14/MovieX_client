// components/account/SettingsTab.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import ChangePasswordDialog from "../dialogs/ChangePasswordDialog";

const SettingsTab = () => {
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Tùy chọn tài khoản</CardTitle>
            <CardDescription>
              Quản lý cài đặt và tùy chọn tài khoản của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Email notification */}
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

            {/* Change password */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Mật khẩu</h3>
              <Separator />
              <Button
                variant="outline"
                onClick={() => setOpenChangePassword(true)}
              >
                Đổi mật khẩu
              </Button>
            </div>

            {/* Danger zone */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Khu vực nguy hiểm</h3>
              <Separator className="bg-destructive/20" />
              <Button variant="destructive">Xóa tài khoản</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      {/* Hidden component */}
      <ChangePasswordDialog
        open={openChangePassword}
        setOpen={setOpenChangePassword}
      />
    </>
  );
};

export default SettingsTab;
