export enum PaymentMethod {
  ZALO_PAY = "zalopay",
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}
export interface Review {
  id: number;
  author: User
  rating: number;
  comment: string;
  date: Date;
  movie?: Movie;
}


export interface Genre {
  id: number;
  name: string
}

export interface Actor {
  id: number;
  name: string
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  poster_url: string;
  trailer_url?: string;
  backdrop_url: string;
  genres: Genre[];
  rating: number;
  duration: number;
  year: number;
  director: string;
  actors: Actor[];
  release_status: "now-showing" | "coming-soon";
  release_date?: Date;
  reviews?: Review[];
}

export interface Room {
  id: number;
  cinema?: Cinema;
  name: string;
  total_seats: number;
}

export interface Showtime {
  id: string;
  movie?: Movie;
  room?: Room;
  cinema: string;
  price: number;
  start_time: Date;
  end_time: Date;
}

export interface Cinema {
  id: number;
  name: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  number_of_rooms: number;
}


export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  validUntil: string;
}

export interface SeatType {
  id: number;
  name: string;
  extra_price: number;
}

export interface Seat {
  id: number;
  seat_row: string;
  seat_col: number;
  status: "available" | "reserved" | "selected" | "unavailable";
  seat_type: SeatType;
}

export interface Booking {
  id: number;
  user: number;
  status: "pending" | "paid" | "expired" | "cancelled";
  booking_seats: BookingSeat[];
  expired_at: Date;
  showtime?: Showtime;
  total_amount: number;
}

export interface BookingSeat {
  id: number;
  booking: Booking;
  seat: Seat;
  status: "available" | "reserved" | "selected" | "unavailable";
  final_price: number;
}

export const promotions: Promotion[] = [
  {
    id: "promo1",
    title: "Buy 1 Get 1 Free",
    description: "Purchase one ticket and get another one for free on all movies every Monday.",
    image: "https://images.unsplash.com/photo-1597002973885-8c90683fa6e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    validUntil: "2024-12-31"
  },
  {
    id: "promo2",
    title: "Student Discount",
    description: "20% off for students with valid ID. Available everyday.",
    image: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    validUntil: "2024-12-31"
  },
  {
    id: "promo3",
    title: "Family Package",
    description: "Special pricing for family of four including popcorn and drinks.",
    image: "https://images.unsplash.com/photo-1586899028174-e7098604235b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    validUntil: "2024-12-31"
  }
];

