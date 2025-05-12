export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  rating: number;
  year: number;
  duration: number; // in minutes
  genre: string[];
  description: string;
  director: string;
  cast: string[];
  releaseStatus: "now-showing" | "upcoming";
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ShowTime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  cinema: string;
  hall: string;
  price: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: "standard" | "premium" | "vip";
  status: "available" | "reserved" | "selected" | "unavailable";
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Avengers: Endgame",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=500",
    backdrop: "https://images.unsplash.com/photo-1569701813229-33284b643e3c?q=80&w=1200",
    rating: 8.4,
    year: 2019,
    duration: 181,
    genre: ["Action", "Adventure", "Drama"],
    description:
      "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    releaseStatus: "now-showing",
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "John Doe",
        rating: 5,
        comment: "This film was the perfect conclusion to the Infinity Saga. The emotional moments were incredibly powerful, and the action was spectacular. Robert Downey Jr.'s performance was outstanding!",
        date: "2024-01-15T10:30:00Z"
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Jane Smith",
        rating: 4,
        comment: "Loved most of it, though some parts felt a little rushed. The final battle was absolutely worth the wait and years of build-up!",
        date: "2024-02-20T14:45:00Z"
      }
    ]
  },
  {
    id: "2",
    title: "Joker",
    poster: "https://images.unsplash.com/photo-1559583109-3e7968136c99?q=80&w=500",
    backdrop: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=1200",
    rating: 8.5,
    year: 2019,
    duration: 122,
    genre: ["Crime", "Drama", "Thriller"],
    description:
      "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    releaseStatus: "now-showing",
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Robert Johnson",
        rating: 5,
        comment: "Joaquin Phoenix's performance is nothing short of mesmerizing. A disturbing but thought-provoking take on the character.",
        date: "2024-03-10T09:15:00Z"
      }
    ]
  },
  {
    id: "3",
    title: "Parasite",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500",
    backdrop: "https://images.unsplash.com/photo-1568111561354-74e08bc9ee2f?q=80&w=1200",
    rating: 8.6,
    year: 2019,
    duration: 132,
    genre: ["Comedy", "Drama", "Thriller"],
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    director: "Bong Joon Ho",
    cast: ["Kang-ho Song", "Sun-kyun Lee", "Yeo-jeong Jo"],
    releaseStatus: "now-showing",
    reviews: []
  },
  {
    id: "4",
    title: "The Tomorrow War",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500",
    backdrop: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1200",
    rating: 6.6,
    year: 2021,
    duration: 138,
    genre: ["Action", "Adventure", "Sci-Fi"],
    description:
      "A family man is drafted to fight in a future war where the fate of humanity relies on his ability to confront the past.",
    director: "Chris McKay",
    cast: ["Chris Pratt", "Yvonne Strahovski", "J.K. Simmons"],
    releaseStatus: "now-showing",
    reviews: []
  },
  {
    id: "5",
    title: "Dune",
    poster: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?q=80&w=500",
    backdrop: "https://images.unsplash.com/photo-1547957930-88f311f40bde?q=80&w=1200",
    rating: 8.0,
    year: 2021,
    duration: 155,
    genre: ["Action", "Adventure", "Drama"],
    description:
      "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya"],
    releaseStatus: "upcoming",
    reviews: []
  },
  {
    id: "6",
    title: "No Time to Die",
    poster: "https://images.unsplash.com/photo-1642456074142-92f75cb89ad4?q=80&w=500",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200",
    rating: 7.3,
    year: 2021,
    duration: 163,
    genre: ["Action", "Adventure", "Thriller"],
    description:
      "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
    director: "Cary Joji Fukunaga",
    cast: ["Daniel Craig", "Ana de Armas", "Rami Malek"],
    releaseStatus: "upcoming",
    reviews: []
  },
];

