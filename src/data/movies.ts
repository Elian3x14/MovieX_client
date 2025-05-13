export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  genre: string[];
  rating: number;
  duration: number;
  year: number;
  director: string;
  cast: string[];
  releaseStatus: "now-showing" | "coming-soon";
  reviews?: Review[];
  trailerUrl?: string; // Added trailer URL field
}

export interface Showtime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  cinema: string;
  hall: string;
  price: number;
}

export const movies: Movie[] = [
  {
    id: "movie1",
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHVuZXxlbnwwfHwwfHx8MA%3D%3D",
    backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHVuZXxlbnwwfHwwfHx8MA%3D%3D",
    genre: ["Science Fiction", "Adventure", "Drama"],
    rating: 8.7,
    duration: 166,
    year: 2024,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    releaseStatus: "now-showing",
    reviews: [
      {
        id: "r1",
        author: "SciFi_Fan",
        rating: 9,
        comment: "Absolutely breathtaking visuals and storytelling. Denis Villeneuve has crafted a masterpiece.",
        date: "2024-03-12T14:22:00Z"
      },
      {
        id: "r2",
        author: "MovieBuff42",
        rating: 8,
        comment: "The scale of this film is incredible. Great performances all around, especially from Chalamet and Zendaya.",
        date: "2024-03-15T09:16:00Z"
      }
    ],
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w"
  },
  {
    id: "movie2",
    title: "The Batman",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    poster: "https://plus.unsplash.com/premium_photo-1661764393655-c8e58c6f0ada?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmF0bWFufGVufDB8fDB8fHww",
    backdrop: "https://plus.unsplash.com/premium_photo-1661764393655-c8e58c6f0ada?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmF0bWFufGVufDB8fDB8fHww",
    genre: ["Action", "Crime", "Drama"],
    rating: 8.5,
    duration: 176,
    year: 2022,
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright"],
    releaseStatus: "now-showing",
    reviews: [
      {
        id: "r3",
        author: "DCFanatic",
        rating: 9,
        comment: "The best Batman movie since The Dark Knight. Pattinson brings a unique intensity to the role.",
        date: "2024-02-20T11:40:00Z"
      }
    ],
    trailerUrl: "https://www.youtube.com/watch?v=mqqft2x_Aa4"
  },
  {
    id: "movie3",
    title: "Gladiator II",
    description: "The sequel to the 2000 epic historical film, following the story of Lucius, the son of Maximus's lover Lucilla. Set years after the events of the first film, Lucius must navigate a changed Roman Empire.",
    poster: "https://images.unsplash.com/photo-1541795795328-f073b763494e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2xhZGlhdG9yfGVufDB8fDB8fHww",
    backdrop: "https://images.unsplash.com/photo-1541795795328-f073b763494e?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2xhZGlhdG9yfGVufDB8fDB8fHww",
    genre: ["Action", "Drama", "History"],
    rating: 8.2,
    duration: 154,
    year: 2024,
    director: "Ridley Scott",
    cast: ["Paul Mescal", "Denzel Washington", "Pedro Pascal", "Connie Nielsen"],
    releaseStatus: "coming-soon",
    trailerUrl: "https://www.youtube.com/watch?v=Hdgdu9t80DM"
  },
  {
    id: "movie4",
    title: "Furiosa: A Mad Max Saga",
    description: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. ",
    poster: "https://m.media-amazon.com/images/M/MV5BN2E5ZDQ4NjQtZGUxMi00MzE0LWJkOGQtN2Q3MGJlNzE1YjlmXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BN2E5ZDQ4NjQtZGUxMi00MzE0LWJkOGQtN2Q3MGJlNzE1YjlmXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 7.9,
    duration: 148,
    year: 2024,
    director: "George Miller",
    cast: ["Anya Taylor-Joy", "Chris Hemsworth", "Tom Burke"],
    releaseStatus: "now-showing",
    trailerUrl: "https://www.youtube.com/watch?v=XdKzUbAiswE"
  },
  {
    id: "movie5",
    title: "Inside Out 2",
    description: "Follow Riley as she enters adolescence, encountering new Emotions.",
    poster: "https://m.media-amazon.com/images/M/MV5BNDUzMDRkNjQtYmQ5Ny00NWExLTg4NDgtY2U5MmNiMDQ2MzkyXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNDUzMDRkNjQtYmQ5Ny00NWExLTg4NDgtY2U5MmNiMDQ2MzkyXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
    genre: ["Animation", "Adventure", "Comedy"],
    rating: 7.6,
    duration: 96,
    year: 2024,
    director: "Kelsey Mann",
    cast: ["Amy Poehler", "Phyllis Smith", "Lewis Black"],
    releaseStatus: "now-showing",
    trailerUrl: "https://www.youtube.com/watch?v=4JU-ezx7K8w"
  },
  {
    id: "movie6",
    title: "Alien: Romulus",
    description: "A group of young people on a distant world find themselves in a confrontation with the most terrifying life form in the universe.",
    poster: "https://m.media-amazon.com/images/M/MV5BZjQ3NjQ5M2QtN2VlNy00MmQ1LWFkNDktMmQ5ZmM2ZDQ0MWM4XkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BZjQ3NjQ5M2QtN2VlNy00MmQ1LWFkNDktMmQ5ZmM2ZDQ0MWM4XkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
    genre: ["Horror", "Sci-Fi", "Thriller"],
    rating: 6.8,
    duration: 0,
    year: 2024,
    director: "Fede Álvarez",
    cast: ["Cailee Spaeny", "Isabela Merced", "David Jonsson"],
    releaseStatus: "coming-soon",
    trailerUrl: "https://www.youtube.com/watch?v=g5NNkyFt8I8"
  },
  {
    id: "movie7",
    title: "The Garfield Movie",
    description: "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure!",
    poster: "https://m.media-amazon.com/images/M/MV5BMjlmMWQ4ODQtZjQ4Ny00NjQ1LWIzMGQtMzQzMmE1NzMxNmNhXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BMjlmMWQ4ODQtZjQ4Ny00NjQ1LWIzMGQtMzQzMmE1NzMxNmNhXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
    genre: ["Animation", "Adventure", "Comedy"],
    rating: 6.3,
    duration: 101,
    year: 2024,
    director: "Mark Dindal",
    cast: ["Chris Pratt", "Samuel L. Jackson", "Hannah Waddingham"],
    releaseStatus: "now-showing",
    trailerUrl: "https://www.youtube.com/watch?v=fDaXbRkGT3g"
  },
  {
    id: "movie8",
    title: "Kingdom of the Planet of the Apes",
    description: "Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he's been taught about the past and make choices that will define a future for apes and humans alike.",
    poster: "https://m.media-amazon.com/images/M/MV5BNzQ0NzQzMDkxMV5BMl5BanBnXkEal@@._V1_FMjpg_UX1000_.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNzQ0NzQzMDkxMV5BMl5BanBnXkEal@@._V1_FMjpg_UX1000_.jpg",
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 6.7,
    duration: 145,
    year: 2024,
    director: "Wes Ball",
    cast: ["Owen Teague", "Freya Allan", "Kevin Durand"],
    releaseStatus: "now-showing",
    trailerUrl: "https://www.youtube.com/watch?v=CXYzLd4gfOk"
  },
  {
    id: "movie9",
    title: "Deadpool & Wolverine",
    description: "Deadpool and Wolverine team up to defeat a common enemy.",
    poster: "https://m.media-amazon.com/images/M/MV5BNjJlM2JjMjMtZDE4My00Y2MwLTg2ZjEtZDJlNzEzMmQ3MmY3XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNjJlM2JjMjMtZDE4My00Y2MwLTg2ZjEtZDJlNzEzMmQ3MmY3XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg",
    genre: ["Action", "Comedy", "Sci-Fi"],
    rating: 0,
    duration: 127,
    year: 2024,
    director: "Shawn Levy",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin"],
    releaseStatus: "coming-soon",
    trailerUrl: "https://www.youtube.com/watch?v=UMD-HmnP3cA"
  },
  {
    id: "movie10",
    title: "Venom: The Last Dance",
    description: "Plot unknown.",
    poster: "https://m.media-amazon.com/images/M/MV5BYzQ0NmQ5MWMtNjQ4Mi00YjhiLThjYjUtODQ3M2Q4MWMwNzQxXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BYzQ0NmQ5MWMtNjQ4Mi00YjhiLThjYjUtODQ3M2Q4MWMwNzQxXkEyXkFqcGdeQXVyMTY3ODk0OTcz._V1_FMjpg_UX1000_.jpg",
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 0,
    duration: 0,
    year: 2024,
    director: "Kelly Marcel",
    cast: ["Tom Hardy", "Chiwetel Ejiofor", "Juno Temple"],
    releaseStatus: "coming-soon",
    trailerUrl: "https://www.youtube.com/watch?v=go4HSzHkuSk"
  }
];

