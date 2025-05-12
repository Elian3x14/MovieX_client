
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

// Mock data for cinemas
const mockCinemas = [
  {
    id: 1,
    name: "CineStar Quốc Thanh",
    location: "Ho Chi Minh City",
    address: "271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1",
    halls: 6,
    totalSeats: 780,
    status: "Active",
  },
  {
    id: 2,
    name: "CGV Vincom Center",
    location: "Ho Chi Minh City",
    address: "72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1",
    halls: 8,
    totalSeats: 1200,
    status: "Active",
  },
  {
    id: 3,
    name: "BHD Star Bitexco",
    location: "Ho Chi Minh City",
    address: "Tầng 3&4 Tòa nhà Bitexco, 2 Hải Triều, Phường Bến Nghé, Quận 1",
    halls: 5,
    totalSeats: 750,
    status: "Active",
  },
  {
    id: 4,
    name: "Lotte Cinema Landmark 81",
    location: "Ho Chi Minh City",
    address: "Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh",
    halls: 10,
    totalSeats: 1500,
    status: "Active",
  },
  {
    id: 5,
    name: "Galaxy Cinema Nguyễn Du",
    location: "Ho Chi Minh City",
    address: "116 Nguyễn Du, Phường Bến Thành, Quận 1",
    halls: 4,
    totalSeats: 600,
    status: "Maintenance",
  },
];

const AdminCinemas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cinemas, setCinemas] = useState(mockCinemas);

  const filteredCinemas = cinemas.filter(cinema =>
    cinema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cinema.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cinemas Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Cinema
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Cinema</DialogTitle>
              <DialogDescription>
                Enter the details for the new cinema location.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input
                  id="name"
                  className="col-span-3"
                  placeholder="Cinema name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right">
                  Location
                </label>
                <Input
                  id="location"
                  className="col-span-3"
                  placeholder="City"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="address" className="text-right">
                  Address
                </label>
                <Input
                  id="address"
                  className="col-span-3"
                  placeholder="Full address"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="halls" className="text-right">
                  Number of Halls
                </label>
                <Input
                  id="halls"
                  type="number"
                  className="col-span-3"
                  placeholder="5"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="seats" className="text-right">
                  Total Seats
                </label>
                <Input
                  id="seats"
                  type="number"
                  className="col-span-3"
                  placeholder="600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right">
                  Status
                </label>
                <Input
                  id="status"
                  className="col-span-3"
                  placeholder="Active, Maintenance"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save Cinema</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search cinemas..." 
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
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Halls</TableHead>
              <TableHead>Total Seats</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCinemas.map((cinema) => (
              <TableRow key={cinema.id}>
                <TableCell>{cinema.id}</TableCell>
                <TableCell className="font-medium">{cinema.name}</TableCell>
                <TableCell>{cinema.location}</TableCell>
                <TableCell>{cinema.halls}</TableCell>
                <TableCell>{cinema.totalSeats}</TableCell>
                <TableCell>
                  <Badge variant={cinema.status === "Active" ? "default" : "secondary"}>
                    {cinema.status}
                  </Badge>
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

export default AdminCinemas;
