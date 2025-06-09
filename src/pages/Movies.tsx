import React, { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchMovies } from "@/features/movie/movieSlice";

import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const Movies = () => {
  const [filter, setFilter] = useState<"all" | "now-showing" | "coming-soon">("all"); // Bộ lọc theo trạng thái chiếu
  const [genreFilter, setGenreFilter] = useState<string>("all"); // Bộ lọc theo thể loại
  const [searchQuery, setSearchQuery] = useState<string>(""); // Từ khóa tìm kiếm
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchMovies()); // Gọi API để lấy danh sách phim
  }, [dispatch]);

  // Lấy danh sách tất cả thể loại không trùng nhau
  const allGenres = Array.from(
    new Set(Object.values(movies).flatMap((movie) => movie.genres))
  );

  // Lọc phim theo các tiêu chí
  const filteredMovies = Object.values(movies).filter((movie) => {
    // Lọc theo trạng thái phát hành
    const statusFilter =
      filter === "all" ||
      (filter === "now-showing" && movie.release_status === "now-showing") ||
      (filter === "coming-soon" && movie.release_status === "coming-soon");

    // Lọc theo thể loại
    const genre =
      genreFilter === "all" ||
      movie.genres.map((g) => g.name).includes(genreFilter);

    // Lọc theo từ khóa tìm kiếm
    const search =
      searchQuery === "" ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase());

    return statusFilter && genre && search;
  });

  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <main className="flex-1">
        {/* Phần tiêu đề trang */}
        <div className="bg-black/50 py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Phim</h1>
            <p className="text-cinema-muted max-w-2xl">
              Khám phá bộ sưu tập các bộ phim mới nhất đang chiếu và sắp chiếu tại rạp. Đặt vé trực tuyến để có trải nghiệm xem phim tốt nhất.
            </p>
          </div>
        </div>

        {/* Phần lọc và tìm kiếm */}
        <section className="py-8 container">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:gap-4 md:items-center mb-8">
            {/* Ô tìm kiếm */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm phim..."
                className="pl-10 w-full bg-card"
              />
            </div>

            {/* Nút lọc theo trạng thái */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                Tất cả phim
              </Button>
              <Button
                variant={filter === "now-showing" ? "default" : "outline"}
                onClick={() => setFilter("now-showing")}
              >
                Đang chiếu
              </Button>
              <Button
                variant={filter === "coming-soon" ? "default" : "outline"}
                onClick={() => setFilter("coming-soon")}
              >
                Sắp chiếu
              </Button>
            </div>

            {/* Bộ lọc thể loại */}
            <div className="w-full md:w-auto">
              <Select value={genreFilter} onValueChange={setGenreFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-card">
                  <SelectValue placeholder="Lọc theo thể loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả thể loại</SelectItem>
                  {allGenres.map((genre) => (
                    <SelectItem key={genre.name} value={genre.name}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Danh sách phim */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Không tìm thấy phim</h3>
              <p className="text-cinema-muted">
                Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm kết quả.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Movies;
