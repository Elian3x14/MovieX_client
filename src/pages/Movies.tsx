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
  const [filter, setFilter] = useState<"all" | "now-showing" | "coming-soon">(
    "all"
  );
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Get all unique genres
  const allGenres = Array.from(
    new Set(Object.values(movies).flatMap((movie) => movie.genres))
  );

  // Filter movies based on criteria
  const filteredMovies = Object.values(movies).filter((movie) => {
    // Filter by release status
    const statusFilter =
      filter === "all" ||
      (filter === "now-showing" && movie.release_status === "now-showing") ||
      (filter === "coming-soon" && movie.release_status === "coming-soon");

    // Filter by genre
    const genre =
      genreFilter === "all" ||
      movie.genres.map((g) => g.name).includes(genreFilter);

    // Filter by search query
    const search =
      searchQuery === "" ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase());

    return statusFilter && genre && search;
  });

  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <main className="flex-1">
        <div className="bg-black/50 py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Movies</h1>
            <p className="text-cinema-muted max-w-2xl">
              Browse our selection of the latest movies now showing and coming
              soon to our theaters. Book tickets online for the best viewing
              experience.
            </p>
          </div>
        </div>

        <section className="py-8 container">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:gap-4 md:items-center mb-8">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="pl-10 w-full bg-card"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                All Movies
              </Button>
              <Button
                variant={filter === "now-showing" ? "default" : "outline"}
                onClick={() => setFilter("now-showing")}
              >
                Now Showing
              </Button>
              <Button
                variant={filter === "coming-soon" ? "default" : "outline"}
                onClick={() => setFilter("coming-soon")}
              >
                Coming Soon
              </Button>
            </div>

            <div className="w-full md:w-auto">
              <Select value={genreFilter} onValueChange={setGenreFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-card">
                  <SelectValue placeholder="Filter by Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {allGenres.map((genre) => (
                    <SelectItem key={genre.name} value={genre.name}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No movies found</h3>
              <p className="text-cinema-muted">
                Try changing your filter selections or search term to see more
                results.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Movies;
