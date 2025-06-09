// Import các thành phần cần thiết từ thư viện Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Import các thành phần UI khác
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Movie } from "@/data/type";
import { Link } from "react-router-dom";
import TrailerModal from "./TrailerModal";
import { IoStar } from "react-icons/io5";
import { useState } from "react";

// Định nghĩa kiểu dữ liệu cho props
interface HeroSliderProps {
  movies: Movie[];
}

// Thành phần HeroSlider
const HeroSlider = ({ movies }: HeroSliderProps) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false); // Trạng thái hiển thị trailer
  const [activeIndex, setActiveIndex] = useState(0);         // Slide hiện tại
  const [swiperInstance, setSwiperInstance] = useState<any>(null); // Lưu thể hiện của Swiper

  return (
    <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
      {/* Hiển thị modal trailer nếu có trailer_url */}
      {movies[activeIndex]?.trailer_url && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => {
            setIsTrailerOpen(false);
            swiperInstance?.autoplay?.start(); // Bật lại autoplay khi đóng modal
          }}
          title={movies[activeIndex].title}
          trailerUrl={movies[activeIndex].trailer_url}
        />
      )}

      {/* Nếu không có phim */}
      {!movies ||
        (movies.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
            <p className="text-white text-lg">Không có phim nào</p>
          </div>
        ))}

      {/* Nếu có danh sách phim */}
      {movies && movies.length > 0 && (
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          autoplay={{ delay: 4000 }}
          effect="fade"
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          loop
          className="h-full"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative h-full">
                {/* Hiệu ứng nền dạng gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-background via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-cinema-background to-transparent opacity-70 z-10" />

                {/* Hình nền phim */}
                <img
                  src={movie.backdrop_url}
                  alt={movie.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* Nội dung phần hiển thị */}
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
                          {movie.duration} phút
                        </span>
                      </div>
                      <p className="text-cinema-muted mb-6 line-clamp-3">
                        {movie.description}
                      </p>
                      <div className="flex gap-4">
                        <Link to={`/movie/${movie.id}`}>
                          <Button size="lg">Đặt vé</Button>
                        </Link>
                        <Button
                          size="lg"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => {
                            setIsTrailerOpen(true);
                            swiperInstance?.autoplay?.stop(); // Dừng autoplay khi xem trailer
                          }}
                        >
                          <Play size={16} className="fill-current" />
                          Xem Trailer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HeroSlider;
