import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, EllipsisVertical, Film, MapPin, PenLine, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cinema } from "@/data/type";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link } from "react-router-dom";

interface CinemaCardProps {
  cinema: Cinema;
  onEdit?: (cinema: Cinema) => void;
  onDelete?: (cinema: Cinema) => void;
}

const CinemaCard = ({ cinema, onEdit, onDelete }: CinemaCardProps) => {
  const fullAddress = [cinema.street, cinema.ward, cinema.district, cinema.city]
    .filter(Boolean) // Bỏ các phần undefined hoặc chuỗi rỗng
    .join(", ");

  return (
    <Card className="overflow-hidden border-none bg-card shadow-lg">
      <CardContent className="p-5">
        <div>
          <div className="flex justify-between items-start mb-3">

            <h3 className="text-lg font-semibold">{cinema.name}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Film className="size-3.5 mr-1" /> Quản lý phòng
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PenLine className="size-3.5 mr-1" />
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="size-3.5 mr-1" />
                  Xóa rạp
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-start gap-2 text-cinema-muted mb-3 text-sm">
            <MapPin size={16} className="mt-1" />
            <div className="line-clamp-1">{fullAddress}</div>
          </div>
        </div>
        {/* Thông tin chính */}
        <div className="flex flex-col gap-2 border-y pt-3 my-3">
          {/* Giờ mở cửa */}
          <div className="flex items-center justify-between gap-2 text-sm text-cinema-muted mb-3">
            <span>Giờ mở cửa: </span>
            {/* {cinema.opening_time} - {cinema.closing_time} */}
            <span className="font-semibold flex items-center">
              <Clock className="size-3.5 inline mr-1" />
              08:00 - 22:00</span>
          </div>

          {/* Số lượng phòng chiếu */}
          <div className="flex items-center justify-between gap-2 text-sm text-cinema-muted mb-3">
            <span>Số phòng chiếu: </span>
            <Badge variant="secondary" className="text-sm">
              {cinema.number_of_rooms}
            </Badge>
          </div>

          {/* Tổng sức chứa */}
          <div className="flex items-center justify-between gap-2 text-sm text-cinema-muted mb-3">
            <span>Tổng sức chứa: </span>
            <Badge variant="secondary" className="text-sm">
              {cinema.number_of_rooms}
            </Badge>
          </div>

          {/* Loại phòng */}
          <div className="flex items-center justify-between gap-2 text-sm text-cinema-muted mb-3">
            <div>Loại phòng: </div>
            <div className="">
              {
                ["2D", "3D", "IMAX"].map((type, index) => (
                  <Badge key={index} variant="outline" className="text-xs mr-1">
                    {type}
                  </Badge>
                ))
              }
            </div>
          </div>
        </div>

        <Button asChild className="w-full" size="sm">
          <Link to={`/admin/cinemas/${cinema.id}/rooms`}>
            Quản lý phòng chiếu
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CinemaCard;
