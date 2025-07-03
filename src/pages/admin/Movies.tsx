
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";


import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { deleteMovie, fetchMovies } from "@/features/movie/movieSlice";
import MovieDialog from "@/components/admin/MovieDialog";
import { Movie } from "@/data/type";
import { DataTable } from "@/components/admin/DataTable";
import { createMovieColumns } from "@/components/admin/columns/createMovieColumns";
import { ConfirmDeleteDialog } from "@/components/dialogs/ConfirmDeleteDialog";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const AdminMovies = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movie);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    dispatch(fetchMovies()); // Gọi API để lấy danh sách phim
  }, [dispatch]);


  const filteredMovies = Object.values(movies).filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddMovieDialog = () => {
    setSelectedMovie(null);
    setIsOpen(true);
  };

  const onViewDetail = (movie: Movie) => {
    navigate(`/admin/movies/${movie.id}/edit`);
  }

  const openDeleteMovieDialog = (movie: Movie) => {
    setSelectedMovie(movie);
    setOpenDeleteDialog(true);
  }

  const columns = createMovieColumns({
    onViewDetail: onViewDetail,
    onDelete: openDeleteMovieDialog,
  });

  const confirmDelete = () => {
    if (selectedMovie) {
      console.log(`Xóa phim: ${selectedMovie.title}`);
      // Gọi API để xóa phim
      dispatch(deleteMovie(selectedMovie.id)).unwrap()
        .then(() => { toast.success("Xóa phim thành công") })
        .catch((err) => {
          toast.error(err)
        });
    }
    setOpenDeleteDialog(false);
    setSelectedMovie(null);
  }


  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quản lý phim</h1>
          <Button asChild>
            <Link to="/admin/movies/create" className="flex items-center">
              <Plus className="mr-2 size-4" />
              Thêm phim mới
            </Link>
          </Button>
        </div>

        <DataTable data={filteredMovies} columns={columns} />
      </div>
      {/* Hidden components */}
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={confirmDelete}
        objectName={selectedMovie?.title}
      />
    </>

  );
};

export default AdminMovies;
