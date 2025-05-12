
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Search, Edit, Trash } from "lucide-react";

// Mock data for showtimes
const mockShowtimes = [
  {
    id: 1,
    movieId: 1,
    movieTitle: "Dune: Part Two",
    cinemaId: 1,
    cinemaName: "CineStar Quốc Thanh",
    hall: "Hall 1",
    date: "2024-05-15",
    time: "19:30",
    price: "120,000 VND",
    availableSeats: 120,
  },
  {
    id: 2,
    movieId: 1,
    movieTitle: "Dune: Part Two",
    cinemaId: 2,
    cinemaName: "CGV Vincom Center",
    hall: "Hall 3",
    date: "2024-05-15",
    time: "20:00",
    price: "140,000 VND",
    availableSeats: 98,
  },
  {
    id: 3,
    movieId: 3,
    movieTitle: "Inside Out 2",
    cinemaId: 3,
    cinemaName: "BHD Star Bitexco",
    hall: "Hall 2",
    date: "2024-05-16",
    time: "17:15",
    price: "110,000 VND",
    availableSeats: 140,
  },
  {
    id: 4,
    movieId: 4,
    movieTitle: "The Batman",
    cinemaId: 4,
    cinemaName: "Lotte Cinema Landmark 81",
    hall: "Hall 4",
    date: "2024-05-16",
    time: "18:45",
    price: "150,000 VND",
    availableSeats: 75,
  },
  {
    id: 5,
    movieId: 5,
    movieTitle: "Furiosa: A Mad Max Saga",
    cinemaId: 2,
    cinemaName: "CGV Vincom Center",
    hall: "Hall 5",
    date: "2024-05-17",
    time: "21:15",
    price: "140,000 VND",
    availableSeats: 112,
  },
];

const AdminShowtimes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showtimes, setShowtimes] = useState(mockShowtimes);

  const filteredShowtimes = showtimes.filter(showtime =>
    showtime.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    showtime.cinemaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    showtime.date.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Showtimes Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Showtime
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Showtime</DialogTitle>
              <DialogDescription>
                Schedule a new movie showtime.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="movie" className="text-right">
                  Movie
                </label>
                <Input
                  id="movie"
                  className="col-span-3"
                  placeholder="Select a movie"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="cinema" className="text-right">
                  Cinema
                </label>
                <Input
                  id="cinema"
                  className="col-span-3"
                  placeholder="Select a cinema"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="hall" className="text-right">
                  Hall
                </label>
                <Input
                  id="hall"
                  className="col-span-3"
                  placeholder="Hall number"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right">
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="time" className="text-right">
                  Time
                </label>
                <Input
                  id="time"
                  type="time"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price" className="text-right">
                  Price (VND)
                </label>
                <Input
                  id="price"
                  className="col-span-3"
                  placeholder="120000"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save Showtime</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search showtimes..." 
          className="max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Movie</TableHead>
              <TableHead>Cinema</TableHead>
              <TableHead>Hall</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Available Seats</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShowtimes.map((showtime) => (
              <TableRow key={showtime.id}>
                <TableCell>{showtime.id}</TableCell>
                <TableCell className="font-medium">{showtime.movieTitle}</TableCell>
                <TableCell>{showtime.cinemaName}</TableCell>
                <TableCell>{showtime.hall}</TableCell>
                <TableCell>{showtime.date}</TableCell>
                <TableCell>{showtime.time}</TableCell>
                <TableCell>{showtime.price}</TableCell>
                <TableCell>{showtime.availableSeats}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminShowtimes;
