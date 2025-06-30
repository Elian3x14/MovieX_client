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
import { useAppDispatch } from "@/app/hooks";
import { createCinema, updateCinema } from "@/features/cinema/cinemaSlice";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  cinema?: Cinema | null;
};

const CinemaDialog = ({ open, setOpen, cinema }: Props) => {
  const isEdit = !!cinema;
  const dispatch = useAppDispatch();

  const form = useForm<CinemaFormValues>({
    resolver: zodResolver(cinemaSchema),
    defaultValues: cinemaSchemaDefaultValues,
  });

  useEffect(() => {
    if (cinema) {
      form.reset({
        name: cinema.name,
        street: cinema.street,
        ward: cinema.ward || "",
        district: cinema.district || "",
        city: cinema.city || "",
      });
    } else {
      form.reset(cinemaSchemaDefaultValues);
    }
  }, [cinema, open]);


  const onSubmit = (data: CinemaFormValues) => {
    console.log("Submitted data:", data);
    if (isEdit) {
      console.log("Cập nhật rạp:", cinema?.id, data);
      dispatch(updateCinema({ id: cinema!.id, data })).unwrap()
        .then(() => {
          toast.success("Rạp chiếu đã được cập nhật thành công!");
        })
        .catch((error) => { toast.error(`Lỗi khi cập nhật rạp chiếu: ${error.message}`); });
    } else {
      console.log("Tạo rạp mới:", data);
      dispatch(createCinema(data)).unwrap()
        .then(() => {
          toast.success("Rạp chiếu đã được lưu thành công!")
        })
        .catch((error) => { toast.error(`Lỗi khi lưu rạp chiếu: ${error.message}`); });
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
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên đường</FormLabel>
                  <FormControl>
                    <Input placeholder="72 Lê Thánh Tôn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phường (nếu có)</FormLabel>
                  <FormControl>
                    <Input placeholder="Bến Nghé" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận (nếu có)</FormLabel>
                  <FormControl>
                    <Input placeholder="Quận 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thành phố</FormLabel>
                  <FormControl>
                    <Input placeholder="Hồ Chí Minh" {...field} />
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
