import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Plus } from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { Card, CardHeader } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Badge } from "@/components/ui/badge";
import { RootState } from "@/app/store";
import { Cinema, Room } from "@/data/type";
import { fetchRoomById, fetchRooms } from "@/features/room/roomSlice";
import { fetchCinemaById, fetchCinemas } from "@/features/cinema/cinemaSlice";
import SeatTypeLengend from "@/components/lengends/SeatTypeLengend";
import { fetchAllSeatTypes } from "@/features/seatType/seatTypeSlice";

const AdminCinemaRoomSeatsPage = () => {
    const { cinemaId, roomId } = useParams<{ cinemaId: string, roomId: string }>();
    const dispatch = useAppDispatch();
    const { cinemas } = useAppSelector((state: RootState) => state.cinema);
    const { rooms } = useAppSelector((state: RootState) => state.room);
    const { seatTypes, loading: seatTypeLoading } = useAppSelector((state: RootState) => state.seatType);

    let cinema: Cinema = cinemas[cinemaId!];
    let room: Room = rooms[roomId!];
    useEffect(() => {
        if (!cinema) {
            dispatch(fetchCinemaById(Number(cinemaId!)));
        }

        if (!room) {
            dispatch(fetchRoomById(Number(roomId!)));
        }
        room = rooms[roomId!];
        cinema = cinemas[cinemaId!];
    }, [roomId, cinemaId, dispatch]);

    useEffect(() => {
        if (!seatTypeLoading && seatTypes.length === 0) {
            dispatch(fetchAllSeatTypes());
        }
    }, [dispatch]);

    if (!room) {
        return (
            <Card className="p-6">
                <h1 className="text-2xl font-bold mb-4">Phòng chiếu không tồn tại</h1>
                <p className="text-muted-foreground mb-6">
                    Không tìm thấy thông tin phòng chiếu cho rạp này.
                </p>
            </Card>
        );
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
                    120 ghế
                </Badge>
                <Badge variant="secondary">
                    10 x 12
                </Badge>
            </div>

        </Card>

        <div className="flex items-center justify-between my-6">
            <h2 className="text-xl font-semibold mb-4">Danh sách phòng chiếu</h2>
            <Button size="sm">
                <Plus className="mr-1 size-4" />
                Thêm phòng chiếu
            </Button>
        </div>

        <div className="grid grid-cols-5 gap-6">
            {/* Ví dụ phòng chiếu */}
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
                        {/* Hàng */}
                        {
                            ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((row, rowIndex) => (
                                <div key={rowIndex} className="flex items-center justify-center gap-2">
                                    {/* Hiển thị chữ hàng ghế */}
                                    <div className="w-8 text-center font-bold">{row}</div>
                                    {/* Ghế trong hàng */}
                                    <div className="flex gap-2 mt-2">
                                        {Array.from({ length: 12 }).map((_, index) => (
                                            <div
                                                key={index}
                                                className={`aspect-square size-8 flex items-center justify-center border rounded cursor-pointer`}
                                            >
                                                {index + 1}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-8 text-center font-bold">{row}</div>
                                </div>
                            ))
                        }

                        <div className="col-span-12 text-center text-sm text-muted-foreground mt-12 border-t pt-2">
                            {

                            }
                        </div>
                    </div>

                </div>

            </Card>
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
                                        <div className="flex items-center justify-between" >
                                            <SeatTypeLengend key={index} seatType={type} />
                                            <span>
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


        </div>


    </>
    );
};

export default AdminCinemaRoomSeatsPage;
