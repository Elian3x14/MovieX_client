import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Plus } from "lucide-react";

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

const AdminCinemaRoomSeatsPage = () => {
    const { cinemaId, roomId } = useParams<{ cinemaId: string, roomId: string }>();
    const dispatch = useAppDispatch();
    const { cinemas } = useAppSelector((state: RootState) => state.cinema);
    const { rooms } = useAppSelector((state: RootState) => state.room);
    const { seatTypes, loading: seatTypeLoading } = useAppSelector((state: RootState) => state.seatType);
    const { roomSeats } = useAppSelector((state: RootState) => state.roomSeat);

    const seatsInRoom = useMemo(() => {
        return Object.values(roomSeats[roomId!] || {});
    }, [roomSeats, roomId]);

    useEffect(() => {
        if (!seatTypeLoading && seatTypes.length === 0) {
            dispatch(fetchAllSeatTypes());
        }
    }, [dispatch, seatTypeLoading, seatTypes]);

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
                <h3 className="text-xl font-semibold">Sơ đồ ghế</h3>
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
                                            className={cn(
                                                "aspect-square size-8 flex items-center justify-center border rounded cursor-pointer text-xs font-semibold",
                                                seat.is_maintenance ? "opacity-0" : "opacity-100",
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

                        <div className="col-span-12 text-center text-sm text-muted-foreground mt-12 border-t pt-2">
                            <div className="flex justify-center gap-6 mt-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-green-200 border rounded" /> Bình thường
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-red-400 border rounded" /> Bảo trì
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Card >

            <div className="">
                <Card className="p-4">
                    <h3 className="text-xl font-semibold">Thống Kê Ghế</h3>

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
            </div>


        </div >


    </>
    );
};

export default AdminCinemaRoomSeatsPage;
