import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Seat } from "@/data/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchSeatsByRoom, updateSeatAPI } from "@/features/seat/seatAPI";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RoomSeatFormValues, roomSeatSchemaDefaultValues, roomSeatSchema } from "@/schemas/roomSeatSchema";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    roomId: number;
};

const mockSeatTypes = [
    { id: 1, name: "Thường" },
    { id: 2, name: "VIP" },
    { id: 3, name: "Couple" },
];

const RoomSeatsDialog = ({ open, setOpen, roomId }: Props) => {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [loading, setLoading] = useState(false);

    const form = useForm<RoomSeatFormValues>({
        resolver: zodResolver(roomSeatSchema),
        defaultValues: roomSeatSchemaDefaultValues
    });
    
    useEffect(() => {
        if (!open) return;
        setLoading(true);
        fetchSeatsByRoom(roomId)
            .then((data) => setSeats(data))
            .catch(() => toast.error("Lỗi khi tải danh sách ghế"))
            .finally(() => setLoading(false));
    }, [roomId, open]);

    const handleUpdateSeat = (seatId: number, data: Partial<Seat>) => {
        updateSeatAPI(seatId, data)
            .then((updated) => {
                setSeats((prev) =>
                    prev.map((seat) => (seat.id === seatId ? { ...seat, ...updated } : seat))
                );
                toast.success("Cập nhật ghế thành công");
            })
            .catch(() => toast.error("Lỗi khi cập nhật ghế"));
    };

    // Group theo row
    const groupedByRow: Record<string, Seat[]> = seats.reduce((acc, seat) => {
        if (!acc[seat.seat_row]) acc[seat.seat_row] = [];
        acc[seat.seat_row].push(seat);
        return acc;
    }, {} as Record<string, Seat[]>);

    // Sắp xếp từng row theo seat_col
    Object.values(groupedByRow).forEach((rowSeats) =>
        rowSeats.sort((a, b) => a.seat_col - b.seat_col)
    );

    const onSubmit = (data: RoomSeatFormValues) => {
        // Xử lý submit form, ví dụ cập nhật ghế
        console.log("Submitted data:", data);
        // Có thể gọi API để cập nhật ghế ở đây
        // handleUpdateSeat(seatId, { username: data.username });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Quản lý ghế - Phòng #{roomId}</DialogTitle>
                </DialogHeader>

                {loading ? (
                    <p>Đang tải ghế...</p>
                ) : (

                    <div className="space-y-6">
                        {/* Sơ đồ ghế */}
                        <div className="flex justify-center">
                            <div className="space-y-2">
                                {Object.entries(groupedByRow).map(([row, rowSeats]) => (
                                    <div key={row} className="flex gap-2">
                                        {rowSeats.map((seat) => (
                                            <Button
                                                key={seat.id}
                                                className="w-24"
                                            >
                                                <span className="font-medium text-center">
                                                    {seat.seat_row}
                                                    {seat.seat_col}
                                                </span>
                                            </Button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Thông tin ghế */}
                        <div className="mt-6 space-y-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="seat_type_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Loại ghế</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={''}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn loại ghế" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {mockSeatTypes.map((type) => (
                                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                                {type.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Cập nhật</Button>
                                </form>
                            </Form>
                        </div>
                    </div>

                )}
            </DialogContent>
        </Dialog>
    );
};

export default RoomSeatsDialog;
