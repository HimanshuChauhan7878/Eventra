import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  onSubmitReview: (review: ReviewData) => void;
}

export interface ReviewData {
  rating: number;
  comment: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
}

const Review: React.FC<ReviewProps> = ({ eventId, eventTitle, eventDate, onSubmitReview }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      alert('Please enter a comment');
      return;
    }

    onSubmitReview({
      rating,
      comment,
      eventId,
      eventTitle,
      eventDate
    });

    // Reset form
    setRating(0);
    setComment('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-1 rounded-full ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                <Star className="w-6 h-6" fill={star <= rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows={4}
            placeholder="Share your experience..."
          />
        </div>

        <div className="text-sm text-gray-500 mb-4">
          <p>Event: {eventTitle}</p>
          <p>Date: {new Date(eventDate).toLocaleDateString()}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-200"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review; 