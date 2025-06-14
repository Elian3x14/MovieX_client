// columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Movie } from "@/data/type";
import { formatDate } from "@/lib/formatDate";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Movie>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "title",
        header: "Tiêu đề",
        cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
    },
    {
        accessorKey: "director",
        header: "Đạo diễn",
        cell: ({ row }) => row.original.director || "Chưa cập nhật",
    },
    {
        accessorKey: "duration",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="bg-transparent hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Thời lượng
                    {column.getIsSorted() ? (
                        column.getIsSorted() === "asc" ? (
                            <ArrowUp />
                        ) : (
                            <ArrowDown />
                        )
                    ) : (
                        <ArrowUpDown />
                    )}
                </Button>
            )
        },
        cell: ({ row }) => `${row.original.duration} min`,
    },
    {
        accessorKey: "release_date",
        header: "Ngày phát hành",
        enableSorting: true,
        cell: ({ row }) => formatDate(row.original.release_date),
    },
    {
        accessorKey: "release_status",
        header: "Trạng thái",
        cell: ({ row }) => (
            <Badge variant={row.original.release_status === "now-showing" ? "default" : "secondary"}
                className="capitalize"
            >
                {row.original.release_status === "now-showing" ? "Đang chiếu" : "Sắp chiếu"}
            </Badge>
        ),
    },
    {
        accessorKey: "genres",
        header: "Thể loại",
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex flex-wrap gap-1">
                {row.original.genres.map((g, i) => (
                    <Badge key={i} variant="outline">{g.name}</Badge>
                ))}
            </div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-right">Hành động</div>,
        cell: ({ row }) => {
            const movie = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                        <Button variant="ghost" className="size-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem
                        >
                            Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Xóa phim
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
