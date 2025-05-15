import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Movie } from '@/data/movies';
import { Link } from 'react-router-dom';
import TrailerModal from './TrailerModal';
import { IoStar } from 'react-icons/io5';
import { useState } from 'react';

interface HeroSliderProps {
  movies: Movie[];
}

const HeroSlider = ({ movies }: HeroSliderProps) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
      {/* Trailer Modal */}
      {movies[activeIndex]?.trailer_url && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          title={movies[activeIndex].title}
          trailerUrl={movies[activeIndex].trailer_url}
        />
      )}

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 8000 }}
        effect="fade"
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop
        className="h-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-background via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-cinema-background to-transparent opacity-70 z-10" />

              {/* Background Image */}
              <img
                src={movie.backdrop_url}
                alt={movie.title}
                className="w-full h-full object-cover object-center"
              />

              {/* Content */}
              <div className="absolute inset-0 flex items-center z-20">
                <div className="container mx-auto px-4">
                  <div className="max-w-lg">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                      {movie.title}
                    </h1>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 bg-cinema-primary px-2 py-1 rounded text-sm text-cinema-text font-semibold">
                        <span>{movie.rating}</span>
                        <IoStar className="size-3.5" />
                      </div>
                      <span className="text-cinema-muted">
                        {movie.duration} min
                      </span>
                    </div>
                    <p className="text-cinema-muted mb-6 line-clamp-3">
                      {movie.description}
                    </p>
                    <div className="flex gap-4">
                      <Link to={`/movie/${movie.id}`}>
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
