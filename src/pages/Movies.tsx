
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { movies } from "@/data/movies";

const Movies = () => {
  const [filter, setFilter] = useState<"all" | "now-showing" | "upcoming">("all");
  const [genreFilter, setGenreFilter] = useState<string>("all");

  // Get all unique genres
  const allGenres = Array.from(new Set(movies.flatMap((movie) => movie.genre)));

  // Filter movies based on criteria
  const filteredMovies = movies.filter((movie) => {
    // Filter by release status
    const statusFilter =
      filter === "all" ||
      (filter === "now-showing" && movie.releaseStatus === "now-showing") ||
      (filter === "upcoming" && movie.releaseStatus === "upcoming");

    // Filter by genre
    const genre =
      genreFilter === "all" || movie.genre.includes(genreFilter);

    return statusFilter && genre;
  });

  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <Header />

      <main className="flex-1">
        <div className="bg-black/50 py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Movies</h1>
            <p className="text-cinema-muted max-w-2xl">
              Browse our selection of the latest movies now showing and coming soon to our theaters.
              Book tickets online for the best viewing experience.
            </p>
          </div>
        </div>

        <section className="py-8 container">
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center mb-8">
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
                variant={filter === "upcoming" ? "default" : "outline"}
                onClick={() => setFilter("upcoming")}
              >
                Coming Soon
              </Button>
            </div>

            <div className="w-full sm:w-auto">
              <Select value={genreFilter} onValueChange={setGenreFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-card">
                  <SelectValue placeholder="Filter by Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {allGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
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
                Try changing your filter selections to see more results.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Movies;
