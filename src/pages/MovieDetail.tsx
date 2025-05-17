import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewSection from "@/components/ReviewSection";
import TrailerModal from "@/components/TrailerModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Review, Movie, Showtime } from "@/data/type";
import { Star, Clock, Calendar, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";
import formatCurrency from "@/lib/formatCurrency";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { fetchMovieById } from "@/features/movie/movieSlice";
import {
  fetchShowtimes,
  selectShowtimeLoading,
  selectShowtimesByMovieId,
} from "@/features/showtime/showtimeSlice";
import formatDaysLeft from "@/lib/formatDaysLeft";

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
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
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


  const allReviews = [...(movie?.reviews || []), ...localReviews];

  // Handle adding a new review
  const handleAddReview = (review: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...review,
      id: `local-${Date.now()}`,
      date: new Date().toISOString(),
    };

    setLocalReviews((prev) => [...prev, newReview]);
  };

  const handleOpenTrailer = () => {
    if (movie.trailer_url) {
      setIsTrailerOpen(true);
    } else {
      toast({
        title: "Trailer Unavailable",
        description:
          "The trailer for this movie is not available at the moment.",
        variant: "destructive",
      });
    }
  };

  if (!movie) {
    return <div className="container py-12 text-center">Movie not found.</div>;
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
                    {movie.release_status === "now-showing"
                      ? "Now Showing"
                      : "Coming Soon"}
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
                    <span>{movie.duration} min</span>
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
                      Buy Tickets
                    </Button>
                  ) : (
                    <Button size="lg" variant="outline">
                      Coming Soon
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                    onClick={handleOpenTrailer}
                  >
                    <Play size={16} className="fill-current" />
                    Trailer
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
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger
                value="showtimes"
                disabled={movie.release_status !== "now-showing"}
              >
                Showtimes
              </TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
                  <p className="text-cinema-muted mb-6 leading-relaxed">
                    {movie.description}
                  </p>

                  <h2 className="text-xl font-semibold mb-4">Cast & Crew</h2>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Director</h3>
                    <p className="text-cinema-muted">{movie.director}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Cast</h3>
                    <p className="text-cinema-muted">
                      {movie.actors.map((item) => item.name + ",")}
                    </p>
                  </div>
                </div>
                <div>
                  <Card className="bg-card border-none overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Movie Info</h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-cinema-muted">Genre:</dt>
                          <dd>{movie.genres.map((item) => item.name + ",")}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-cinema-muted">Release Year:</dt>
                          <dd>{movie.year}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-cinema-muted">Duration:</dt>
                          <dd>{movie.duration} min</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-cinema-muted">Rating:</dt>
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
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
                <div className="flex overflow-x-auto gap-3 pb-2">
                  {uniqueDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`flex flex-col items-center min-w-[100px] p-3 rounded-lg border ${
                        selectedDate === date
                          ? "border-cinema-primary bg-cinema-primary/10"
                          : "border-muted bg-card"
                      }`}
                    >
                      <Calendar size={18} className="mb-1" />
                      <span className="font-medium text-sm">
                        {new Date(date).toLocaleDateString("vi-VN", {
                          weekday: "long",
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </span>
                      <span className="text-xs text-cinema-muted mt-1">
                        {formatDaysLeft(date)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && showtimesByDate[selectedDate] ? (
                <div className="space-y-6 mt-6">
                  {showtimesByDate[selectedDate].map((group, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg mb-2">
                        {group.cinema}
                      </h3>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {group.times.map((show) => (
                          <div
                            key={show.id}
                            className="border rounded-lg px-4 py-2 text-sm shadow-sm hover:bg-muted cursor-pointer"
                          >
                            <div className="font-medium flex justify-between">
                              <span>{show.hall}</span>
                            </div>
                            <div className="text-cinema-muted">
                              Start at {show.time}
                            </div>

                            <div className="text-cinema-muted text-xs">
                              <span className="text-cinema-secondary">50</span>
                              <span> available seats left</span>
                            </div>

                            <div className="text-cinema-primary font-semibold ">
                              Only from {formatCurrency(show.price)}
                            </div>
                            <Button
                              asChild
                              variant="outline"
                              className="mt-2 w-full"
                              size="sm"
                            >
                              <Link to={`/booking/${movie.id}/${show.id}`}>
                                Book Now
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground mt-4">
                  {selectedDate
                    ? "Không có suất chiếu cho ngày này."
                    : "Vui lòng chọn ngày."}
                </p>
              )}
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewSection
                movieId={movie.id}
                reviews={allReviews}
                onAddReview={handleAddReview}
              />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default MovieDetail;
