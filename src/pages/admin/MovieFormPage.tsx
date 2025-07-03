"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, CalendarIcon, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useAppDispatch } from "@/app/hooks";
import { createMovie, updateMovie } from "@/features/movie/movieSlice";
import { toast } from "sonner";
import { MovieFormValues, movieSchema, movieSchemaDefaultValues } from "@/schemas/movieSchema";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MovieFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const isEdit = !!id;
    const movie = useSelector((state: RootState) =>
        id ? state.movie.movies[id] : undefined
    );

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
                release_date: movie.release_date ? new Date(movie.release_date) : undefined,
            });
        } else {
            form.reset(movieSchemaDefaultValues);
        }
    }, [movie]);

    const onSubmit = (data: MovieFormValues) => {
        console.log("Submitted data:", data);
        if (isEdit) {
            dispatch(updateMovie({ id: movie!.id, data }))
                .unwrap()
                .then(() => {
                    toast.success("Cập nhật phim thành công");
                    navigate("/admin/movies");
                })
                .catch((err) => toast.error(err));
        } else {
            dispatch(createMovie(data))
                .unwrap()
                .then(() => {
                    toast.success("Tạo phim thành công");
                    navigate("/admin/movies");
                })
                .catch((err) => toast.error(err));
        }
    };

    const onError = (errors: any) => {
        console.log("Lỗi form:", errors);
    };

    return (
        <div className="container py-6">
            <div className="flex gap-2 items-center mb-6">
                <Button variant="secondary" asChild>
                    <Link to="/admin/movies">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-semibold">
                    {isEdit ? "Chỉnh sửa phim" : "Thêm phim mới"}
                </h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
                    <Card className="p-4 mb-6">
                        <h2 className="text-lg font-semibold mb-2">Thông tin phim</h2>
                        <p className="text-sm text-muted-foreground">
                            Nhập thông tin chi tiết về phim để quản lý và hiển thị trên hệ thống.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
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

                        <div className="grid grid-cols-3 gap-4">
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
                                    <FormItem className="flex flex-col mt-2">
                                        <FormLabel>Ngày phát hành</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP", {
                                                                locale: vi,
                                                            })
                                                        ) : (
                                                            <span>Chọn ngày</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </Card>

                    <Card className="p-4 mt-4">
                        <h3 className="text-md font-semibold mb-2">Hình ảnh & Media </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Cung cấp các liên kết đến poster, trailer và backdrop của phim.
                        </p>
                        <div className="grid grid-cols-1 gap-4">
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
                    </Card>

                    <div className="grid grid-cols-2 gap-4 mt-4">


                        <Card className="p-4 mt-4">
                            <h3 className="text-md font-semibold mb-2">Thể loại</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Chọn thể loại phù hợp cho phim này. Bạn có thể thêm nhiều thể loại.
                            </p>
                            <h2 className="font-medium">Đã chọn</h2>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {
                                    movie?.genres.map((genre) => (
                                        <Badge
                                            variant="secondary"
                                            key={genre.id}
                                        >
                                            {genre.name}
                                        </Badge>
                                    ))
                                }
                            </div>
                            <div className="font-medium flex items-center justify-between mt-4">

                                <h2>Danh sách thể thoại</h2>
                                <Button type="button" variant="ghost" size="icon" >
                                    <PlusCircle />
                                </Button>
                            </div>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {
                                    ["Hành động",
                                        "Tình cảm",
                                        "Hài hước",
                                        "Kinh dị",
                                        "Khoa học viễn tưởng",
                                        "Hoạt hình",
                                        "Tâm lý",
                                        "Phiêu lưu",
                                        "Chiến tranh",
                                        "Tội phạm"].map((genre) => (
                                            <Badge
                                                variant="secondary"
                                                key={genre}
                                            >
                                                {genre}
                                            </Badge>
                                        ))
                                }
                            </div>
                        </Card>

                        <Card className="p-4 mt-4">
                            <h3 className="text-md font-semibold mb-2">Diễn viên</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Thêm thông tin về diễn viên chính của phim. Bạn có thể thêm nhiều diễn viên.
                            </p>
                            <h2 className="font-medium">Đã chọn</h2>
                            <div className="flex gap-2 flex-wrap mt-2">
                                
                                {
                                    movie?.actors.map((actor) => (
                                        <Badge
                                            variant="outline"
                                            key={actor.id}
                                        >
                                            <Avatar className="size-6 mr-2">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            {actor.name}
                                        </Badge>
                                    ))
                                }
                            </div>
                        </Card>
                    </div>


                    <div className="flex gap-4 justify-end">
                        <Button asChild type="button" variant="outline">
                            <Link to="/admin/movies">
                                Huỷ
                            </Link>
                        </Button>
                        <Button type="submit">{isEdit ? "Cập nhật" : "Lưu phim"}</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default MovieFormPage;
