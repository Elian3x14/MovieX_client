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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Room } from "@/data/type";
import {
  roomSchema,
  roomSchemaDefaultValues,
  RoomFormValues,
} from "@/schemas/roomSchema";
import { createRoom, updateRoom } from "@/features/room/roomSlice";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCinemas } from "@/features/cinema/cinemaSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  room?: Room | null;
};

const RoomDialog = ({ open, setOpen, room }: Props) => {
  const isEdit = !!room;
  const dispatch = useAppDispatch();
  const { cinemas } = useAppSelector((state) => state.cinema);

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: roomSchemaDefaultValues,
  });

  useEffect(() => {
    if (Object.keys(cinemas).length === 0) {
      dispatch(fetchCinemas())
        .unwrap()
        .catch((err) =>
          toast.error(`Lỗi khi tải danh sách rạp: ${err.message}`)
        );
    }
  }, [dispatch, cinemas]);

  useEffect(() => {
    if (room) {
      form.reset({
        name: room.name,
        no_row: room.no_row,
        no_column: room.no_column,
        cinema_id: room.cinema_id || room.cinema?.id,
      });
    } else {
      form.reset(roomSchemaDefaultValues);
    }
  }, [room, open]);

  const onSubmit = (data: RoomFormValues) => {
    if (isEdit && room) {
      dispatch(updateRoom({ id: room.id, data }))
        .unwrap()
        .then(() => toast.success("Phòng chiếu đã được cập nhật thành công!"))
        .catch((err) =>
          toast.error(`Lỗi khi cập nhật phòng chiếu: ${err.message}`)
        );
    } else {
      dispatch(createRoom(data))
        .unwrap()
        .then(() => toast.success("Phòng chiếu đã được tạo thành công!"))
        .catch((err) =>
          toast.error(`Lỗi khi tạo phòng chiếu: ${err.message}`)
        );
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
              <DialogTitle>
                {isEdit ? "Chỉnh sửa phòng chiếu" : "Thêm phòng chiếu mới"}
              </DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Chỉnh sửa thông tin phòng chiếu bên dưới."
                  : "Điền đầy đủ thông tin cho phòng chiếu mới."}
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên phòng</FormLabel>
                  <FormControl>
                    <Input placeholder="Phòng 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="no_row"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số hàng ghế</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="no_column"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số cột ghế</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cinema_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rạp chiếu</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn rạp chiếu" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(cinemas).map((cinema) => (
                          <SelectItem
                            key={cinema.id}
                            value={cinema.id.toString()}
                          >
                            {cinema.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Huỷ
              </Button>
              <Button type="submit">
                {isEdit ? "Cập nhật" : "Lưu phòng"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDialog;
