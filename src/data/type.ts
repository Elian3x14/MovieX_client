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
  id: string;
  name: string;
  address: string;
  halls: number;
  image?: string;
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
  seats: BookedSeat[];
  expired_at: Date;
}

export interface BookedSeat {
  id: number;
  booking: Booking;
  seat: Seat;
}


// export const movies: Movie[] = [
//   {
//     id: "movie1",
//     title: "Dune: Part Two",
//     description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
//     poster_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHVuZXxlbnwwfHwwfHx8MA%3D%3D",
//     backdrop_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHVuZXxlbnwwfHwwfHx8MA%3D%3D",
//     genres:x ["Science Fiction", "Adventure", "Drama"],
//     rating: 8.7,
//     duration: 166,
//     year: 2024,
//     director: "Denis Villeneuve",
//     actors: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
//     releaseStatus: "now-showing",
//     
//     trailer_url: "https://www.youtube.com/watch?v=Way9Dexny3w"
//   },
//   {
//     id: "movie2",
//     title: "The Batman",
//     description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
//     poster_url: "https://plus.unsplash.com/premium_photo-1661764393655-c8e58c6f0ada?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmF0bWFufGVufDB8fDB8fHww",
//     backdrop_url: "https://plus.unsplash.com/premium_photo-1661764393655-c8e58c6f0ada?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmF0bWFufGVufDB8fDB8fHww",
//     genres: ["Action", "Crime", "Drama"],
//     rating: 8.5,
//     duration: 176,
//     year: 2022,
//     director: "Matt Reeves",
//     actors: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright"],
//     releaseStatus: "now-showing",
//     reviews: [
//       {
//         id: "r3",
//         author: "DCFanatic",
//         rating: 9,
//         comment: "The best Batman movie since The Dark Knight. Pattinson brings a unique intensity to the role.",
//         date: "2024-02-20T11:40:00Z"
//       }
//     ],
//     trailer_url: "https://www.youtube.com/watch?v=mqqft2x_Aa4"
//   },
//   {
//     id: "movie3",
//     title: "Gladiator II",
//     description: "The sequel to the 2000 epic historical film, following the story of Lucius, the son of Maximus's lover Lucilla. Set years after the events of the first film, Lucius must navigate a changed Roman Empire.",
//     poster_url: "https://images.unsplash.com/photo-1541795795328-f073b763494e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2xhZGlhdG9yfGVufDB8fDB8fHww",
//     backdrop_url: "https://images.unsplash.com/photo-1541795795328-f073b763494e?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2xhZGlhdG9yfGVufDB8fDB8fHww",
//     genres: ["Action", "Drama", "History"],
//     rating: 8.2,
//     duration: 154,
//     year: 2024,
//     director: "Ridley Scott",
//     actors: ["Paul Mescal", "Denzel Washington", "Pedro Pascal", "Connie Nielsen"],
//     releaseStatus: "coming-soon",
//     trailer_url: "https://www.youtube.com/watch?v=Hdgdu9t80DM"
//   },
//   {
//     id: "movie4",
//     title: "Furiosa: A Mad Max Saga",
//     description: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. ",
//     poster_url: "https://m.media-amazon.com/images/M/MV5BN2E5ZDQ4NjQtZGUxMi00MzE0LWJkOGQtN2Q3MGJlNzE1YjlmXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
//     backdrop_url: "https://m.media-amazon.com/images/M/MV5BN2E5ZDQ4NjQtZGUxMi00MzE0LWJkOGQtN2Q3MGJlNzE1YjlmXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
//     genres: ["Action", "Adventure", "Sci-Fi"],
//     rating: 7.9,
//     duration: 148,
//     year: 2024,
//     director: "George Miller",
//     actors: ["Anya Taylor-Joy", "Chris Hemsworth", "Tom Burke"],
//     releaseStatus: "now-showing",
//     trailer_url: "https://www.youtube.com/watch?v=XdKzUbAiswE"
//   },
//   {
//     id: "movie5",
//     title: "Inside Out 2",
//     description: "Follow Riley as she enters adolescence, encountering new Emotions.",
//     poster_url: "https://m.media-amazon.com/images/M/MV5BNDUzMDRkNjQtYmQ5Ny00NWExLTg4NDgtY2U5MmNiMDQ2MzkyXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
//     backdrop_url: "https://m.media-amazon.com/images/M/MV5BNDUzMDRkNjQtYmQ5Ny00NWExLTg4NDgtY2U5MmNiMDQ2MzkyXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
//     genres: ["Animation", "Adventure", "Comedy"],
//     rating: 7.6,
//     duration: 96,
//     year: 2024,
//     director: "Kelsey Mann",
//     actors: ["Amy Poehler", "Phyllis Smith", "Lewis Black"],
//     releaseStatus: "now-showing",
//     trailer_url: "https://www.youtube.com/watch?v=4JU-ezx7K8w"
//   },
//   {
//     id: "movie6",
//     title: "Alien: Romulus",
//     description: "A group of young people on a distant world find themselves in a confrontation with the most terrifying life form in the universe.",
//     poster_url: "https://m.media-amazon.com/images/M/MV5BZjQ3NjQ5M2QtN2VlNy00MmQ1LWFkNDktMmQ5ZmM2ZDQ0MWM4XkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
//     backdrop_url: "https://m.media-amazon.com/images/M/MV5BZjQ3NjQ5M2QtN2VlNy00MmQ1LWFkNDktMmQ5ZmM2ZDQ0MWM4XkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
//     genres: ["Horror", "Sci-Fi", "Thriller"],
//     rating: 6.8,
//     duration: 0,
//     year: 2024,
//     director: "Fede Álvarez",
//     actors: ["Cailee Spaeny", "Isabela Merced", "David Jonsson"],
//     releaseStatus: "coming-soon",
//     trailer_url: "https://www.youtube.com/watch?v=g5NNkyFt8I8"
//   },
//   {
//     id: "movie7",
//     title: "The Garfield Movie",
//     description: "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure!",
//     poster_url: "https://m.media-amazon.com/images/M/MV5BMjlmMWQ4ODQtZjQ4Ny00NjQ1LWIzMGQtMzQzMmE1NzMxNmNhXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
//     backdrop_url: "https://m.media-amazon.com/images/M/MV5BMjlmMWQ4ODQtZjQ4Ny00NjQ1LWIzMGQtMzQzMmE1NzMxNmNhXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
//     genres: ["Animation", "Adventure", "Comedy"],
//     rating: 6.3,
//     duration: 101,
//     year: 2024,
//     director: "Mark Dindal",
//     actors: ["Chris Pratt", "Samuel L. Jackson", "Hannah Waddingham"],
//     releaseStatus: "now-showing",
//     trailer_url: "https://www.youtube.com/watch?v=fDaXbRkGT3g"
//   },
//   {
//     id: "movie8",
//     title: "Kingdom of the Planet of the Apes",
//     description: "Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he's been taught about the past and make choices that will define a future for apes and humans alike.",
//     poster_url: "https://m.media-amazon.com/images/M/MV5BNzQ0NzQzMDkxMV5BMl5BanBnXkEal@@._V1_FMjpg_UX1000_.jpg",
//     backdrop_url: "https://m.media-amazon.com/images/M/MV5BNzQ0NzQzMDkxMV5BMl5BanBnXkEal@@._V1_FMjpg_UX1000_.jpg",
//     genres: ["Action", "Adventure", "Sci-Fi"],
//     rating: 6.7,
//     duration: 145,
//     year: 2024,
//     director: "Wes Ball",
//     actors: ["Owen Teague", "Freya Allan", "Kevin Durand"],
//     releaseStatus: "now-showing",
//     trailer_url: "https://www.youtube.com/watch?v=CXYzLd4gfOk"
//   },
//   {
//     id: "movie9",
//     title: "Deadpool & Wolverine",
//     description: "Deadpool and Wolverine team up to defeat a common enemy.",
//     poster_url: "https://m.media-amazon.com/images/M/MV5BNjJlM2JjMjMtZDE4My00Y2MwLTg2ZjEtZDJlNzEzMmQ3MmY3XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg",
//     backdrop_url: "https://m.media-amazon.com/images/M/MV5BNjJlM2JjMjMtZDE4My00Y2MwLTg2ZjEtZDJlNzEzMmQ3MmY3XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg",
//     genres: ["Action", "Comedy", "Sci-Fi"],
//     rating: 0,
//     duration: 127,
//     year: 2024,
//     director: "Shawn Levy",
//     actors: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin"],
//     releaseStatus: "coming-soon",
//     trailer_url: "https://www.youtube.com/watch?v=UMD-HmnP3cA"
//   },
//   {
//     id: "movie10",
//     title: "Venom: The Last Dance",
//     description: "Plot unknown.",
//     poster_url: "https://m.media-amazon.com/images/M/MV5BYzQ0NmQ5MWMtNjQ4Mi00YjhiLThjYjUtODQ3M2Q4MWMwNzQxXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
//     backdrop_url: "https://m.media-amazon.com/images/M/MV5BYzQ0NmQ5MWMtNjQ4Mi00YjhiLThjYjUtODQ3M2Q4MWMwNzQxXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
//     genres: ["Action", "Sci-Fi", "Thriller"],
//     rating: 0,
//     duration: 0,
//     year: 2024,
//     director: "Kelly Marcel",
//     actors: ["Tom Hardy", "Chiwetel Ejiofor", "Juno Temple"],
//     releaseStatus: "coming-soon",
//     trailer_url: "https://www.youtube.com/watch?v=go4HSzHkuSk"
//   }
// ];

export const cinemas: Cinema[] = [
  {
    id: "cinema1",
    name: "CGV Cinema",
    address: "123 Main Street, Downtown",
    halls: 7,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "cinema2",
    name: "Lotte Cinema",
    address: "456 Park Avenue, Uptown",
    halls: 5,
    image: "https://images.unsplash.com/photo-1596445836561-991bcd39a86d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "cinema3",
    name: "BHD Star Cineplex",
    address: "789 Ocean Boulevard, Seaside",
    halls: 6,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "cinema4",
    name: "Galaxy Cinema",
    address: "101 Highland Road, Hillside",
    halls: 4,
    image: "https://images.unsplash.com/photo-1615986201152-7686a4867f30?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

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

