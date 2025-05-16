
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock } from "lucide-react";
import { Movie } from "@/data/type";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card className="cinema-card overflow-hidden flex flex-col h-full bg-card border-none shadow-lg">
      <div className="aspect-[2/3] relative overflow-hidden group">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
          <div className="p-4 text-white">
            <Badge variant="outline" className="bg-cinema-primary border-none mb-2">
              {movie.release_status === "now-showing" ? "Now Showing" : "Coming Soon"}
            </Badge>
            <div className="flex items-center gap-2 mt-2">
              <Star className="fill-cinema-secondary text-cinema-secondary" size={16} />
              <span>{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
        <div className="flex items-center gap-1 mt-1 text-cinema-muted text-sm">
          <Clock size={14} />
          <span>{movie.duration} min</span>
          <span className="mx-1">•</span>
          <span>{movie.year}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre, index) => (
            <Badge key={index} variant="outline" className="bg-muted text-xs">
              {genre.name}
            </Badge>
          ))}
          {movie.genres.length > 2 && (
            <Badge variant="outline" className="bg-muted text-xs">
              +{movie.genres.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/movie/${movie.id}`} className="w-full">
          <Button className="w-full" variant={movie.release_status === "now-showing" ? "default" : "secondary"}>
            {movie.release_status === "now-showing" ? "Book Now" : "Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
