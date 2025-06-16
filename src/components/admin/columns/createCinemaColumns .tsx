import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Cinema } from "@/data/type"; // hoặc nơi bạn đặt interface Cinema

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
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "halls",
    header: "Số phòng chiếu",
    cell: ({ row }) => `${row.original.halls} phòng`,
  },
  {
    accessorKey: "image",
    header: "Hình ảnh",
    enableSorting: false,
    cell: ({ row }) =>
      row.original.image ? (
        <img
          src={row.original.image}
          alt={row.original.name}
          className="h-10 w-16 object-cover rounded"
        />
      ) : (
        <span className="text-muted-foreground italic">Chưa có</span>
      ),
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
