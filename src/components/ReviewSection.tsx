import React, { useState, useEffect } from "react";
import { Star, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Review as MovieReview } from "@/data/type";
import { useParams } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import formatDaysLeft from "@/lib/formatDaysLeft";
import ReviewForm from "./MovieDetail/ReviewSection/ReviewForm";
import { Button } from "@/components/ui/button";
import { FcLike } from "react-icons/fc";

const PAGE_SIZE = 3;

const ReviewSection = () => {
  const { id: movieId } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<MovieReview[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/movies/${movieId}/reviews/?page=${page}&page_size=${PAGE_SIZE}`
      );
      setReviews(response.data.results);
      setTotalPages(Math.ceil(response.data.count / PAGE_SIZE));
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast({
        title: "Error fetching reviews",
        description: "Could not load reviews. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [movieId, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      {reviews && reviews.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">User Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex space-x-2 bg-card p-4 rounded-lg shadow"
              >
                {/*  */}
                <div className="grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-cinema-text">
                          @{review.author.username}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDaysLeft(review.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="fill-cinema-secondary text-cinema-secondary size-4" />
                        <span className="text-sm text-muted-foreground">
                          {review.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-cinema-text">{review.comment}</p>
                </div>
                {/*  */}
                <div className="flex flex-col items-center gap-2">
                  <Button size="icon" variant="outline">
                    <ThumbsUp className="" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <ThumbsDown className="" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      ) : loading ? (
        <div className="text-center py-6">Loading reviews...</div>
      ) : (
        <div className="text-center py-6 bg-muted/30 rounded-lg">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-2 text-lg font-medium">No reviews yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Be the first to review this movie
          </p>
        </div>
      )}

      <ReviewForm />
    </div>
  );
};

export default ReviewSection;
