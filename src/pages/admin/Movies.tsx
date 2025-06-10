
import { useEffect, useState } from "react";
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
import { Search, Edit, Trash, Plus, ChevronDownIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar"
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { formatDate } from "@/lib/formatDate";
import { fetchMovies } from "@/features/movie/movieSlice";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";



const AdminMovies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movie);

  const [date, setDate] = useState<Date | null>(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  useEffect(() => {
    dispatch(fetchMovies()); // Gọi API để lấy danh sách phim
  }, [dispatch]);


  const filteredMovies = Object.values(movies).filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý phim</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm phim mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Thêm phim mới</DialogTitle>
              <DialogDescription>Điền đầy đủ thông tin cho bộ phim.</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Tên phim</label>
                <Input id="title" placeholder="Nhập tên phim" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description">Mô tả</label>
                <Input id="description" placeholder="Tóm tắt nội dung" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="poster_url">Poster URL</label>
                <Input id="poster_url" placeholder="https://..." />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="trailer_url">Trailer URL</label>
                <Input id="trailer_url" placeholder="https://..." />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="backdrop_url">Backdrop URL</label>
                <Input id="backdrop_url" placeholder="https://..." />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="rating">Đánh giá</label>
                <Input id="rating" type="number" step="0.1" placeholder="Ví dụ: 7.5" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="duration">Thời lượng (phút)</label>
                <Input id="duration" type="number" placeholder="120" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="year">Năm sản xuất</label>
                <Input id="year" type="number" placeholder="2025" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="director">Đạo diễn</label>
                <Input id="director" placeholder="Tên đạo diễn" />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="date" className="px-1">
                  Ngày phát hành
                </Label>
                <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className=" justify-between font-normal w-full"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date)
                        setOpenDatePicker(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Trạng thái phát hành" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Trạng thái phát hành</SelectLabel>
                    <SelectItem value="now-showing">Đang chiếu</SelectItem>
                    <SelectItem value="coming-soon">Sắp chiếu</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Huỷ</Button>
              <Button onClick={() => setIsOpen(false)}>Lưu phim</Button>
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
                <TableCell>{formatDate(movie.release_date)}</TableCell>
                <TableCell>
                  <Badge variant={movie.release_status === "now-showing" ? "default" : "secondary"}>
                    {movie.release_status === "now-showing" ? "Đang chiếu" : "Sắp chiếu"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {movie.genres.map((g, i) => (
                      <Badge key={i} variant="outline">{g.name}</Badge>
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
