
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Search, Edit, Trash, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { formatDate } from "@/lib/formatDate";
import { fetchMovies } from "@/features/movie/movieSlice";
import MovieDialog from "@/components/admin/MovieDialog";
import { Movie } from "@/data/type";

const AdminMovies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movie);

  const [selectedMovie, setSelectedMovie] = useState<Movie|null>(null);

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

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quản lý phim</h1>
          <Button onClick={openAddMovieDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm phim mới 
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search movies..."
            className="max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Director</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>{movie.id}</TableCell>
                  <TableCell className="font-medium">{movie.title}</TableCell>
                  <TableCell>{movie.director}</TableCell>
                  <TableCell>{movie.duration} min</TableCell>
                  <TableCell>{formatDate(movie.release_date)}</TableCell>
                  <TableCell>
                    <Badge variant={movie.release_status === "now-showing" ? "default" : "secondary"}>
                      {movie.release_status === "now-showing" ? "Đang chiếu" : "Sắp chiếu"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {movie.genres.map((g, i) => (
                        <Badge key={i} variant="outline">{g.name}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Hidden components */}
      <MovieDialog open={isOpen} setOpen={setIsOpen} />
    </>

  );
};

export default AdminMovies;
