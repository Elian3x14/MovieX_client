import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Plus } from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/app/hooks";
import { Badge } from "@/components/ui/badge";

const AdminCinemaRoomsPage = () => {
    const { id } = useParams<{ id?: string }>();
    const { cinemas } = useAppSelector((state) => state.cinema);
    const cinema = cinemas[id!];

    if (!cinema) {
        return (
            <Card className="p-6">
                <h1 className="text-2xl font-bold mb-4">Rạp chiếu không tồn tại</h1>
                <p className="text-muted-foreground mb-6">
                    Không tìm thấy thông tin rạp chiếu này.
                </p>
            </Card>
        );
    }

    const fullAddress: string = [cinema.street, cinema.ward, cinema.district, cinema.city]
        .filter(Boolean) // Bỏ các phần undefined hoặc chuỗi rỗng
        .join(", ");

    return (<>
        <Card className="p-6">
            <h1 className="text-xl font-bold mb-4">
                {cinema.name}
            </h1>
            <div className="flex flex-col gap-4">
                <div className="text-muted-foreground flex items-center gap-2">
                    <MapPin />
                    {fullAddress}
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                    <Clock />
                    8:00 - 22:00
                </div>
            </div>
        </Card>

        <div className="flex items-center justify-between my-6">
            <h2 className="text-xl font-semibold mb-4">Danh sách phòng chiếu</h2>
            <Button size="sm">
                <Plus className="mr-1 size-4" />
                Thêm phòng chiếu
            </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Ví dụ phòng chiếu */}
            <Card className="p-4">
                <div className="">
                    <h3 className="text-xl font-semibold">Phòng 1</h3>
                </div>
                <Badge className="mt-2" variant="secondary">
                    Phòng chiếu 2D
                </Badge>
                <div className="flex flex-col gap-2 mt-2">
                    <div className="text-muted-foreground flex items-center justify-between">
                        <span>Sức chứa</span>
                        <span>120 ghế</span>
                    </div>
                    <div className="text-muted-foreground flex items-center justify-between">
                        <span>Layout</span>
                        <span>10 x 12</span>
                    </div>
                    <div className="text-muted-foreground">
                        <div>Loại ghế</div>
                        <div>
                            {
                                ["Ghế thường", "Ghế VIP", "Ghế đôi"].map((type, index) => (
                                    <Badge key={index}
                                        variant="outline"
                                        className="inline-block mr-1">
                                        {type}

                                    </Badge>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <Button asChild size="sm" className="w-full mt-4">
                    <Link to={`/admin/cinemas/${cinema.id}/rooms/${1}/seats`}>
                        Quản lý ghế ngồi
                    </Link>
                </Button>
            </Card>

        </div>


    </>
    );
};

export default AdminCinemaRoomsPage;
