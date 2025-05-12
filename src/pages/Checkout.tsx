
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import { useToast } from "@/components/ui/use-toast";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  // Get booking details from state
  const { movie, showtime, seats } = location.state || {};
  
  if (!movie || !showtime || !seats || seats.length === 0) {
    return <div className="container py-12 text-center">Invalid booking information.</div>;
  }

  const totalAmount = seats.length * showtime.price;
  
  const handleCompletePayment = () => {
    // In a real app, you would process the payment here
    toast({
      title: "Payment Successful!",
      description: `You have successfully booked ${seats.length} ticket(s) for ${movie.title}.`,
    });
    
    // Navigate to confirmation page or home
    navigate("/confirmation", { 
      state: {
        movie, 
        showtime, 
        seats,
        bookingId: `BK${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        paymentMethod
      }
    });
  };
  
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <Header />

      <main className="flex-1 py-8 container">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="bg-card border-none overflow-hidden mb-6">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className={`flex items-center space-x-3 p-3 rounded-md border ${paymentMethod === "card" ? "border-cinema-primary bg-cinema-primary/10" : "border-muted"}`}>
                      <RadioGroupItem value="card" id="card" />
                      <label htmlFor="card" className="flex items-center justify-between w-full cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                          <div className="font-medium">Credit/Debit Card</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-8 h-6 bg-blue-600 rounded-md"></div>
                          <div className="w-8 h-6 bg-red-500 rounded-md"></div>
                          <div className="w-8 h-6 bg-yellow-500 rounded-md"></div>
                        </div>
                      </label>
                    </div>
                    
                    <div className={`flex items-center space-x-3 p-3 rounded-md border ${paymentMethod === "ewallet" ? "border-cinema-primary bg-cinema-primary/10" : "border-muted"}`}>
                      <RadioGroupItem value="ewallet" id="ewallet" />
                      <label htmlFor="ewallet" className="flex items-center justify-between w-full cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                          <div className="font-medium">E-Wallet</div>
                        </div>
                      </label>
                    </div>
                    
                    <div className={`flex items-center space-x-3 p-3 rounded-md border ${paymentMethod === "banking" ? "border-cinema-primary bg-cinema-primary/10" : "border-muted"}`}>
                      <RadioGroupItem value="banking" id="banking" />
                      <label htmlFor="banking" className="flex items-center justify-between w-full cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bank"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M12 12h.01"/><path d="M2 10h20"/></svg>
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
                    <Form>
                      <div className="space-y-4">
                        <FormField
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="1234 5678 9012 3456" className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            name="expiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" className="bg-background" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" className="bg-background" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cardholder Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Form>
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
                    <h3 className="font-medium">{movie.title}</h3>
                    <p className="text-sm text-cinema-muted">{showtime.cinema} - {showtime.hall}</p>
                    <p className="text-sm text-cinema-muted">{formatDate(showtime.date)} • {showtime.time}</p>
                  </div>
                  
                  <Separator className="bg-muted" />
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm">Tickets ({seats.length}x):</p>
                      <p className="text-sm">{(seats.length * showtime.price).toLocaleString()} VND</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm">Seats:</p>
                      <p className="text-sm">
                        {seats.map((s) => `${s.row}${s.number}`).join(", ")}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm">Booking Fee:</p>
                      <p className="text-sm">0 VND</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-muted" />
                  
                  <div className="flex justify-between font-medium">
                    <p>Total Amount:</p>
                    <p>{totalAmount.toLocaleString()} VND</p>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-muted p-4 bg-muted/20">
                  <Button className="w-full" onClick={handleCompletePayment}>Complete Payment</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
