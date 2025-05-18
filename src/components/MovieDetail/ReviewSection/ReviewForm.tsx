"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

const reviewSchema = z.object({
  comment: z.string().min(1, "Review cannot be empty"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const ReviewForm: React.FC = () => {
  const { id: movieId } = useParams<{ id: string }>();
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        movie: movieId,
        rating,
      };
      const response = await axiosInstance.post("/reviews/", payload);
      reset();
      setRating(0);
      setHoveredStar(null);
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <Star
                key={star}
                size={24}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                className={`cursor-pointer ${
                  star <= (hoveredStar ?? rating)
                    ? "fill-cinema-secondary text-cinema-secondary"
                    : "text-muted hover:text-cinema-secondary"
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Your Review
          </label>
          <Textarea
            id="comment"
            {...register("comment")}
            placeholder="Write your review here..."
            className="w-full min-h-[100px]"
          />
          {errors.comment && (
            <p className="text-sm text-red-500 mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
