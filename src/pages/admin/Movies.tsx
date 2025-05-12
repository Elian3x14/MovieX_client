
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
import { Badge } from "@/components/ui/badge";

// Mock data for movies
const mockMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    director: "Denis Villeneuve",
    duration: 166,
    releaseDate: "2024-03-01",
    status: "Now Showing",
    genre: ["Sci-Fi", "Adventure"],
  },
  {
    id: 2,
    title: "Deadpool & Wolverine",
    director: "Shawn Levy",
    duration: 127,
    releaseDate: "2024-07-26",
    status: "Coming Soon",
    genre: ["Action", "Comedy"],
  },
  {
    id: 3,
    title: "Inside Out 2",
    director: "Kelsey Mann",
    duration: 96,
    releaseDate: "2024-06-14",
    status: "Now Showing",
    genre: ["Animation", "Comedy"],
  },
  {
    id: 4,
    title: "The Batman",
    director: "Matt Reeves",
    duration: 176,
    releaseDate: "2022-03-04",
    status: "Now Showing",
    genre: ["Action", "Crime", "Drama"],
  },
  {
    id: 5,
    title: "Furiosa: A Mad Max Saga",
    director: "George Miller",
    duration: 148,
    releaseDate: "2024-05-24",
    status: "Now Showing",
    genre: ["Action", "Adventure"],
  },
];

const AdminMovies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState(mockMovies);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Movies Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Movie
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Movie</DialogTitle>
              <DialogDescription>
                Enter the details for the new movie.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right">
                  Title
                </label>
                <Input
                  id="title"
                  className="col-span-3"
                  placeholder="Movie title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="director" className="text-right">
                  Director
                </label>
                <Input
                  id="director"
                  className="col-span-3"
                  placeholder="Director name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="duration" className="text-right">
                  Duration (min)
                </label>
                <Input
                  id="duration"
                  type="number"
                  className="col-span-3"
                  placeholder="120"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="release" className="text-right">
                  Release Date
                </label>
                <Input
                  id="release"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="genre" className="text-right">
                  Genre
                </label>
                <Input
                  id="genre"
                  className="col-span-3"
                  placeholder="Action, Drama, Comedy"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right">
                  Status
                </label>
                <Input
                  id="status"
                  className="col-span-3"
                  placeholder="Now Showing, Coming Soon"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save Movie</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search movies..." 
          className="max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Director</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMovies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.id}</TableCell>
                <TableCell className="font-medium">{movie.title}</TableCell>
                <TableCell>{movie.director}</TableCell>
                <TableCell>{movie.duration} min</TableCell>
                <TableCell>{movie.releaseDate}</TableCell>
                <TableCell>
                  <Badge variant={movie.status === "Now Showing" ? "default" : "secondary"}>
                    {movie.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {movie.genre.map((g, i) => (
                      <Badge key={i} variant="outline">{g}</Badge>
                    ))}
                  </div>
                </TableCell>
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

export default AdminMovies;
