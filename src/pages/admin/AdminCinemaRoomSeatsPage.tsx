import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Pencil, PencilLine, Plus } from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { Card, CardHeader } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Badge } from "@/components/ui/badge";
import { RootState } from "@/app/store";
import { Cinema, Room, RoomSeat } from "@/data/type";
import { fetchRoomById, fetchRooms } from "@/features/room/roomSlice";
import { fetchCinemaById, fetchCinemas } from "@/features/cinema/cinemaSlice";
import SeatTypeLengend from "@/components/lengends/SeatTypeLengend";
import { fetchAllSeatTypes } from "@/features/seatType/seatTypeSlice";
import { fetchSeatsByRoom } from "@/features/roomSeat/roomSeatSlice";
import CinemaNotFoundCard from "@/components/admin/errors/not-found/CinemaNotFoundCard";
import RoomNotFoundCard from "@/components/admin/errors/not-found/RoomNotFoundCard";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";


enum ToolType {
    ChangeSeatType = "change-seat-type",
    ToggleMaintenance = "toggle-maintenance",
}

const AdminCinemaRoomSeatsPage = () => {
    const { cinemaId, roomId } = useParams<{ cinemaId: string, roomId: string }>();
    const dispatch = useAppDispatch();
    const { cinemas } = useAppSelector((state: RootState) => state.cinema);
    const { rooms } = useAppSelector((state: RootState) => state.room);
    const { seatTypes, loading: seatTypeLoading } = useAppSelector((state: RootState) => state.seatType);
    const { roomSeats } = useAppSelector((state: RootState) => state.roomSeat);
    // For edit mode
    const [editMode, setEditMode] = useState(false);
    const [toolType, setToolType] = useState<ToolType>(ToolType.ChangeSeatType);
    const [selectedSeatTypeId, setSelectedSeatTypeId] = useState<number | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<RoomSeat[]>([]); // Danh sách ghế đã thay đổi 'để gửi server'
    const [seatsInRoom, setSeatsInRoom] = useState<RoomSeat[]>([]);

    useEffect(() => {
        if (roomSeats[roomId!]) {
            setSeatsInRoom(Object.values(roomSeats[roomId!]));
        }
    }, [roomSeats, roomId]);

    useEffect(() => {
        if (!seatTypeLoading && seatTypes.length === 0) {
            dispatch(fetchAllSeatTypes());
        }
    }, [dispatch, seatTypeLoading, seatTypes]);

    useEffect(() => {
        setSelectedSeatTypeId(seatTypes[0]?.id || null);
    }, [seatTypes])

    useEffect(() => {
        if (!cinemas[cinemaId!]) dispatch(fetchCinemaById(Number(cinemaId!)));
        if (!rooms[roomId!]) dispatch(fetchRoomById(Number(roomId!)));
    }, [cinemaId, roomId, dispatch]);

    const cinema: Cinema = cinemas[cinemaId!];
    const room: Room = rooms[roomId!];

    useEffect(() => {
        // Nếu chưa có thông tin ghế của phòng này, gọi API để lấy
        if (!roomSeats[roomId!]) {
            dispatch(fetchSeatsByRoom(roomId));
        }
    }, [roomId, room, dispatch]);

    const groupedByRow = useMemo(() => {
        const result: Record<string, typeof seatsInRoom> = {};

        seatsInRoom.forEach((seat) => {
            if (!result[seat.seat_row]) result[seat.seat_row] = [];
            result[seat.seat_row].push(seat);
        });

        // Sắp xếp từng hàng theo seat_col tăng dần
        Object.keys(result).forEach((row) => {
            result[row].sort((a, b) => a.seat_col - b.seat_col);
        });

        return result;
    }, [seatsInRoom]);

    if (seatTypeLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg text-muted-foreground">Đang tải dữ liệu ghế...</div>
            </div>
        );
    }

    if (!cinema) {
        return <CinemaNotFoundCard />;
    }

    if (!room) {
        return <RoomNotFoundCard />;
    }

    const updateSeat = (seat: RoomSeat, updates: Partial<RoomSeat>) => {
        const updatedSeat = { ...seat, ...updates };

        // Cập nhật danh sách ghế đã chọn để gửi server
        setSelectedSeats((prev) => [...prev, updatedSeat]);

        // Cập nhật UI danh sách ghế
        setSeatsInRoom((prevSeats) =>
            prevSeats.map((s) => (s.id === seat.id ? updatedSeat : s))
        );
    };

    const onSeatClick = (seat: RoomSeat) => {
        if (!editMode) return;
        if (toolType === ToolType.ChangeSeatType) {
            updateSeat(seat, { seat_type: selectedSeatTypeId });

        } else if (toolType === ToolType.ToggleMaintenance) {
            updateSeat(seat, { is_maintenance: !seat.is_maintenance });

        }
    };

    function getLatestSeatUpdates(seats: RoomSeat[]): RoomSeat[] {
        const latestMap = new Map<number, RoomSeat>();

        for (const seat of seats) {
            // Ghi đè nếu gặp cùng id => giữ bản cuối cùng
            latestMap.set(seat.id, seat);
        }

        return Array.from(latestMap.values());
    }

    const onSaveClick = () => {
        if (selectedSeats.length === 0) {
            alert("Không có thay đổi nào để lưu.");
            return;
        }
        // Gọi API cập nhật ghế
        console.log("Saving changes for seats:", selectedSeats);
        const latestUpdates = getLatestSeatUpdates(selectedSeats);
        console.log("Latest updates to save:", latestUpdates);
        setEditMode(false);
    }

    return (<>
        <Card className="p-6">
            <h1 className="text-xl font-bold mb-4">
                {room.name} - {cinema.name}
            </h1>
            <div className="text-muted-foreground flex items-center gap-2">
                <Badge variant="secondary">
                    2D
                </Badge>
                <Badge variant="secondary">
                    {room.no_column * room.no_row} ghế
                </Badge>
                <Badge variant="secondary">
                    {room.no_row} x {room.no_column}
                </Badge>
            </div>
        </Card>


        <div className="grid grid-cols-5 gap-6 mt-4">
            {/*  */}
            <Card className="col-span-4 p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Sơ đồ ghế</h3>
                    {
                        !editMode ? (
                            <Button variant="secondary" size="sm" onClick={() => setEditMode(true)}>
                                <PencilLine className="size-3.5" />
                            </Button>
                        ) :
                            <Button variant="secondary" size="sm" onClick={onSaveClick}>
                                Lưu thay đổi
                            </Button>
                    }

                </div>
                <div className="flex flex-col gap-2 mt-2 px-20">
                    {/* Màn hình */}
                    <div className="flex flex-col gap-2 items-center ">
                        <div>Màn hình</div>
                        <div className="w-full h-2 bg-slate-500 rounded"></div>
                    </div>
                    {/* Ghế */}
                    <div className="">
                        {Object.entries(groupedByRow).map(([row, seats]) => (
                            <div key={row} className="flex items-center justify-center gap-2">
                                {/* Ký hiệu hàng */}
                                <div className="w-8 text-center font-bold">{row}</div>

                                {/* Danh sách ghế trong hàng đó */}
                                <div className="flex gap-2 mt-2">
                                    {seats.map((seat) => (
                                        <div
                                            key={seat.id}
                                            onClick={() => onSeatClick(seat)}
                                            className={cn(
                                                "aspect-square size-8 flex items-center justify-center border rounded cursor-pointer text-xs font-semibold relative",
                                                seat.is_maintenance ?
                                                    "before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-[2px] before:bg-red-500 before:rotate-45 opacity-50" :
                                                    "opacity-100",
                                            )}
                                            style={{
                                                backgroundColor: seatTypes.find((seatType) => seatType.id == seat.seat_type)?.color,
                                            }}
                                        >
                                            {seat.seat_row}{seat.seat_col}
                                        </div>
                                    ))}
                                </div>

                                {/* Ký hiệu hàng */}
                                <div className="w-8 text-center font-bold">{row}</div>
                            </div>
                        ))}

                        <div className="border-t mt-6 py-6 flex justify-center gap-2">
                            {
                                seatTypes.map((type) => (
                                    <span key={type.id} className="flex items-center gap-1">
                                        <SeatTypeLengend seatType={type} />
                                    </span>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </Card >

            <div >

                {
                    editMode ? (
                        <Card className="p-4 mb-4">
                            <h3 className="text-lg font-semibold">Công cụ chỉnh sửa</h3>
                            <div className="flex flex-col gap-2 mt-2">
                                <Select defaultValue={ToolType.ChangeSeatType} onValueChange={(value) => setToolType(value as ToolType)}    >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn công cụ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={ToolType.ChangeSeatType}>
                                                Thay đổi loại ghế
                                            </SelectItem>
                                            <SelectItem value={ToolType.ToggleMaintenance}>
                                                Chặn / Bỏ chặn ghế
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {
                                toolType === ToolType.ChangeSeatType && (
                                    <div className="mt-4">
                                        <Select
                                            defaultValue={selectedSeatTypeId?.toString() || ""}
                                            onValueChange={(value) => {
                                                const typeId = parseInt(value);
                                                setSelectedSeatTypeId(typeId);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn loại ghế" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {seatTypes.map((type) => (
                                                    <SelectItem key={type.id} value={type.id.toString()}>
                                                        <SeatTypeLengend seatType={type} />
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <h4 className="text-sm font-semibold mt-3">Hướng dẫn:</h4>
                                        <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-muted-foreground">
                                            <li >
                                                Chọn loại ghế từ danh sách bên trên.
                                            </li>
                                            <li >
                                                Nhấn vào từng ghế để thay đổi loại ghế.
                                            </li>
                                            <li >
                                                Nhấn nút "Lưu thay đổi" để lưu.
                                            </li>
                                        </ul>

                                    </div>
                                )
                            }
                            {
                                toolType === ToolType.ToggleMaintenance && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-semibold mt-3">Hướng dẫn:</h4>
                                        <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-muted-foreground">
                                            <li >
                                                Nhấn vào từng ghế để chuyển trạng thái bảo trì (chặn) hoặc bỏ chặn.
                                            </li>
                                            <li >
                                                Nhấn nút "Lưu thay đổi" để lưu.
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }


                        </Card>
                    ) :
                        <Card className="p-4">
                            <h3 className="text-lg font-semibold">Thống Kê Ghế</h3>

                            <div className="flex flex-col gap-2 mt-2">
                                <div className="text-muted-foreground flex items-center justify-between">
                                    <span>Tổng số ghế</span>
                                    <span>120</span>
                                </div>
                                <div className="text-muted-foreground flex items-center justify-between">
                                    <span>Khả dụng</span>
                                    <span className="text-green-500">120</span>
                                </div>
                                <div className="text-muted-foreground flex items-center justify-between">
                                    <span>Bảo trì</span>
                                    <span className="text-red-500">0</span>
                                </div>
                                <hr />
                                <div>
                                    <h3 className="font-medium mb-2">Phân bố theo loại ghế</h3>
                                    <div>
                                        {
                                            seatTypes.map((type, index) => (
                                                <div key={type.id} className="flex items-center justify-between" >
                                                    <SeatTypeLengend seatType={type} />
                                                    <span>
                                                        {/* TODO: thêm giá trị thật sau này */}
                                                        43
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </Card>
                }
            </div>


        </div >


    </>
    );
};

export default AdminCinemaRoomSeatsPage;
