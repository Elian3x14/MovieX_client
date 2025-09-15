"use client";

import { RoomSeatFormValues } from "@/schemas/roomSeatSchema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";

type SeatType = {
    id: number;
    name: string;
};

type Props = {
    form: UseFormReturn<RoomSeatFormValues>;
    seatTypes: SeatType[];
    onSubmit: (data: RoomSeatFormValues) => void;
};

const RoomSeatForm = ({ form, seatTypes, onSubmit }: Props) => {
    return (
        <div className="border p-4 rounded-md h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Loại ghế */}
                    <FormField
                        control={form.control}
                        name="seat_type_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Loại ghế</FormLabel>
                                <Select
                                    onValueChange={(val) => field.onChange(parseInt(val, 10))}
                                    value={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn loại ghế" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {seatTypes.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Bảo trì */}
                    <FormField
                        control={form.control}
                        name="is_maintenance"
                        render={({ field }) => (
                            <FormItem className="flex  gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="!m-0">
                                    Đánh dấu nếu ghế đang bảo trì
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">Cập nhật ghế</Button>
                </form>
            </Form>
        </div>
    );
};

export default RoomSeatForm;
