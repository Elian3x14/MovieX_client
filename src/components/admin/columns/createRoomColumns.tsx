import { ColumnDef } from "@tanstack/react-table";
import { Room } from "@/data/type";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RoomTableCallbacks {
  onViewDetail?: (room: Room) => void;
  onDelete?: (room: Room) => void;
  onManageSeats?: (room: Room) => void;
}

export const createRoomColumns = ({
  onViewDetail,
  onDelete,
  onManageSeats,
}: RoomTableCallbacks): ColumnDef<Room>[] => [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Tên phòng",
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: "cinema",
      header: "Thuộc rạp",
      cell: ({ row }) => row.original.cinema?.name || "Chưa gán",
    },
    {
      accessorKey: "no_row",
      header: "Số hàng",
      cell: ({ row }) => `${row.original.no_row} hàng`,
    },
    {
      accessorKey: "no_column",
      header: "Số cột",
      cell: ({ row }) => `${row.original.no_column} cột`,
    },
    {
      id: "total_seats",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-transparent"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Tổng ghế
          {column.getIsSorted() ? (
            column.getIsSorted() === "asc" ? <ArrowUp /> : <ArrowDown />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      ),
      cell: ({ row }) =>
        `${row.original.no_row * row.original.no_column} ghế`,
    },
    {
      id: "actions",
      header: () => <div className="text-right">Hành động</div>,
      cell: ({ row }) => {
        const room = row.original;
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
              <DropdownMenuItem onClick={() => onViewDetail?.(room)}>
                Xem chi tiết
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() =>  onManageSeats?.(room)}>
                Quản lý ghế
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete?.(room)}>
                Xóa phòng
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
