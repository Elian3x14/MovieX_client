import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TrailerModal from "@/components/TrailerModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, Clock, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { fetchMovieById } from "@/features/movie/movieSlice";
import {
  fetchShowtimes,
  selectShowtimeLoading,
  selectShowtimesByMovieId,
} from "@/features/showtime/showtimeSlice";
import ReviewSection from "@/components/MovieDetail/ReviewSection";
import ShowtimeSection from "@/components/MovieDetail/ShowtimeSection";

interface ShowTimesByDate {
  [key: string]: {
    cinema: string;
    times: {
      id: string;
      time: string;
      hall: string;
      price: number;
    }[];
  }[];
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const movie = useSelector((state: RootState) =>
    id ? state.movie.movies[id] : undefined
  );
  const loading = useSelector((state: RootState) => state.movie.loading);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const showtimes = useSelector((state: RootState) =>
    selectShowtimesByMovieId(state, id!)
  );

  const showtimeLoading = useSelector(selectShowtimeLoading);

  useEffect(() => {
    if (id && showtimes.length === 0) {
      dispatch(fetchShowtimes(id));
    }
  }, [id, dispatch]);
  const { toast } = useToast();

  useEffect(() => {
    if (id && !movie) {
      dispatch(fetchMovieById(id));
    }
  }, [id, movie, dispatch]);

  const uniqueDates = [
    ...new Set(
      showtimes.map((item) =>
        new Date(item.start_time).toISOString().slice(0, 10)
      ) // YYYY-MM-DD
    ),
  ].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const showtimesByDate: ShowTimesByDate = {};

  showtimes.forEach((showtime) => {
    const date = new Date(showtime.start_time).toISOString().slice(0, 10);

    if (!showtimesByDate[date]) {
      showtimesByDate[date] = [];
    }

    const existingCinema = showtimesByDate[date].find(
      (group) => group.cinema === showtime.room.cinema.name
    );

    const showtimeInfo = {
      id: showtime.id,
      time: new Date(showtime.start_time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      hall: showtime.room.name,
      price: showtime.price,
    };

    if (existingCinema) {
      existingCinema.times.push(showtimeInfo);
    } else {
      showtimesByDate[date].push({
        cinema: showtime.room.cinema.name,
        times: [showtimeInfo],
      });
    }
  });

  const handleOpenTrailer = () => {
    if (movie.trailer_url) {
      setIsTrailerOpen(true);
    } else {
      toast({
        title: "Trailer không khả dụng",
        description: "Trailer cho bộ phim này hiện không có sẵn.",
        variant: "destructive", // kiểu hiển thị cảnh báo (màu đỏ, thường để báo lỗi)
      });
    }
  };

  if (!movie) {
    return <div className="container py-12 text-center">Phim không tồn tại.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <main className="flex-1">
        {/* Trailer Modal */}
        {movie.trailer_url && (
          <TrailerModal
            isOpen={isTrailerOpen}
            onClose={() => setIsTrailerOpen(false)}
            title={movie.title}
            trailerUrl={movie.trailer_url}
          />
        )}

        {/* Hero Banner */}
        <div
          className="h-[50vh] md:h-[60vh] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${movie.backdrop_url})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-background via-cinema-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-background to-transparent" />
          <div className="container h-full flex items-end pb-12 relative z-10">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="hidden md:block w-64 h-96 overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    variant="outline"
                    className="bg-cinema-primary border-none"
                  >
                    {movie.release_status === "now-showing" ?
                      "Đang chiếu" :
                      "Sắp chiếu"}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star
                      className="fill-cinema-secondary text-cinema-secondary"
                      size={18}
                    />
                    <span className="font-medium">{movie.rating}/10</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-cinema-muted">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{movie.duration} phút</span>
                  </div>
                  <div>{movie.year}</div>
                  <div>{movie.genres.map((item) => item.name + ",")}</div>
                </div>

                <p className="text-cinema-muted mb-6 leading-relaxed">
                  {movie.description}
                </p>

                <div className="flex gap-4 mt-auto">
                  {movie.release_status === "now-showing" ? (
                    <Button size="lg" className="min-w-[150px]">
                      <Link to={`/booking/${movie.id}`}>
                        Mua vé
                      </Link>
                    </Button>
                  ) : (
                    <Button size="lg" variant="outline">
                      <Link to={`/booking/${movie.id}`}>
                        Đặt vé trước
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                    onClick={handleOpenTrailer}
                  >
                    <Play size={16} className="fill-current" />
                    Xem Trailer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Poster (visible only on mobile) */}
        <div className="md:hidden container -mt-20 mb-6">
          <div className="w-32 h-48 overflow-hidden rounded-lg shadow-2xl mx-auto">
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Movie Details */}
        <section className="py-8 container">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full flex justify-start mb-6 bg-muted">
              <TabsTrigger value="about">Giới thiệu</TabsTrigger>
              <TabsTrigger
                value="showtimes"
                disabled={movie.release_status !== "now-showing"}
              >
                Lịch chiếu
              </TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Tóm tắt nội dung</h2>
                  <p className="text-cinema-muted mb-6 leading-relaxed">
                    {movie.description}
                  </p>

                  <h2 className="text-xl font-semibold mb-4">Diễn viên & Đoàn làm phim</h2>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Đạo diễn</h3>
                    <p className="text-cinema-muted">{movie.director}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Diễn viên</h3>
                    <p className="text-cinema-muted">
                      {movie.actors.map((item) => item.name + ",")}
                    </p>
                  </div>
                </div>
                <div>
                  <Card className="bg-card border-none overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Thông tin phim</h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-cinema-muted">Thể loại:</dt>
                          <dd>{movie.genres.map((item) => item.name + ",")}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-cinema-muted">Năm phát hành:</dt>
                          <dd>{movie.year}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-cinema-muted">Thời lượng:</dt>
                          <dd>{movie.duration} phút</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-cinema-muted">Đánh giá:</dt>
                          <dd className="flex items-center gap-1">
                            <Star
                              className="fill-cinema-secondary text-cinema-secondary"
                              size={16}
                            />
                            {movie.rating}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>


            <TabsContent value="showtimes">
              <ShowtimeSection
                selectedDate={selectedDate}
                setSelectedDate={(date) => setSelectedDate(date)}
                uniqueDates={uniqueDates}
                showtimesByDate={showtimesByDate}
              />
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewSection />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default MovieDetail;
