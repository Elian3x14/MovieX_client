import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Cinema } from "@/data/type";

interface CinemaTableCallbacks {
  onViewDetail?: (cinema: Cinema) => void;
  onDelete?: (cinema: Cinema) => void;
}

export const createCinemaColumns = ({
  onViewDetail,
  onDelete,
}: CinemaTableCallbacks): ColumnDef<Cinema>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Tên rạp",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    id: "full_address",
    header: "Địa chỉ",
    cell: ({ row }) => {
      const { street, ward, district, city } = row.original;
      return [street, ward, district, city].filter(Boolean).join(", ") || "Không có địa chỉ";
    },
  },
  {
    accessorKey: "number_of_rooms",
    header: "Số phòng chiếu",
    cell: ({ row }) => `${row.original.number_of_rooms} phòng`,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Hành động</div>,
    cell: ({ row }) => {
      const cinema = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onViewDetail?.(cinema)}>
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete?.(cinema)}>
              Xóa rạp
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
