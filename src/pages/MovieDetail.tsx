
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewSection from "@/components/ReviewSection";
import TrailerModal from "@/components/TrailerModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { movies, showtimes, Review } from "@/data/movies";
import { Star, Clock, Calendar, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const movie = movies.find((m) => m.id === id);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const { toast } = useToast();

  if (!movie) {
    return <div className="container py-12 text-center">Movie not found.</div>;
  }

  // Get showtime data for this movie
  const movieShowtimes = showtimes.filter((st) => st.movieId === movie.id);

  // Group showtimes by date
  const dates = Array.from(new Set(movieShowtimes.map((st) => st.date))).sort();

  // If no date is selected, select the first one
  const activeDate = selectedDate || dates[0];

  // Process showtimes by date and cinema
  const showtimesByDate: ShowTimesByDate = {};

  dates.forEach((date) => {
    showtimesByDate[date] = [];
    
    const cinemasForDate = Array.from(
      new Set(movieShowtimes.filter((st) => st.date === date).map((st) => st.cinema))
    );
    
    cinemasForDate.forEach((cinema) => {
      const timesForCinema = movieShowtimes
        .filter((st) => st.date === date && st.cinema === cinema)
        .map((st) => ({
          id: st.id,
          time: st.time,
          hall: st.hall,
          price: st.price,
        }));
      
      showtimesByDate[date].push({
        cinema,
        times: timesForCinema,
      });
    });
  });

  // Format the release date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Combine server reviews with local reviews
  const allReviews = [...(movie.reviews || []), ...localReviews];

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
        description: "The trailer for this movie is not available at the moment.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <Header />

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
                  <Badge variant="outline" className="bg-cinema-primary border-none">
                    {movie.releaseStatus === "now-showing" ? "Now Showing" : "Coming Soon"}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="fill-cinema-secondary text-cinema-secondary" size={18} />
                    <span className="font-medium">{movie.rating.toFixed(1)}/10</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-cinema-muted">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{movie.duration} min</span>
                  </div>
                  <div>{movie.year}</div>
                  <div>{movie.genres.join(", ")}</div>
                </div>
                <div className="flex gap-4 mt-6">
                  {movie.releaseStatus === "now-showing" ? (
                    <Button size="lg" className="min-w-[150px]">Buy Tickets</Button>
                  ) : (
                    <Button size="lg" variant="outline">Coming Soon</Button>
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
              <TabsTrigger value="showtimes" disabled={movie.releaseStatus !== "now-showing"}>
                Showtimes
              </TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
                  <p className="text-cinema-muted mb-6 leading-relaxed">{movie.description}</p>

                  <h2 className="text-xl font-semibold mb-4">Cast & Crew</h2>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Director</h3>
                    <p className="text-cinema-muted">{movie.director}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Cast</h3>
                    <p className="text-cinema-muted">{movie.actors.join(", ")}</p>
                  </div>
                </div>
                <div>
                  <Card className="bg-card border-none overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Movie Info</h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-cinema-muted">Genre:</dt>
                          <dd>{movie.genres.join(", ")}</dd>
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
                            <Star className="fill-cinema-secondary text-cinema-secondary" size={16} />
                            {movie.rating.toFixed(1)}
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
                  {dates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`flex flex-col items-center min-w-[100px] p-3 rounded-lg border ${
                        activeDate === date
                          ? "border-cinema-primary bg-cinema-primary/10"
                          : "border-muted bg-card"
                      }`}
                    >
                      <Calendar size={18} className="mb-1" />
                      <span className="font-medium">
                        {formatDate(date)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {activeDate &&
                  showtimesByDate[activeDate].map((cinemaData, index) => (
                    <Card key={index} className="bg-card border-none overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          {cinemaData.cinema}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {cinemaData.times.map((time) => (
                            <Link key={time.id} to={`/booking/${movie.id}/${time.id}`}>
                              <Button
                                variant="outline"
                                className="flex flex-col min-w-[110px] h-auto p-3"
                              >
                                <span className="font-medium">{time.time}</span>
                                <span className="text-xs text-cinema-muted mt-1">
                                  {time.hall}
                                </span>
                                <span className="text-xs text-cinema-muted mt-1">
                                  {time.price.toLocaleString()} VND
                                </span>
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
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

      <Footer />
    </div>
  );
};

export default MovieDetail;
