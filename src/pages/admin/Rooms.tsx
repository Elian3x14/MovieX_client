import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { deleteRoom, fetchRooms } from "@/features/room/roomSlice";
import { Room } from "@/data/type";
import RoomDialog from "@/components/dialogs/RoomDialog";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDeleteDialog } from "@/components/dialogs/ConfirmDeleteDialog";
import { createRoomColumns } from "@/components/admin/columns/createRoomColumns";
import { toast } from "sonner";
import { fetchCinemas } from "@/features/cinema/cinemaSlice";
import RoomSeatsDialog from "@/components/dialogs/RoomSeatsDialog";
import { useNavigate } from "react-router-dom";

const AdminRooms = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { rooms, loading, error } = useAppSelector((state) => state.room);
    const { cinemas } = useAppSelector((state) => state.cinema);

    const [isOpen, setIsOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    useEffect(() => {
        if (cinemas && Object.keys(cinemas).length === 0) {
            dispatch(fetchCinemas())
        }
        if (rooms && Object.keys(rooms).length === 0) {
            dispatch(fetchRooms());
        }
    }, [dispatch, rooms]);



    const filteredRooms = Object.values(rooms).map(room => ({
        ...room, cinema: cinemas[room.cinema_id]
    }));

    const openAddRoomDialog = () => {
        setSelectedRoom(null);
        setIsOpen(true);
    };

    const openEditRoomDialog = (room: Room) => {
        setSelectedRoom(room);
        setIsOpen(true);
    };

    const openDeleteRoomDialog = (room: Room) => {
        setSelectedRoom(room);
        setOpenDeleteDialog(true);
    };


    const confirmDelete = () => {
        if (selectedRoom) {
            dispatch(deleteRoom(selectedRoom.id)).unwrap()
                .then(() => {
                    toast.success(`Đã xóa phòng chiếu: ${selectedRoom.name}`);
                })
                .catch((error) => {
                    toast.error(`Lỗi khi xóa phòng chiếu: ${error.message}`);
                });
        }
        setOpenDeleteDialog(false);
        setSelectedRoom(null);
    };

    const columns = createRoomColumns({
        onViewDetail: openEditRoomDialog,
        onDelete: openDeleteRoomDialog,
        onManageSeats: (room: Room) => {
            navigate(`/admin/rooms/${room.id}/seats`);
        },
    });

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Quản lý phòng chiếu</h1>
                    <Button onClick={openAddRoomDialog}>
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm phòng mới
                    </Button>
                </div>

                <DataTable data={filteredRooms} columns={columns} />
            </div>

            <RoomDialog open={isOpen} setOpen={setIsOpen} room={selectedRoom} />

            <ConfirmDeleteDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={confirmDelete}
                objectName={selectedRoom?.name}
            />
        </>
    );
};

export default AdminRooms;
