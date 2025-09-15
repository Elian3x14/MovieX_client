"use client";

import { useEffect, useState } from "react";
import { Seat } from "@/data/type";
import { toast } from "sonner";
import { fetchSeatsByRoom, updateSeatAPI } from "@/features/seat/seatAPI";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    roomSeatSchema,
    RoomSeatFormValues,
    roomSeatSchemaDefaultValues,
} from "@/schemas/roomSeatSchema";
import { Link, useParams } from "react-router-dom";
import RoomSeatForm from "@/components/forms/RoomSeatForm";
import { ArrowLeft } from "lucide-react";

const mockSeatTypes = [
    { id: 1, name: "Thường" },
    { id: 2, name: "VIP" },
    { id: 3, name: "Couple" },
];

const RoomSeatsPage = () => {
    const { roomId } = useParams<{ roomId: string; }>();
    const [seats, setSeats] = useState<Seat[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null);

    const form = useForm<RoomSeatFormValues>({
        resolver: zodResolver(roomSeatSchema),
        defaultValues: roomSeatSchemaDefaultValues,
    });

    useEffect(() => {
        setLoading(true);
        fetchSeatsByRoom(Number(roomId))
            .then((data) => setSeats(data))
            .catch(() => toast.error("Lỗi khi tải danh sách ghế"))
            .finally(() => setLoading(false));
    }, [roomId]);

    const groupedByRow: Record<string, Seat[]> = seats.reduce((acc, seat) => {
        if (!acc[seat.seat_row]) acc[seat.seat_row] = [];
        acc[seat.seat_row].push(seat);
        return acc;
    }, {} as Record<string, Seat[]>);

    Object.values(groupedByRow).forEach((rowSeats) =>
        rowSeats.sort((a, b) => a.seat_col - b.seat_col)
    );

    const handleSelectSeat = (seat: Seat) => {
        setSelectedSeatId(seat.id);
        form.reset({
            seat_type_id: seat.seat_type_id,
            is_maintenance: seat.is_maintenance ?? false,
        });
    };

    const onSubmit = (data: RoomSeatFormValues) => {
        if (!selectedSeatId) return;
        updateSeatAPI(selectedSeatId, data)
            .then((updated) => {
                setSeats((prev) =>
                    prev.map((seat) =>
                        seat.id === selectedSeatId ? { ...seat, ...updated } : seat
                    )
                );
                toast.success("Cập nhật ghế thành công");
            })
            .catch(() => toast.error("Lỗi khi cập nhật ghế"));
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <h1 className="flex gap-2 items-center text-2xl font-bold">
                <Link to={`/admin/rooms`} className="text-blue-500 hover:underline">
                    <ArrowLeft />
                </Link>
                Quản lý ghế - Phòng #{roomId}</h1>
            {loading ? (
                <p>Đang tải danh sách ghế...</p>
            ) : (
                <>
                    <div className="flex gap-2">
                        <div className="space-y-2 grow border p-4 rounded-md shadow">
                            {Object.entries(groupedByRow).map(([row, rowSeats]) => (
                                <div key={row} className="flex gap-2">
                                    {rowSeats.map((seat) => (
                                        <Button
                                            key={seat.id}
                                            variant={
                                                seat.id === selectedSeatId ? "default" : "outline"
                                            }
                                            className="w-16"
                                            onClick={() => handleSelectSeat(seat)}
                                        >
                                            {seat.seat_row}
                                            {seat.seat_col}
                                        </Button>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="w-72">
                            {selectedSeatId ? (
                                <RoomSeatForm
                                    form={form}
                                    seatTypes={mockSeatTypes}
                                    onSubmit={onSubmit}
                                />
                            ) : (
                                <div className="border p-4 rounded-md h-full flex items-center justify-center">
                                    <p className="text-gray-500">Vui lòng chọn ghế để chỉnh sửa</p>
                                </div>
                            )}
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default RoomSeatsPage;
