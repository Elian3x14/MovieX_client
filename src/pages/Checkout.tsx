import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Booking, Movie, Seat } from "@/data/type";
import { cardFormSchema } from "@/schemas/cardFormSchema";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { formatDate } from "@/lib/formatDate";
import { formatTimeAMPM } from "@/lib/formatTimeAMPM";
import formatCurrency from "@/lib/formatCurrency";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvv: "",
      name: "",
    },
  });

  const [booking, setBooking] = useState<Booking>();
  const [seats, setSeats] = useState<Seat[]>([]);


  const fetchBookingDetails = async () => {
    try {
      const response = await axiosInstance.get(`users/bookings/pending/`);
      const booking = response.data;
      setBooking(booking);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      toast.error("Failed to fetch booking details.");
      navigate("/");
    }
  }

  const fetchSeatsByBookingId = async (bookingId: number) => {
    try {
      const response = await axiosInstance.get(`booking-seats/${bookingId}/seats/`);
      setSeats(response.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
      toast.error("Failed to fetch seats.");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  useEffect(() => {
    if (booking && booking.id) {
      fetchSeatsByBookingId(booking.id);
    }
  }, [booking]);



  if (!booking) {
    return (
      <div className="container py-12 text-center">
        Invalid booking information.
      </div>
    );
  }


  const handleCompletePayment = (values: any) => {
    // In a real app, you would process the payment here
    toast.success("Payment successful!", {
      description: `Your booking for ${booking.showtime!.movie.title} on ${booking.showtime!.start_time} at ${booking.showtime!.end_time} has been confirmed.`,
    });

    // Navigate to confirmation page or home
    navigate("/confirmation");
  };



  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <main className="flex-1 py-8 container">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="bg-card border-none overflow-hidden mb-6">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Select your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div
                      className={`flex items-center space-x-3 p-3 rounded-md border ${paymentMethod === "card"
                        ? "border-cinema-primary bg-cinema-primary/10"
                        : "border-muted"
                        }`}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <label
                        htmlFor="card"
                        className="flex items-center justify-between w-full cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-credit-card"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                          <div className="font-medium">Credit/Debit Card</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-8 h-6 bg-blue-600 rounded-md"></div>
                          <div className="w-8 h-6 bg-red-500 rounded-md"></div>
                          <div className="w-8 h-6 bg-yellow-500 rounded-md"></div>
                        </div>
                      </label>
                    </div>

                    <div
                      className={`flex items-center space-x-3 p-3 rounded-md border ${paymentMethod === "ewallet"
                        ? "border-cinema-primary bg-cinema-primary/10"
                        : "border-muted"
                        }`}
                    >
                      <RadioGroupItem value="ewallet" id="ewallet" />
                      <label
                        htmlFor="ewallet"
                        className="flex items-center justify-between w-full cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-wallet"
                          >
                            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                          </svg>
                          <div className="font-medium">E-Wallet</div>
                        </div>
                      </label>
                    </div>

                    <div
                      className={`flex items-center space-x-3 p-3 rounded-md border ${paymentMethod === "banking"
                        ? "border-cinema-primary bg-cinema-primary/10"
                        : "border-muted"
                        }`}
                    >
                      <RadioGroupItem value="banking" id="banking" />
                      <label
                        htmlFor="banking"
                        className="flex items-center justify-between w-full cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-bank"
                          >
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <path d="M12 12h.01" />
                            <path d="M2 10h20" />
                          </svg>
                          <div className="font-medium">Internet Banking</div>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {paymentMethod === "card" && (
                <Card className="bg-card border-none overflow-hidden">
                  <CardHeader>
                    <CardTitle>Card Information</CardTitle>
                    <CardDescription>Enter your card details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleCompletePayment)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1234 5678 9012 3456"
                                  className="bg-background"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="MM/YY"
                                    className="bg-background"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="123"
                                    className="bg-background"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cardholder Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  className="bg-background"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full mt-4">
                          Complete Payment
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}

              {(paymentMethod === "ewallet" || paymentMethod === "banking") && (
                <Card className="bg-card border-none overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="mb-4">
                        {paymentMethod === "ewallet" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-cinema-muted"
                          >
                            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-cinema-muted"
                          >
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <path d="M12 12h.01" />
                            <path d="M2 10h20" />
                          </svg>
                        )}
                      </div>
                      <p className="text-center text-cinema-muted mb-6">
                        {paymentMethod === "ewallet"
                          ? "You'll be redirected to the e-wallet payment page to complete your transaction."
                          : "You'll be redirected to your bank's payment page to complete your transaction."}
                      </p>
                      <Button
                        onClick={handleCompletePayment}
                        className="w-full"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <Card className="bg-card border-none overflow-hidden sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">{booking.showtime.movie.title}</h3>
                    <p className="text-sm text-cinema-muted">
                      {booking.showtime.cinema} - {booking.showtime.room?.name}
                    </p>
                    <p className="text-sm text-cinema-muted">
                      {formatDate(booking.showtime.start_time)} • {formatTimeAMPM(booking.showtime.start_time)}
                    </p>
                  </div>

                  <Separator className="bg-muted" />

                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm">Tickets :</p>
                      <p className="text-sm">
                        x{seats.length}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm bg-green-500">Seats:</p>
                      <ul className="text-sm">
                        {seats.map((seat) =>
                          <li key={seat.id} className="flex justify-between items-center py-1">
                            <span>

                              {seat.seat_row + seat.seat_col}
                              {seat.seat_type ? ` (${seat.seat_type.name})` : ""}
                            </span>
                            <span>

                              {seat.seat_type ?
                                `${formatCurrency(Number(booking.showtime.price) + Number(seat.seat_type.extra_price))}` :
                                formatCurrency(booking.showtime.price)}
                            </span>
                          </li>)}
                      </ul>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm">Booking Fee:</p>
                      <p className="text-sm">0 VND</p>
                    </div>
                  </div>

                  <Separator className="bg-muted" />

                  <div className="flex justify-between font-medium">
                    <p>Total Amount:</p>
                    <p>{booking.total_amount.toLocaleString()} VND</p>
                  </div>
                </CardContent>
                {paymentMethod !== "card" && (
                  <CardFooter className="border-t border-muted p-4 bg-muted/20">
                    <Button className="w-full" onClick={handleCompletePayment}>
                      Complete Payment
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