export const showtimes: Showtime[] = [
  {
    id: "showtime1",
    movieId: "movie1",
    date: "2024-07-10",
    time: "14:00",
    cinema: "CGV Cinema",
    hall: "Hall 1",
    price: 90000,
  },
  {
    id: "showtime2",
    movieId: "movie1",
    date: "2024-07-10",
    time: "18:30",
    cinema: "CGV Cinema",
    hall: "Hall 1",
    price: 90000,
  },
  {
    id: "showtime3",
    movieId: "movie1",
    date: "2024-07-11",
    time: "10:00",
    cinema: "Lotte Cinema",
    hall: "Hall 2",
    price: 85000,
  },
  {
    id: "showtime4",
    movieId: "movie2",
    date: "2024-07-15",
    time: "20:00",
    cinema: "BHD Star Cineplex",
    hall: "Hall 3",
    price: 95000,
  },
  {
    id: "showtime5",
    movieId: "movie2",
    date: "2024-07-15",
    time: "16:00",
    cinema: "BHD Star Cineplex",
    hall: "Hall 3",
    price: 95000,
  },
  {
    id: "showtime6",
    movieId: "movie3",
    date: "2024-07-12",
    time: "15:30",
    cinema: "Galaxy Cinema",
    hall: "Hall 4",
    price: 80000,
  },
];
