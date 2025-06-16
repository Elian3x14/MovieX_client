import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Cinema } from "@/data/type";
import { cinemaSchema, cinemaSchemaDefaultValues, CinemaFormValues } from "@/schemas/cinemaSchema";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  cinema?: Cinema | null;
};

const CinemaDialog = ({ open, setOpen, cinema }: Props) => {
  const isEdit = !!cinema;

  const form = useForm<CinemaFormValues>({
    resolver: zodResolver(cinemaSchema),
    defaultValues: cinemaSchemaDefaultValues,
  });

  useEffect(() => {
    if (cinema) {
      form.reset({
        name: cinema.name,
        address: cinema.address,
        halls: cinema.halls,
        image: cinema.image || "",
      });
    } else {
      form.reset(cinemaSchemaDefaultValues);
    }
  }, [cinema, open]);

  const onSubmit = (data: CinemaFormValues) => {
    if (isEdit) {
      console.log("Cập nhật rạp:", cinema?.id, data);
      // dispatch(updateCinema(cinema.id, data));
    } else {
      console.log("Tạo rạp mới:", data);
      // dispatch(createCinema(data));
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[600px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{isEdit ? "Chỉnh sửa rạp" : "Thêm rạp mới"}</DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Chỉnh sửa thông tin rạp chiếu bên dưới."
                  : "Điền đầy đủ thông tin cho rạp chiếu mới."}
              </DialogDescription>
            </DialogHeader>

            {/* Tên rạp */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên rạp</FormLabel>
                  <FormControl>
                    <Input placeholder="CGV Vincom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Địa chỉ */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input placeholder="72 Lê Thánh Tôn, Q1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Số phòng chiếu */}
            <FormField
              control={form.control}
              name="halls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số phòng chiếu</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ảnh đại diện */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh rạp (URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Huỷ
              </Button>
              <Button type="submit">{isEdit ? "Cập nhật" : "Lưu rạp"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CinemaDialog;
