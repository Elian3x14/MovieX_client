import HeroSlider from "@/components/HeroSlider";
import MovieSlider from "@/components/MovieSlider";
import PromotionCard from "@/components/PromotionCard";
import CinemaCard from "@/components/CinemaCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { promotions, cinemas, Movie } from "@/data/movies";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    const response = await axiosInstance.get("/movies/");
    setMovies(response.data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  // const nowShowingMovies = movies.filter(
  //   (movie) => movie.releaseStatus === "now-showing"
  // );
  // const upcomingMovies = movies.filter(
  //   (movie) => movie.releaseStatus === "coming-soon"
  // );
  const nowShowingMovies = movies;
  const upcomingMovies = movies;

  const featuredMovies = movies.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider movies={featuredMovies} />

        {/* Movie Section */}
        <section className="py-12 container">
          <MovieSlider
            nowShowingMovies={nowShowingMovies}
            upcomingMovies={upcomingMovies}
          />
        </section>

        {/* Cinema Section */}
        <section className="py-12 bg-black/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Our Cinemas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cinemas.map((cinema) => (
                <CinemaCard key={cinema.id} cinema={cinema} />
              ))}
            </div>
          </div>
        </section>

        {/* Promotions Section */}
        <section className="py-12 container">
          <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promotion) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        </section>

        {/* App Download Section */}
        <section className="py-12 bg-gradient-to-r from-cinema-primary/20 to-cinema-accent/20">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Download Our Mobile App
                </h2>
                <p className="text-cinema-muted mb-6">
                  Get the best movie experience with our mobile app. Book
                  tickets, check showtimes, and enjoy exclusive offers right
                  from your phone.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-apple"
                    >
                      <path d="M12 20.94c1.5 0 2.75-.67 3.95-1.89 1.2-1.22 1.83-2.74 1.87-4.55h-11.7c.1 1.77.75 3.27 1.95 4.5 1.2 1.23 2.44 1.89 3.93 1.94z" />
                      <path d="M12 14.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                      <path d="M19 5c-.63-.59-1.27-.92-2-1h-2.5a1 1 0 0 0-.83.5l-.67 1.14-.67-1.14a1 1 0 0 0-.83-.5h-2.5c-.73.08-1.37.41-2 1" />
                    </svg>
                    App Store
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-play"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Google Play
                  </Button>
                </div>
              </div>
              <div className="w-full max-w-sm">
                <Card className="border-none shadow-xl bg-cinema-background">
                  <CardContent className="p-0">
                    <img
                      src="https://images.unsplash.com/photo-1633152901236-3bab9bf1aa05?q=80&w=500"
                      alt="Mobile App"
                      className="w-full h-auto rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 container">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="booking" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="booking">Booking</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
              </TabsList>
              <TabsContent value="booking">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">
                      How do I book tickets online?
                    </h3>
                    <p className="text-cinema-muted">
                      You can book tickets by selecting a movie, choosing your
                      preferred showtime, selecting seats, and completing the
                      payment process.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">
                      Can I cancel my booking?
                    </h3>
                    <p className="text-cinema-muted">
                      Bookings can be canceled up to 4 hours before the
                      showtime. A refund will be processed according to our
                      refund policy.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">
                      How do I pick up my tickets?
                    </h3>
                    <p className="text-cinema-muted">
                      You can show the e-ticket on your phone at the entrance or
                      print it out. For certain bookings, you may need to
                      collect physical tickets from the kiosk.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="payment">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">
                      What payment methods are accepted?
                    </h3>
                    <p className="text-cinema-muted">
                      We accept credit cards, debit cards, e-wallets, and bank
                      transfers.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">
                      Is online payment secure?
                    </h3>
                    <p className="text-cinema-muted">
                      Yes, all payment transactions are secured with SSL
                      encryption and comply with industry security standards.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="general">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">
                      Are there any membership benefits?
                    </h3>
                    <p className="text-cinema-muted">
                      Yes, members enjoy benefits like discounted tickets,
                      priority bookings, and exclusive promotions. Sign up for a
                      free account to start.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">
                      What are the cinema operating hours?
                    </h3>
                    <p className="text-cinema-muted">
                      Our theaters are generally open from 10:00 AM to 12:00 AM
                      daily. Times may vary during holidays or special events.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
