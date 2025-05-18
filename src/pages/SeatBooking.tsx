import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeatSelection from "@/components/SeatSelection";
import { Button } from "@/components/ui/button";
import { Seat, Movie, Showtime } from "@/data/type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, MapPin, Timer } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { TimerContainer } from "@/components/SeatBooking/TimerContainer";
import { formatDate } from "@/lib/formatDate";
import { formatTimeAMPM } from "@/lib/formatTimeAMPM";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  clearSelectedSeats,
  fetchSeats,
  setSelectedSeats,
} from "@/features/seat/seatSlice";

const SeatBooking = () => {
  const navigate = useNavigate();

  const { movieId, showtimeId } = useParams<{
    movieId: string;
    showtimeId: string;
  }>();
  
  const dispatch = useDispatch();
  const seats = useSelector((state: RootState) => state.seat.seats);
  const selectedSeats = useSelector((state: RootState) => state.seat.selectedSeats);

  const [showtime, setShowtime] = useState<Showtime>();
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const response = await axiosInstance.get(`showtimes/${showtimeId}/`);
        const showtimeData = response.data;
        setShowtime(showtimeData);
        setMovie(showtimeData.movie);
        console.log("Fetched showtime data:", showtimeData);
      } catch (error) {
        console.error("Error fetching showtime data:", error);
      }
    };

    if (movieId && showtimeId) {
      fetchShowtime();
    }
  }, [movieId, showtimeId]);

  useEffect(() => {
    if (showtimeId) {
      dispatch(fetchSeats(showtimeId));
    }
  }, [dispatch, showtimeId]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedSeats());
    };
  }, []);

  const handleSeatsSelected = (seats: Seat[]) => {};

  const handleCheckout = () => {
    // In a real app, you would save this state and navigate to checkout
    navigate("/checkout", {
      state: {
        movie,
        showtime,
        seats: selectedSeats,
      },
    });
  };

  if (!movie || !showtime) {
    return (
      <div className="container py-12 text-center">
        Invalid booking information.
      </div>
    );
  }

  const totalPrice = selectedSeats.reduce(
    (total, seat) =>
      total + Number(showtime.price) + Number(seat.seat_type.extra_price),
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <main className="flex-1 py-8 container">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Select Your Seats</h1>
              <p className="text-cinema-muted">
                Please select the seats you wish to book for this movie.
              </p>
            </div>
            <TimerContainer />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="bg-card border-none overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-lg">Seating Plan</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <SeatSelection
                    showtime={showtime}
                    seats={seats}
                    onSeatsSelected={handleSeatsSelected}
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-card border-none overflow-hidden sticky top-20">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">{movie.title}</h3>
                      <p className="text-sm text-cinema-muted">
                        {movie.duration} min •{" "}
                        {movie.genres.map((g) => g.name).join(", ")}
                      </p>
                    </div>

                    <Separator className="bg-muted" />

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Calendar size={16} className="mt-1" />
                        <div>
                          <p className="text-sm font-medium">Date</p>
                          <p className="text-sm text-cinema-muted">
                            {formatDate(showtime.start_time)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Clock size={16} className="mt-1" />
                        <div>
                          <p className="text-sm font-medium">Time</p>
                          <p className="text-sm text-cinema-muted">
                            {formatTimeAMPM(showtime.start_time)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="mt-1" />
                        <div>
                          <p className="text-sm font-medium">Cinema</p>
                          <p className="text-sm text-cinema-muted">
                            {showtime.cinema}
                          </p>
                          <p className="text-sm text-cinema-muted">
                            {showtime.room?.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-muted" />

                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm">Selected Seats:</p>
                        <p className="text-sm">
                          {selectedSeats.length > 0
                            ? selectedSeats
                                .map((s) => `${s.seat_row}${s.seat_col}`)
                                .join(", ")
                            : "None"}
                        </p>
                      </div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm">Price per Ticket:</p>
                        <p className="text-sm">
                          {showtime.price.toLocaleString()} VND
                        </p>
                      </div>
                      <div className="flex justify-between font-medium">
                        <p>Total:</p>
                        <p>{Number(totalPrice).toLocaleString()} VND</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    disabled={selectedSeats.length === 0}
                    onClick={handleCheckout}
                  >
                    Continue to Payment
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeatBooking;
