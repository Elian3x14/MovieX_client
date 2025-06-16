import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchCinemas } from "@/features/cinema/cinemaSlice";
import { Cinema } from "@/data/type";
import CinemaDialog from "@/components/dialogs/CinemaDialog";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDeleteDialog } from "@/components/dialogs/ConfirmDeleteDialog";
import { createCinemaColumns } from "@/components/admin/columns/createCinemaColumns ";

const AdminCinemas = () => {
  const dispatch = useAppDispatch();
  const { cinemas, loading, error } = useAppSelector((state) => state.cinema);

  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);

  useEffect(() => {
    dispatch(fetchCinemas()); // Gọi API để lấy danh sách rạp
  }, [dispatch]);

  const filteredCinemas = Object.values(cinemas).map(cinema => cinema);

  const openAddCinemaDialog = () => {
    setSelectedCinema(null);
    setIsOpen(true);
  };

  const openEditCinemaDialog = (cinema: Cinema) => {
    setSelectedCinema(cinema);
    setIsOpen(true);
  };

  const openDeleteCinemaDialog = (cinema: Cinema) => {
    setSelectedCinema(cinema);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedCinema) {
      // dispatch(deleteCinema(selectedCinema.id));
      console.log(`Xóa rạp: ${selectedCinema.name}`);
    }
    setOpenDeleteDialog(false);
    setSelectedCinema(null);
  };

  const columns = createCinemaColumns({
    onViewDetail: openEditCinemaDialog,
    onDelete: openDeleteCinemaDialog,
  });

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quản lý rạp chiếu</h1>
          <Button onClick={openAddCinemaDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm rạp mới
          </Button>
        </div>

        <DataTable data={filteredCinemas} columns={columns} />
      </div>

      <CinemaDialog open={isOpen} setOpen={setIsOpen} cinema={selectedCinema} />

      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
        objectName={selectedCinema?.name}
      />
    </>
  );
};

export default AdminCinemas;
