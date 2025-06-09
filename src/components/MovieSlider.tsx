import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Movie } from "@/data/type";
import MovieCard from "./MovieCard";

interface MovieSliderProps {
  nowShowingMovies: Movie[];      // Danh sách phim đang chiếu
  upcomingMovies: Movie[];        // Danh sách phim sắp chiếu
}

const MovieSlider = ({ nowShowingMovies, upcomingMovies }: MovieSliderProps) => {
  return (
    <Tabs defaultValue="now-showing" className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Phim</h2>
        <TabsList className="bg-muted">
          <TabsTrigger value="now-showing">Đang chiếu</TabsTrigger>
          <TabsTrigger value="upcoming">Sắp chiếu</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="now-showing" className="mt-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {nowShowingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="upcoming" className="mt-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {upcomingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MovieSlider;