export const showtimes: ShowTime[] = [
  {
    id: "st1",
    movieId: "1",
    date: "2025-05-12",
    time: "10:00",
    cinema: "CinemaPlus Central",
    hall: "Hall 1",
    price: 120000,
  },
  {
    id: "st2",
    movieId: "1",
    date: "2025-05-12",
    time: "13:30",
    cinema: "CinemaPlus Central",
    hall: "Hall 2",
    price: 120000,
  },
  {
    id: "st3",
    movieId: "1",
    date: "2025-05-12",
    time: "16:45",
    cinema: "CinemaPlus Central",
    hall: "Hall 1",
    price: 150000,
  },
  {
    id: "st4",
    movieId: "1",
    date: "2025-05-12",
    time: "20:00",
    cinema: "CinemaPlus Central",
    hall: "Hall 3 (IMAX)",
    price: 180000,
  },
  {
    id: "st5",
    movieId: "1",
    date: "2025-05-13",
    time: "11:15",
    cinema: "CinemaPlus Central",
    hall: "Hall 2",
    price: 120000,
  },
  {
    id: "st6",
    movieId: "1",
    date: "2025-05-13",
    time: "14:30",
    cinema: "CinemaPlus Central",
    hall: "Hall 1",
    price: 120000,
  },
  {
    id: "st7",
    movieId: "2",
    date: "2025-05-12",
    time: "09:30",
    cinema: "CinemaPlus Central",
    hall: "Hall 4",
    price: 120000,
  },
  {
    id: "st8",
    movieId: "2",
    date: "2025-05-12",
    time: "12:45",
    cinema: "CinemaPlus Central",
    hall: "Hall 5",
    price: 120000,
  },
  {
    id: "st9",
    movieId: "2",
    date: "2025-05-12",
    time: "18:15",
    cinema: "CinemaPlus Central",
    hall: "Hall 4",
    price: 150000,
  },
  {
    id: "st10",
    movieId: "3",
    date: "2025-05-12",
    time: "11:00",
    cinema: "CinemaPlus Central",
    hall: "Hall 6",
    price: 120000,
  },
  {
    id: "st11",
    movieId: "3",
    date: "2025-05-12",
    time: "15:30",
    cinema: "CinemaPlus Central",
    hall: "Hall 6",
    price: 120000,
  },
  {
    id: "st12",
    movieId: "3",
    date: "2025-05-12",
    time: "19:45",
    cinema: "CinemaPlus Central",
    hall: "Hall 6",
    price: 150000,
  },
];

export const generateSeats = (): Seat[] => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const seatsPerRow = 12;
  const seats: Seat[] = [];
  
  rows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      // Set some seats as reserved to demonstrate the UI
      const isReserved = Math.random() < 0.2;
      const isPremium = row > "F";
      const isVIP = row > "H" && i > 3 && i < 10;
      
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        type: isVIP ? "vip" : isPremium ? "premium" : "standard",
        status: isReserved ? "reserved" : "available",
      });
    }
  });
  
  return seats;
};

export const seats = generateSeats();

export interface Cinema {
  id: string;
  name: string;
  location: string;
  halls: number;
}

export const cinemas: Cinema[] = [
  {
    id: "c1",
    name: "CinemaPlus Central",
    location: "123 Main Street, Downtown",
    halls: 6,
  },
  {
    id: "c2",
    name: "CinemaPlus Westside",
    location: "456 Plaza Avenue, West District",
    halls: 8,
  },
  {
    id: "c3",
    name: "CinemaPlus Eastgate",
    location: "789 Boulevard Road, East Mall",
    halls: 5,
  },
];

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  validUntil: string;
}

export const promotions: Promotion[] = [
  {
    id: "p1",
    title: "Student Discount",
    description: "50% off for students on weekdays",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=500",
    validUntil: "2025-06-30",
  },
  {
    id: "p2",
    title: "Family Package",
    description: "Buy 3 tickets, get 1 free",
    image: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=500",
    validUntil: "2025-07-15",
  },
  {
    id: "p3",
    title: "Member Monday",
    description: "Special pricing for members every Monday",
    image: "https://images.unsplash.com/photo-1586899028174-e7098604235b?q=80&w=500",
    validUntil: "2025-08-31",
  },
];

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bookings?: string[];
}
