import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  ChangePasswordFormValues,
  changePasswordSchema,
} from "@/schemas/changePasswordSchema";
import axiosInstance from "@/lib/axios";
import axios from "@/lib/axios";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const defaultValues: ChangePasswordFormValues = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

const ChangePasswordDialog = ({ open, setOpen }: Props) => {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [open]);

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      await axiosInstance.post("/change-password/", data);
      toast.success("Đổi mật khẩu thành công!");
      setOpen(false);
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Mật khẩu cũ không đúng. Vui lòng thử lại.");
      } else {
        toast.error("Đổi mật khẩu thất bại! Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[500px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Đổi mật khẩu</DialogTitle>
              <DialogDescription>
                Vui lòng nhập mật khẩu cũ và mật khẩu mới bên dưới.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="old_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu cũ</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu cũ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập lại mật khẩu mới"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Huỷ
              </Button>
              <Button type="submit">Xác nhận</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
