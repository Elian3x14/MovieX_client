// components/admin/MovieDialog.tsx

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { CalendarIcon } from "lucide-react";
import { Movie } from "@/data/type";
import { MovieFormValues, movieSchema, movieSchemaDefaultValues } from "@/schemas/movieSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useAppDispatch } from "@/app/hooks";
import { createMovie, updateMovie } from "@/features/movie/movieSlice";
import { toast } from "sonner";


type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    movie?: Movie | null;
};

const MovieDialog = ({ open, setOpen, movie }: Props) => {
    const isEdit = !!movie;
    const dispatch = useAppDispatch();

    const form = useForm<MovieFormValues>({
        resolver: zodResolver(movieSchema),
        defaultValues: movieSchemaDefaultValues,
    });

    useEffect(() => {
        if (movie) {
            form.reset({
                title: movie.title,
                description: movie.description,
                poster_url: movie.poster_url,
                trailer_url: movie.trailer_url ?? "",
                backdrop_url: movie.backdrop_url,
                rating: movie.rating,
                duration: movie.duration,
                year: movie.year,
                director: movie.director,
                release_status: movie.release_status,
                release_date: movie.release_date ? new Date(movie.release_date) : undefined,
            });
        } else {
            form.reset(movieSchemaDefaultValues);
        }
    }, [movie, open]);



    const onSubmit = (data: MovieFormValues) => {
        if (isEdit) {
            console.log("Cập nhật phim:", movie?.id, data);
            dispatch(updateMovie({ id: movie!.id, data }));
        } else {
            console.log("Tạo phim mới:", data);
            dispatch(createMovie(data))
                .unwrap()
                .then(() => toast.success("Tạo phim thành công"))
                .catch((err) => toast.error(err));
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[800px]"
                onPointerDownOutside={(e) => e.preventDefault()}   // chặn click overlay :contentReference[oaicite:0]{index=0}
                onEscapeKeyDown={(e) => e.preventDefault()}        // chặn phím Esc (tuỳ chọn)
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>{isEdit ? "Chỉnh sửa phim" : "Thêm phim mới"}</DialogTitle>
                            <DialogDescription>
                                {isEdit
                                    ? "Chỉnh sửa thông tin phim bên dưới."
                                    : "Điền đầy đủ thông tin cho bộ phim."}
                            </DialogDescription>
                        </DialogHeader>


                        <div className="grid grid-cols-2 gap-4 my-3">
                            {/* Tên phim */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên phim</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Đạo diễn */}
                            <FormField
                                control={form.control}
                                name="director"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Đạo diễn</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Mô tả */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mô tả</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={4} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-3 gap-4 my-3">
                            {/* Poster URL */}
                            <FormField
                                control={form.control}
                                name="poster_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Poster URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Trailer URL */}
                            <FormField
                                control={form.control}
                                name="trailer_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Trailer URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Backdrop URL */}
                            <FormField
                                control={form.control}
                                name="backdrop_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Backdrop URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-2 my-3">
                            {/* Thời lượng */}
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thời lượng (phút)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Năm sản xuất */}
                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Năm sản xuất</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="release_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2.5">Ngày phát hành</FormLabel>
                                        <Popover modal={true}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(new Date(field.value), "PPP")  // chuyển sang Date trước khi format
                                                        ) : (
                                                            <span>Chọn ngày phát hành</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start"  >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(field.value) : undefined}
                                                    onSelect={
                                                        field.onChange
                                                    }
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>



                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>Huỷ</Button>
                            <Button type="submit">{isEdit ? "Cập nhật" : "Lưu phim"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default MovieDialog;
