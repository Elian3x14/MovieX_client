
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Movie } from "@/data/movies";
import { Link } from "react-router-dom";
import TrailerModal from "./TrailerModal";

interface HeroSliderProps {
  movies: Movie[];
}

const HeroSlider = ({ movies }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
      {/* Trailer Modal */}
      {currentMovie?.trailer_url && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          title={currentMovie.title}
          trailerUrl={currentMovie.trailer_url}
        />
      )}

      {/* Background Image */}
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-background via-transparent to-transparent opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-background to-transparent opacity-70" />
          <img
            src={movie.backdrop_url}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-lg">
            <h1
              className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {currentMovie?.title}
            </h1>
            <div 
              className="flex items-center gap-4 mb-4 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="bg-cinema-primary px-2 py-1 rounded text-sm">
                {/* {currentMovie?.rating.toFixed(1)} */}
              </span>
              <span className="text-cinema-muted">{currentMovie?.duration} min</span>
              {/* <span className="text-cinema-muted">{currentMovie?.genre.join(", ")}</span> */}
            </div>
            <p 
              className="text-cinema-muted mb-6 line-clamp-3 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {currentMovie?.description}
            </p>
            <div 
              className="flex gap-4 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <Link to={`/movie/${currentMovie?.id}`}>
                <Button size="lg">Book Tickets</Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setIsTrailerOpen(true)}
              >
                <Play size={16} className="fill-current" />
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-cinema-primary w-6" : "bg-gray-400"
            } transition-all duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
